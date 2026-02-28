import { Trace, TraceStep } from '@testforge/core';

export interface PlaybackOptions {
  speed: number;
  onStep: (step: TraceStep, index: number) => Promise<void>;
  onComplete: () => void;
}

/**
 * TracePlayer — replays a recorded trace step by step.
 * Supports speed control and per-step callbacks for UI rendering.
 */
export class TracePlayer {
  private playing = false;

  async play(trace: Trace, options: PlaybackOptions): Promise<void> {
    this.playing = true;
    const delayPerStep = Math.max(0, 1000 / options.speed);

    for (let i = 0; i < trace.steps.length; i++) {
      if (!this.playing) break;
      await options.onStep(trace.steps[i], i);
      if (i < trace.steps.length - 1) {
        await this.delay(delayPerStep);
      }
    }

    this.playing = false;
    options.onComplete();
  }

  stop(): void {
    this.playing = false;
  }

  isPlaying(): boolean {
    return this.playing;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
