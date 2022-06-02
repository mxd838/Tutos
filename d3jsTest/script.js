// Faire chart à partir des relevés de tension et autres données médicales

// console.log(d3)

const DUMMY_DATA = [
    { id: 'd1', value: 10, region: 'USA' },
    { id: 'd2', value: 11, region: 'India' },
    { id: 'd3', value: 12, region: 'China' },
    { id: 'd4', value: 6, region: 'Italy' }
]

const xScale = d3.scaleBand()
                 .domain(DUMMY_DATA.map(dataPoint => dataPoint.region ))
                 .rangeRound([0, 250])
                 .padding(0.1)

const yScale = d3.scaleLinear()
                 .domain([0, 15])
                 .range([200, 0])

// d3.select('div')
//     // next line select all p elements which are inside the first select
//     // even if elements don't exist yet, are automatically generated when data which is binded is to is available
//   .selectAll('p')
//   .data(DUMMY_DATA)
//   // list the missing paragraphs for the data
//   .enter()
//   // append the missing paragraphs to the parent element selected, div
//   .append('p')
//   // function returns for each data point binded
//   .text(dta => dta.region) 

// const container = d3.select('div')
//                     .classed('container', true)
//                     .style('border','1px solid red')

// // in that context, doing a selectAll('div') would also select the parent div
// // to prevent this, children divs are associated with a class
// const bars = container.selectAll('.bar')
//                       .data(DUMMY_DATA)
//                       .enter()
//                       // append a div for every missing element, ie one div for each piece of dataf
//                       .append('div')
//                       .classed('bar', true)
//                       .style('width', '50px')
//                       .style('height', data => (data.value * 15) + 'px')

const container = d3.select('svg')
                    .classed('container', true)
                    // .style('border','1px solid red')


const bars = container.selectAll('.bar')
                      .data(DUMMY_DATA)
                      .enter()
                      .append('rect')
                      .classed('bar', true)
                      .attr('width', xScale.bandwidth())
                      // everything calculated from the top left corner so :
                      .attr('height', data => 200 - yScale(data.value))
                      // svg specific attributes
                      .attr('x', data => xScale(data.region))
                      .attr('y', data => yScale(data.value))

// setTimeout(() => {
//     bars.data(DUMMY_DATA.slice(0, 2)).exit().remove()
// }, 2000);