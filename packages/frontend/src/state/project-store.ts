import { Project } from '@testforge/core';

/**
 * ProjectStore — manages project metadata in the frontend.
 */
export class ProjectStore {
  private readonly projects = new Map<string, Project>();

  upsert(project: Project): void {
    this.projects.set(project.id, project);
  }

  get(id: string): Project | undefined {
    return this.projects.get(id);
  }

  getAll(): Project[] {
    return Array.from(this.projects.values());
  }

  delete(id: string): boolean {
    return this.projects.delete(id);
  }

  count(): number {
    return this.projects.size;
  }
}
