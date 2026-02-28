/**
 * Abstraction layer for AI/LLM providers.
 * Implementations can be OpenAI, Azure OpenAI, Anthropic, local models, etc.
 */
export interface IAIProvider {
  readonly id: string;
  readonly name: string;

  /**
   * Send a prompt and return the completion text.
   */
  complete(prompt: string, options?: AICompletionOptions): Promise<string>;

  /**
   * Check if the provider is available and configured.
   */
  isAvailable(): boolean;
}

export interface AICompletionOptions {
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

/**
 * Null provider — used when no AI provider is configured.
 * Returns empty responses gracefully.
 */
export class NullAIProvider implements IAIProvider {
  readonly id = 'null';
  readonly name = 'Null Provider (no AI)';

  async complete(_prompt: string, _options?: AICompletionOptions): Promise<string> {
    return '';
  }

  isAvailable(): boolean {
    return false;
  }
}
