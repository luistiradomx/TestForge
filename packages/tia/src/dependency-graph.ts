import { DependencyNode } from '@testforge/core';

/**
 * DependencyGraph tracks file-to-test relationships.
 * Used by TIA to determine which tests are affected by code changes.
 */
export class DependencyGraph {
  private readonly nodes = new Map<string, DependencyNode>();
  private readonly edges = new Map<string, Set<string>>();

  addNode(node: DependencyNode): void {
    this.nodes.set(node.id, node);
    if (!this.edges.has(node.id)) {
      this.edges.set(node.id, new Set());
    }
  }

  /**
   * Add a dependency edge: `from` depends on `to`.
   */
  addEdge(fromId: string, toId: string): void {
    if (!this.edges.has(fromId)) {
      this.edges.set(fromId, new Set());
    }
    this.edges.get(fromId)!.add(toId);
  }

  /**
   * Return all test node IDs that transitively depend on the given node.
   */
  getAffectedTests(changedNodeId: string): string[] {
    const affected = new Set<string>();
    this.traverseReverse(changedNodeId, affected);
    return Array.from(affected).filter(id => {
      const node = this.nodes.get(id);
      return node?.type === 'test';
    });
  }

  getAllTestIds(): string[] {
    return Array.from(this.nodes.values())
      .filter(n => n.type === 'test')
      .map(n => n.id);
  }

  getNode(id: string): DependencyNode | undefined {
    return this.nodes.get(id);
  }

  nodeCount(): number {
    return this.nodes.size;
  }

  /**
   * Reverse traversal: find all nodes that transitively depend on `nodeId`.
   */
  private traverseReverse(nodeId: string, visited: Set<string>): void {
    for (const [fromId, deps] of this.edges.entries()) {
      if (deps.has(nodeId) && !visited.has(fromId)) {
        visited.add(fromId);
        this.traverseReverse(fromId, visited);
      }
    }
  }
}
