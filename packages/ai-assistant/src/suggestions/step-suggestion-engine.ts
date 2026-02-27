import { TestStep, StepType, LocatorContext } from '@testforge/core';

export interface SuggestionRequest {
  intent: string;
  context: LocatorContext;
  existingSteps?: TestStep[];
}

export interface StepSuggestion {
  step: Omit<TestStep, 'id'>;
  confidence: number;
  explanation: string;
}

/**
 * StepSuggestionEngine — generates test step suggestions from user intent.
 *
 * Design principle: context-aware AI assistance, NOT click recording.
 * Real implementation sends the intent + context to an LLM provider.
 * This baseline uses rule-based heuristics.
 */
export class StepSuggestionEngine {
  suggest(request: SuggestionRequest): StepSuggestion[] {
    const suggestions: StepSuggestion[] = [];
    const intent = request.intent.toLowerCase().trim();

    if (intent.includes('click') || intent.includes('press') || intent.includes('tap')) {
      suggestions.push(this.buildClickSuggestion(request));
    }

    if (intent.includes('type') || intent.includes('enter') || intent.includes('fill')) {
      suggestions.push(this.buildTypeSuggestion(request));
    }

    if (intent.includes('assert') || intent.includes('verify') || intent.includes('check') || intent.includes('should')) {
      suggestions.push(this.buildAssertionSuggestion(request));
    }

    if (intent.includes('navigate') || intent.includes('go to') || intent.includes('open')) {
      suggestions.push(this.buildNavigationSuggestion(request));
    }

    if (intent.includes('wait') || intent.includes('until')) {
      suggestions.push(this.buildWaitSuggestion(request));
    }

    // Default: suggest a generic UI action
    if (suggestions.length === 0) {
      suggestions.push({
        step: {
          order: (request.existingSteps?.length ?? 0) + 1,
          type: 'ui',
          action: { command: 'interact', parameters: { intent: request.intent } },
        },
        confidence: 0.4,
        explanation: `Generic interaction step derived from intent: "${request.intent}"`,
      });
    }

    return suggestions.sort((a, b) => b.confidence - a.confidence);
  }

  private buildClickSuggestion(req: SuggestionRequest): StepSuggestion {
    return {
      step: {
        order: (req.existingSteps?.length ?? 0) + 1,
        type: 'ui' as StepType,
        action: { command: 'click', parameters: { hint: req.intent } },
        timeout: 5000,
      },
      confidence: 0.85,
      explanation: `Detected click intent from: "${req.intent}"`,
    };
  }

  private buildTypeSuggestion(req: SuggestionRequest): StepSuggestion {
    return {
      step: {
        order: (req.existingSteps?.length ?? 0) + 1,
        type: 'ui' as StepType,
        action: { command: 'type', parameters: { hint: req.intent, text: '' } },
        timeout: 5000,
      },
      confidence: 0.82,
      explanation: `Detected type/fill intent from: "${req.intent}"`,
    };
  }

  private buildAssertionSuggestion(req: SuggestionRequest): StepSuggestion {
    return {
      step: {
        order: (req.existingSteps?.length ?? 0) + 1,
        type: 'assertion' as StepType,
        action: { command: 'assert_visible', parameters: { hint: req.intent } },
        expectedState: {
          conditions: [{ type: 'element_visible', value: true }],
          operator: 'AND',
        },
      },
      confidence: 0.88,
      explanation: `Detected assertion intent from: "${req.intent}"`,
    };
  }

  private buildNavigationSuggestion(req: SuggestionRequest): StepSuggestion {
    const url = req.context.url ?? '';
    return {
      step: {
        order: (req.existingSteps?.length ?? 0) + 1,
        type: 'ui' as StepType,
        action: { command: 'navigate', parameters: { url, hint: req.intent } },
      },
      confidence: 0.9,
      explanation: `Detected navigation intent from: "${req.intent}"`,
    };
  }

  private buildWaitSuggestion(req: SuggestionRequest): StepSuggestion {
    return {
      step: {
        order: (req.existingSteps?.length ?? 0) + 1,
        type: 'wait' as StepType,
        action: { command: 'wait_for_element', parameters: { hint: req.intent } },
        timeout: 10000,
      },
      confidence: 0.8,
      explanation: `Detected wait intent from: "${req.intent}"`,
    };
  }
}
