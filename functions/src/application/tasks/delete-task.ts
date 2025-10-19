import { TaskRepository } from "../../domain/repositories/task-repo";

export class DeleteTaskUseCase {
  constructor(private repo: TaskRepository) {}
  exec(id: string) {
    return this.repo.delete(id);
  }
}
