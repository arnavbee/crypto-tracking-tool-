const d3 = window.d3;

// Function to visualize 'to' addresses from transactions
export function visualizeTrail(transactions) {
  console.log('Received transactions:', transactions);

  // Clear any existing SVG content
  d3.select('#visualization-container').html('');

  const width = 800;
  const height = 600;

  const svg = d3.select('#visualization-container').append('svg')
    .attr('width', width)
    .attr('height', height);

  // Process transactions to create nodes and links
  const nodeSet = new Set();
  transactions.forEach(t => {
    nodeSet.add(t.from);
    nodeSet.add(t.to);
  });
  const nodes = Array.from(nodeSet).map(address => ({ id: address }));
  
  const links = transactions.map(t => ({
    source: t.from,
    target: t.to
  }));

  console.log('Nodes:', nodes);
  console.log('Links:', links);

  // Create force simulation
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id))
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(width / 2, height / 2));

  // Create links
  const link = svg.append('g')
    .selectAll('line')
    .data(links)
    .enter().append('line')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6);

  // Create nodes
  const node = svg.append('g')
    .selectAll('circle')
    .data(nodes)
    .enter().append('circle')
    .attr('r', 5)
    .attr('fill', '#00f')
    .call(drag(simulation));

  // Add labels
  const label = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .enter().append('text')
    .text(d => d.id.slice(0, 6) + '...')
    .attr('font-size', 10)
    .attr('dx', 12)
    .attr('dy', 4);

  // Update positions on each tick of the simulation
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node
      .attr('cx', d => Math.max(5, Math.min(width - 5, d.x)))
      .attr('cy', d => Math.max(5, Math.min(height - 5, d.y)));

    label
      .attr('x', d => Math.max(5, Math.min(width - 5, d.x)))
      .attr('y', d => Math.max(5, Math.min(height - 5, d.y)));
  });

  console.log('Simulation started');
}

// Implement the drag function
function drag(simulation) {
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  
  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}