import { TaskRepository } from "../../domain/repositories/task-repo";

export class ListTasksUseCase {
  constructor(private repo: TaskRepository) {}
  async exec(userId: string) {
    return this.repo.listByUser(userId);
  }
}
