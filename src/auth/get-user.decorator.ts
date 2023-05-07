import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(ctx);
  const request = gqlContext.getContext().req;
  const user: User = request.user;

  if (data) {
    return user[data];
  }
  return user;
});
