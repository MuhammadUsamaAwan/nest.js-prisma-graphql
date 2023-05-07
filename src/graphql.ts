
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface LoginInput {
    email: string;
    password: string;
}

export interface SignupInput {
    email: string;
    username: string;
    password: string;
}

export interface CreateTodoInput {
    title: string;
}

export interface UpdateTodoInput {
    id: string;
    title: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    token: string;
}

export interface IQuery {
    login(loginInput: LoginInput): User | Promise<User>;
    getTodos(): Nullable<Todo>[] | Promise<Nullable<Todo>[]>;
    getTodo(id: string): Todo | Promise<Todo>;
}

export interface IMutation {
    signup(signupInput: SignupInput): User | Promise<User>;
    createTodo(createTodoInput: CreateTodoInput): Todo | Promise<Todo>;
    updateTodo(updateTodoInput: UpdateTodoInput): Todo | Promise<Todo>;
    removeTodo(id: string): Todo | Promise<Todo>;
}

export interface Todo {
    id: string;
    title: string;
    user: User;
}

type Nullable<T> = T | null;
