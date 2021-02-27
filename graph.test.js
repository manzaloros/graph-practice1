const Graph = require('./Graph');

describe('graph', () => {
  let graph;
  beforeEach(() => {
    graph = new Graph();
  });

  it('has addEdge, contains, removeEdge, addNode, hasEdge, and forEachNode methods', () => {
    expect(typeof graph.addEdge).toBe('function');
    expect(typeof graph.removeNode).toBe('function');
    expect(typeof graph.contains).toBe('function');
    expect(typeof graph.removeEdge).toBe('function');
    expect(typeof graph.addNode).toBe('function');
    expect(typeof graph.hasEdge).toBe('function');
    expect(typeof graph.forEachNode).toBe('function');
  });

  it('should contain values that were inserted', () => {
    graph.addNode(1);
    expect(graph.contains(1)).toBe(true);
  });

  it('should not contain values that were removed', () => {
    const val = 'hello';
    graph.addNode(val);
    graph.removeNode(val);
    expect(graph.contains(val)).toBe(false);
  });

  it('*should remove a node that was inserted and remove edges from removed nodes as well as accept string nodes', () => {
    graph.addNode('hello');
    graph.addNode('goodbye');
    expect(graph.contains('hello')).toEqual(true);
    graph.addEdge('hello', 'goodbye');
    expect(graph.hasEdge('hello', 'goodbye')).toEqual(true);
    graph.removeNode('goodbye');
    expect(graph.contains('goodbye')).toEqual(false);
    expect(graph.hasEdge('hello', 'goodbye')).toEqual(false);
  });

  it('should create edges between two nodes', () => {
    graph.addNode(2);
    graph.addNode(1);
    graph.addNode(3);
    graph.addEdge(3, 2);
    expect(graph.hasEdge(3, 2)).toEqual(true);
    expect(graph.hasEdge(3, 1)).toEqual(false);
  });

  it('should remove edges between two nodes', () => {
    const greet = 'sup';
    const polite = 'hey there';
    graph.addNode(greet);
    graph.addNode(polite);
    graph.addEdge(greet, polite);
    graph.removeEdge(greet, polite);
    expect(graph.hasEdge(greet, polite)).toBe(false);
  });

  it('should remove edges between nodes when a node is removed', () => {
    graph.addNode(4);
    graph.addNode(5);
    graph.addEdge(5, 4);
    expect(graph.hasEdge(4, 5)).toEqual(true);
    graph.removeNode(5);
    expect(graph.hasEdge(4, 5)).toEqual(false);
  });

  it('should execute a callback on each node in the graph', () => {
    const connectToFive = (item) => {
      graph.addEdge(item, 5);
    };
    graph.addNode(5);
    graph.addNode(2);
    graph.addNode(1);
    graph.addNode(3);
    graph.forEachNode(connectToFive);
    expect(graph.hasEdge(2, 5)).toEqual(true);
    expect(graph.hasEdge(1, 5)).toEqual(true);
    expect(graph.hasEdge(3, 5)).toEqual(true);
    expect(graph.hasEdge(5, 5)).toEqual(true);
  });

  it('should visit every node in the graph with a breadth-first search', () => {
    console.log = jest.fn();

    const connectToFive = (item) => {
      graph.addEdge(item, 5);
    };
    graph.addNode(5);
    graph.addNode(2);
    graph.addNode(1);
    graph.addNode(3);
    graph.forEachNode(connectToFive);

    expect(graph.breadthFirstSearch(3)).toEqual(true);
  });
});
