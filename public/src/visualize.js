console.log('Visualize.js loaded');


import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

export function visualizeTrail(transactions, centerAddress) {
  console.log('visualizeTrail function called');

  console.log("Visualizing transactions:", transactions);
  
  // Clear any existing SVG content
  d3.select('#visualization-container').html('');

  const width = 800;
  const height = 600;

  const svg = d3.select('#visualization-container').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black');

  // Add a simple circle using D3
  svg.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', 50)
    .style('fill', 'blue')
    .on('click', function() {
      console.log('Circle clicked');
      alert('Circle clicked');
    });

  // Add some text using D3
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height / 2 + 100)
    .text('Click the circle above')
    .attr('text-anchor', 'middle')
    .style('font-size', '20px')
    .style('fill', 'black');
}