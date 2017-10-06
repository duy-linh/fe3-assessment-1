// Dit is de code van 'Mike Bostock', aantal aanpassingen in de code zijn gedaan door mij. Source code: https://bl.ocks.org/mbostock/3885304

// Maak een variable svg
var svg = d3.select("svg"),
    
    // Geef margin aan het canvas
    margin = {top: 20, right: 20, bottom: 100, left: 120}, 
    
    // Pak width en height, neemt margin left en right van af
    width = +svg.attr("width") - margin.left - margin.right, 
    height = +svg.attr("height") - margin.top - margin.bottom;

// Maak van de gegeven waarden een passende schaal
var x = d3.scaleBand().rangeRound([0, width]).padding(0.35),
    y = d3.scaleLinear().rangeRound([height, 0]);

// Geef de svg een groep met de gegeven attributes
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Pak data uit de TSV file
d3.tsv("languages.tsv", function(d) {
    
  // Maak van de data een nummer
  d.speakers = +d.speakers;
  return d;
 
   // Geef error als data niet gevonden is, in console
}, function(error, data) {
  if (error) throw error;

  // Pak alle data, maak een passende schaal 'domain/range'
  x.domain(data.map(function(d) { return d.language; }));
  y.domain([0, d3.max(data, function(d) { return d.speakers; })]);

  // Geef de x as verschillende attributes    
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("x", -10)
      .attr("y", 5)
      .attr("transform", "rotate(-45)")
  
  // Geef de y as verschillende attributes 
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 0)
      .attr("y", -100)
      .attr("fill", "black")
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Number of speakers");
  
  // Maak de bar
  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.language); })
      .attr("y", function(d) { return y(d.speakers); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.speakers); });
});
