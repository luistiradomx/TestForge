import { LocatorDescriptor, LocatorContext } from '@testforge/core';
import { SemanticLocatorEngine } from '@testforge/locator-engine';

const engine = new SemanticLocatorEngine();

export async function resolveLocatorHandler(
  descriptor: LocatorDescriptor,
  context: LocatorContext
): Promise<import('@testforge/core').LocatorCandidate[]> {
  return engine.resolve(descriptor, context);
}

export async function generateLocatorHandler(
  hint: string,
  context: LocatorContext
): Promise<import('@testforge/core').LocatorCandidate[]> {
  return engine.generateCandidates(hint, context);
}
