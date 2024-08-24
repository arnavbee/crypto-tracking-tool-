const d3 = window.d3;

// Example function to create a simple D3 visualization
export function visualizeTrail(trail) {
  // Clear the previous SVG if any
  d3.select('svg').remove();

  const width = 800;
  const height = 600;

  // Create SVG container
  const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

  // Example data and layout
  const nodes = trail.map((node, i) => ({ id: i, name: node }));
  const links = nodes.slice(1).map((node, i) => ({
    source: nodes[i].id,
    target: node.id
  }));

  // Create a simulation
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));

  // Create links
  svg.selectAll('line')
    .data(links)
    .enter().append('line')
    .attr('stroke', '#999')
    .attr('stroke-width', '2px');

  // Create nodes
  const node = svg.selectAll('circle')
    .data(nodes)
    .enter().append('circle')
    .attr('r', 5)
    .attr('fill', '#00f')
    .call(drag(simulation));

  // Add labels
  svg.selectAll('text')
    .data(nodes)
    .enter().append('text')
    .attr('x', 10)
    .attr('y', 3)
    .text(d => d.name);

  // Update simulation
  simulation.on('tick', () => {
    svg.selectAll('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    svg.selectAll('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    svg.selectAll('text')
      .attr('x', d => d.x + 10)
      .attr('y', d => d.y);
  });
}

// Drag behavior
function drag(simulation) {
  function dragStarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragEnded(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
    .on('start', dragStarted)
    .on('drag', dragged)
    .on('end', dragEnded);
}
