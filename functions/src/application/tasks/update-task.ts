import { TaskRepository } from "../../domain/repositories/task-repo";

export class UpdateTaskUseCase {
  constructor(private repo: TaskRepository) {}
  exec(id: string, patch: { title?: string; description?: string; completed?: boolean }) {
    const cleaned = {
      ...(patch.title ? { title: patch.title.trim() } : {}),
      ...(patch.description ? { description: patch.description.trim() } : {}),
      ...(typeof patch.completed === 'boolean' ? { completed: patch.completed } : {}),
      updatedAt: Date.now()
    };
    return this.repo.update(id, cleaned);
  }
}
