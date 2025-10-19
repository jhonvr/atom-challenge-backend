import { Task } from '../task';

export interface TaskRepository {
  listByUser(userId: string): Promise<Task[]>;
  getByTask(taskId: string): Promise<Task>;
  create(data: Omit<Task, 'id'>): Promise<Task>;
  update(taskId: string, patch: Partial<Task>): Promise<void>;
  delete(taskId: string): Promise<void>;
}
