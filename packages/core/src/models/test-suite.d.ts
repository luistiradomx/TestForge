import { LocatorDescriptor } from './locator';
/**
 * Represents a test suite — a collection of test cases grouped by feature or flow.
 */
export interface TestSuite {
    id: string;
    name: string;
    description?: string;
    projectId: string;
    tags: string[];
    cases: TestCase[];
    createdAt: Date;
    updatedAt: Date;
}
/**
 * A single test case composed of ordered steps.
 */
export interface TestCase {
    id: string;
    name: string;
    description?: string;
    suiteId: string;
    steps: TestStep[];
    metadata: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * An individual step within a test case.
 */
export interface TestStep {
    id: string;
    order: number;
    type: StepType;
    target?: LocatorDescriptor;
    action: StepAction;
    expectedState?: ExpectedState;
    timeout?: number;
}
export type StepType = 'ui' | 'api' | 'assertion' | 'wait' | 'script';
export interface StepAction {
    command: string;
    parameters: Record<string, unknown>;
}
export interface ExpectedState {
    conditions: StateCondition[];
    operator: 'AND' | 'OR';
}
export interface StateCondition {
    type: 'element_visible' | 'element_text' | 'url_contains' | 'response_status' | 'variable_equals';
    value: unknown;
}
//# sourceMappingURL=test-suite.d.ts.map