import { Request, Response } from 'express';
import { ListTasksUseCase } from '../../application/tasks/list-task';
import { CreateTaskUseCase } from '../../application/tasks/create-task';
import { UpdateTaskUseCase } from '../../application/tasks/update-task';
import { DeleteTaskUseCase } from '../../application/tasks/delete-task';
import { GetTasksUseCase } from '../../application/tasks/get-task';

export class TasksController {
    constructor(
        private readonly listTasks: ListTasksUseCase,
        private readonly getTask: GetTasksUseCase,
        private readonly createTask: CreateTaskUseCase,
        private readonly updateTask: UpdateTaskUseCase,
        private readonly deleteTask: DeleteTaskUseCase,
    ) { }

    list = async (req: Request, res: Response) => {
        const tasks = await this.listTasks.exec(res.locals.userId as string);
        return res.status(200).json(tasks);
    };

    get = async (req: Request, res: Response) => {
        const { taskId } = req.body as { taskId: string };
        const task = await this.getTask.exec(taskId);
        return res.status(200).json(task);
    };

    create = async (req: Request, res: Response) => {
        const task = await this.createTask.exec(req.body, res.locals.userId as string);
        return res.status(200).json(task);
    };

    update = async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        await this.updateTask.exec(id, req.body);
        return res.json({ ok: true });
    };

    remove = async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        await this.deleteTask.exec(id);
        return res.status(200).send();
    };
}
