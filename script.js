let titleText = document.getElementById('titleText');
let pyramids = document.getElementById('pyramids');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    // Move the title text up as you scroll
    titleText.style.marginTop = value * 2.5 + 'px';
    
    // Fade out the pyramids as you scroll down
    const maxScroll = 500; 
    const opacity = Math.max(1 - value / maxScroll, 0);
    pyramids.style.opacity = opacity;
});

window.addEventListener('scroll', function() {
    const titleText = document.getElementById('titleText');
    const maxScroll = 200;
    const scrollPos = window.scrollY;

    const opacity = Math.max(1 - scrollPos / maxScroll, 0);
    titleText.style.opacity = opacity;
});

window.addEventListener('scroll', function() {
    const bengalCat = document.getElementById('BengalCat');
    const scrollPos = window.scrollY;
    const maxScroll = 200;

    // Translate the cat image upward as you scroll
    const translateY = Math.min(scrollPos * 2.5, maxScroll); 
    bengalCat.style.transform = `translateY(-${translateY}px)`;
});

document.addEventListener('DOMContentLoaded', function() {
    d3.csv("cats_dataset.csv").then(data => {
        // Parse the data and convert numerical fields
        data.forEach(d => {
            d['Age (Years)'] = +d['Age (Years)'];
            d['Weight (kg)'] = +d['Weight (kg)'];
        });

        // Set dimensions and margins for the visualization
        const margin = { top: 30, right: 10, bottom: 10, left: 10 },
              width = 600 - margin.left - margin.right,
              height = 300 - margin.top - margin.bottom;

        // Create an SVG container without a background color
        const svg = d3.select("#catsdata-viz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Get the keys for each dimension
        const dimensions = Object.keys(data[0]);

        // Create scales for each dimension
        const yScales = {};
        dimensions.forEach(dim => {
            yScales[dim] = d3.scaleLinear()
                .domain(d3.extent(data, d => typeof d[dim] === 'number' ? d[dim] : d[dim].length))
                .range([height, 0]);
        });

        const x = d3.scalePoint()
            .range([0, width])
            .padding(1)
            .domain(dimensions);

        // Draw lines for each data entry
        function path(d) {
            return d3.line()(dimensions.map(dim => [x(dim), yScales[dim](typeof d[dim] === 'number' ? d[dim] : d[dim].length)]));
        }

        svg.selectAll(".foreground")
            .data(data)
            .enter().append("path")
            .attr("class", "foreground")
            .attr("d", path)
            .style("stroke", "#dbac6b") 
            .style("stroke-width", 1.5)
            .style("fill", "none");

        // Axes for each dimension
        dimensions.forEach(dim => {
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(${x(dim)})`)
                .each(function() { d3.select(this).call(d3.axisLeft(yScales[dim])); })
                .selectAll("text")
                .style("font-size", "12px") 
                .style("fill", "#8B4513")  
                .style("font-weight", "bold");

            svg.append("text")
                .attr("transform", `translate(${x(dim)},${-10})`)
                .style("text-anchor", "middle")
                .text(dim)
                .style("fill", "#8B4513")
                .style("font-size", "14px")
                .style("font-weight", "bold");
        });
    }).catch(error => {
        console.error('Error loading the CSV file:', error);
    });
});
