import { LocatorDescriptor, LocatorCandidate } from '../models/locator';
/**
 * Contract for the semantic locator engine.
 */
export interface ILocatorEngine {
    /**
     * Resolve the best locator candidate for a given descriptor.
     * Returns scored candidates sorted by confidence.
     */
    resolve(descriptor: LocatorDescriptor, context: LocatorContext): Promise<LocatorCandidate[]>;
    /**
     * Generate locator candidates using AI context analysis.
     */
    generateCandidates(hint: string, context: LocatorContext): Promise<LocatorCandidate[]>;
}
export interface LocatorContext {
    /** Serialized accessible DOM tree snapshot */
    accessibilityTree?: string;
    /** Current page URL */
    url?: string;
    /** Page title */
    title?: string;
    /** Natural language hint provided by the user or AI */
    hint?: string;
    /** Viewport dimensions */
    viewport?: {
        width: number;
        height: number;
    };
}
//# sourceMappingURL=locator-engine.d.ts.map