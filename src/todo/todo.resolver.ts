import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from 'src/graphql';
import { GetUser } from 'src/auth/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { LoaderService } from 'src/loader/loader.service';

@Resolver('Todo')
@UseGuards(JwtGuard)
export class TodoResolver {
  constructor(private readonly todoService: TodoService, private readonly loader: LoaderService) {}

  @Mutation('createTodo')
  create(@Args('createTodoInput') createTodoInput: CreateTodoInput, @GetUser('id') userId: string) {
    return this.todoService.create(createTodoInput, userId);
  }

  @Query('getTodos')
  findAll(@GetUser('id') userId: string) {
    return this.todoService.findAll(userId);
  }

  @Query('getTodo')
  findOne(@Args('id') id: string, @GetUser('id') userId: string) {
    return this.todoService.findOne(id, userId);
  }

  @Mutation('updateTodo')
  update(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput, @GetUser('id') userId: string) {
    return this.todoService.update(updateTodoInput, userId);
  }

  @Mutation('removeTodo')
  remove(@Args('id') id: string, @GetUser('id') userId: string) {
    return this.todoService.remove(id, userId);
  }

  @ResolveField()
  user(@GetUser('id') userId: string) {
    const loader = this.loader.getLoader('user');
    return loader.load(userId);
  }
}
