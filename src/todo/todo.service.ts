import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoInput, UpdateTodoInput } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  create(createTodoInput: CreateTodoInput, userId: string) {
    return this.prisma.todo.create({
      data: {
        ...createTodoInput,
        userId,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.todo.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const todo = await this.prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!todo) throw new BadRequestException('No todo found');
    return todo;
  }

  async update(updateTodoInput: UpdateTodoInput, userId: string) {
    const todo = await this.findOne(updateTodoInput.id, userId);
    return this.prisma.todo.update({
      where: {
        id: todo.id,
      },
      data: {
        title: updateTodoInput.title,
      },
    });
  }

  async remove(id: string, userId: string) {
    const todo = await this.findOne(id, userId);
    return this.prisma.todo.delete({
      where: {
        id: todo.id,
      },
    });
  }

  getUser(userId: string) {
    console.log('find user with the id:', userId);
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
