var width = 1000, height = 500;

var colors = d3.scaleOrdinal(d3.schemeDark2);

var svg = d3.select("body").append("svg")
    .attr("width", width).attr("height", height)
    .style("background", "pink")

var newData = d3.json("newData.json");

var details = [{Party:"NUR-OTAN", number:73},{Party:"AK-ZHOL", number:8},{Party:"Communist People's Party", number:7} ];

var data = d3.pie().sort(null).value(function(d){return d.number;})(details);
var segments = d3.arc()
    .innerRadius(0)
    .outerRadius(200)
    .padAngle(.05)
    .padRadius(50)
var sections = svg.append("g").attr("transform", "translate(250,250)")
    .selectAll("path").data(data);
sections.enter().append("path").attr("d", segments).attr("fill", function(d) {return colors(d.data.number);});

var content = d3.select("g").selectAll("text").data(data);

content.enter().append("text").classed("inside", true).each(function(d){
    var center = segments.centroid(d);
    d3.select(this).attr("x", center[0]).attr("y", center[1]).text(d.data.number);
});

var legends = svg.append("g").attr("transform", "translate(500, 100)").selectAll(".legends").data(data);
var legend = legends.enter().append("g").classed("legends", true).attr("transform", function(d,i){return "translate(0,"+(i+1)*30+")";});

legend.append("rect").attr("width", 20).attr("height", 20).attr("fill", function(d){return colors(d.data.number);});
legend.append("text").classed("label", true).text(function(d){return d.data.Party;})
    .attr("fill", function(d){return colors(d.data.number);})
    .attr("x", 30)
    .attr("y", 15);