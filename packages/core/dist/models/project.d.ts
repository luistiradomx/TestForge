/**
 * A TestForge project grouping test suites, environments, and integrations.
 */
export interface Project {
    id: string;
    name: string;
    description?: string;
    organizationId: string;
    repositoryUrl?: string;
    defaultBranch: string;
    environments: string[];
    integrations: Integration[];
    plugins: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface Integration {
    type: IntegrationType;
    config: Record<string, unknown>;
    enabled: boolean;
}
export type IntegrationType = 'github' | 'azure-devops' | 'slack' | 'jira';
//# sourceMappingURL=project.d.ts.map