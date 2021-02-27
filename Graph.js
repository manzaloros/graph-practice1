/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
class Node {
  constructor(val) {
    this.val = val;
    this.edges = [];
  }

  removeAdjacent(node) {
    const index = this.edges.indexOf(node);
    if (index > -1) {
      this.edges.splice(index, 1);
      return node;
    }
    return null;
  }

  addAdjacent(node) {
    if (this.edges.indexOf(node) === -1) {
      this.edges.push(node);
    }
  }

  isAdjacent(node) {
    return this.edges.indexOf(node) > -1;
  }
}

class Graph {
  constructor() {
    this.nodes = {};
  }

  addNode(val) {
    const node = new Node(val);
    this.nodes[val] = node;
  }

  contains(val) {
    return Object.prototype.hasOwnProperty.call(this.nodes, val);
  }

  removeNode(val) {
    if (this.nodes[val]) {
      for (const [_, node] of Object.entries(this.nodes)) {
        if (Object.hasOwnProperty.call(this.nodes, node)) {
          node.removeAdjacent(this.nodes[val]);
        }
      }
      delete this.nodes[val];
    }
  }

  addEdge(source, destination) {
    const sourceNode = this.nodes[source];
    const destinationNode = this.nodes[destination];

    sourceNode.addAdjacent(destinationNode);
    destinationNode.addAdjacent(sourceNode);
  }

  hasEdge(val1, val2) {
    const node1 = this.nodes[val1];
    const node2 = this.nodes[val2];
    return node1.isAdjacent(node2);
  }

  removeEdge(source, destination) {
    const sourceNode = this.nodes[source];
    const destinationNode = this.nodes[destination];

    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode);
      destinationNode.removeAdjacent(sourceNode);
    }
  }

  forEachNode(cb) {
    for (const [val, node] of Object.entries(this.nodes)) {
      cb(val);
    }
  }

  breadthFirstSearch(val) {
    const firstNode = Object.values(this.nodes)[0];
    const queue = [firstNode];
    const visited = new Map();
    visited.set(firstNode, true);

    while (queue.length > 0) {
      const current = queue.shift();
      for (let i = 0; i < current.edges.length; i += 1) {
        const node = current.edges[i];

        if (node.val === val) return true;
        if (!visited.has(node)) {
          visited.set(node, true);
          node.edges.forEach((e) => queue.push(e));
        }
      }
    }
    return false;
  }
}

module.exports = Graph;
