import { TaskRepository } from "../../domain/repositories/task-repo";

export class GetTasksUseCase {
  constructor(private repo: TaskRepository) {}
  async exec(taskId: string) {
    return this.repo.getByTask(taskId);
  }
}
