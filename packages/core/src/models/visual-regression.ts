/**
 * Visual regression comparison record.
 */
export interface VisualSnapshot {
  id: string;
  runId: string;
  caseId: string;
  stepId: string;
  baselineId?: string;
  imagePath: string;
  width: number;
  height: number;
  takenAt: Date;
}

export interface VisualComparison {
  id: string;
  snapshotId: string;
  baselineId: string;
  diffImagePath?: string;
  diffScore: number;
  /** Regions detected as different by the AI model */
  diffRegions: DiffRegion[];
  status: 'passed' | 'failed' | 'needs_review';
  aiAnalysis?: string;
}

export interface DiffRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  severity: 'low' | 'medium' | 'high';
  description?: string;
}
