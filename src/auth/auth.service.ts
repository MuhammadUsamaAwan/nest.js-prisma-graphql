import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginInput, SignupInput } from 'src/graphql';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  async signup(signupInput: SignupInput) {
    const hash = await argon.hash(signupInput.password);
    const user = await this.prisma.user.create({
      data: {
        email: signupInput.email,
        username: signupInput.username,
        password: hash,
      },
    });
    const token = await this.signToken(user.id, user.email);
    return { ...user, ...token };
  }

  async login(loginInput: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginInput.email,
      },
    });
    if (!user) throw new ForbiddenException('Invalid Credentials');
    const pwMatches = await argon.verify(user.password, loginInput.password);
    if (!pwMatches) throw new ForbiddenException('Invalid Credentials');
    const token = await this.signToken(user.id, user.email);
    return { ...user, ...token };
  }

  async signToken(id: string, email: string): Promise<{ token: string }> {
    const payload = {
      id,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret,
    });
    return {
      token,
    };
  }
}
