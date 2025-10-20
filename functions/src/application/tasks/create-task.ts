import { TaskRepository } from "../../domain/repositories/task-repo";

export class CreateTaskUseCase {
  constructor(private repo: TaskRepository) {}
  async exec(input: { title: string; description?: string }, userId: string) {
    const payload = {
      userId,
      title: input.title.trim(),
      description: (input.description ?? '').trim(),
      createdAt: Date.now(),
      completed: false,
      deleted: false as const,
    };
    return this.repo.create(payload);
  }
}
