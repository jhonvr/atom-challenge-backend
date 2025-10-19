import { Router } from 'express';
import { asyncHandler } from './middleware/async';
import { validate } from './middleware/validate';
import {
    emailUserSchema,
    createTaskSchema, updateTaskSchema
} from './validators';

import { UsersController } from './controllers/users.controller';
import { TasksController } from './controllers/tasks.controller';
import { UserRepository } from '../domain/repositories/user-repo';
import { FindUserUseCase } from '../application/users/find-user';
import { CreateUserUseCase } from '../application/users/create-user';
import { ListTasksUseCase } from '../application/tasks/list-task';
import { CreateTaskUseCase } from '../application/tasks/create-task';
import { UpdateTaskUseCase } from '../application/tasks/update-task';
import { DeleteTaskUseCase } from '../application/tasks/delete-task';
import { GetTasksUseCase } from '../application/tasks/get-task';
import { requireUserCode } from './middleware/require-code';
import { TaskRepository } from '../domain/repositories/task-repo';

export interface RouterDeps {
    userRepo: UserRepository;
    taskRepo: TaskRepository;
}

export function buildRouter({ userRepo, taskRepo }: RouterDeps) {
    const r = Router();

    const users = new UsersController(
        new FindUserUseCase(userRepo),
        new CreateUserUseCase(userRepo),
    );
    const tasks = new TasksController(
        new ListTasksUseCase(taskRepo),
        new GetTasksUseCase(taskRepo),
        new CreateTaskUseCase(taskRepo),
        new UpdateTaskUseCase(taskRepo),
        new DeleteTaskUseCase(taskRepo),
    );

    r.post(
        '/users/getUser',
        validate(emailUserSchema, 'body'),
        asyncHandler(users.findByEmail),
    );
    r.post(
        '/users',
        validate(emailUserSchema, 'body'),
        asyncHandler(users.create),
    );

    r.get(
        '/tasks',
        requireUserCode,
        asyncHandler(tasks.list),
    );
    r.get(
        '/tasks/getTask',
        requireUserCode,
        asyncHandler(tasks.get),
    );
    r.post(
        '/tasks',
        requireUserCode,
        validate(createTaskSchema, 'body'),
        asyncHandler(tasks.create),
    );
    r.put(
        '/tasks/:id',
        requireUserCode,
        validate(updateTaskSchema, 'body'),
        asyncHandler(tasks.update),
    );
    r.delete(
        '/tasks/:id',
        requireUserCode,
        asyncHandler(tasks.remove),
    );

    return r;
}
