var N = 16;
var base = Array.apply(null, {length: N}).map(Number.call, Number);
var ones = repeated_array(N, 1);
var zeros = repeated_array(N, 0);
var years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];


var HEIGHT = 250;
var WIDTH = 500;
var inputs = [[0,5]];
var inputs_supply = [[0,5]];

function repeated_array(n, v) {
    return Array.apply(null, Array(n)).map(Number.prototype.valueOf,v);
}

function exp_mult(N, e, init) {
    var tmp = [init];
    for (var i=1; i<=N; i++) {
        tmp.push(tmp[i-1]*e)
    }
    return tmp
}

function calc_drip(pd, yr) {
    return 132*Math.pow(1.0075,yr)*((1-pd/100)+pd/100*.6)+12*Math.pow(1.035,yr)/1000000;
}

function calc_supply(yr) {
    return 216*Math.pow(0.99,yr);
}

var data = [ 
    { label: 'GDP', 
        x: years,
        y: [12, 31, 50, 26, 72, 35, 49, 81, 43, 32, 57, 63, 26, 61, 70, 52]
    }, 
];

var data_supply = [
    { label: 'Base', 
        x: years,
        y: base.map(function (x) {return calc_supply(5,x)})
    }
];


var xy_chart = d3_xy_chart()
    .width(WIDTH)
    .height(HEIGHT)
    .xlabel("Time (years)")
    .ylabel("GDP") ;
var svg = d3.select("#graph-demand").append("svg")
    .datum(data)
    .call(xy_chart) ;


// var xy_chart_supply = d3_xy_chart()
//     .width(WIDTH)
//     .height(HEIGHT)
//     .xlabel("Time (years)")
//     .ylabel("Water supply (mcm3)") ;
// var svg_supply = d3.select("#graph-supply").append("svg")
//     .datum(data_supply)
//     .call(xy_chart_supply) ;

function d3_xy_chart() {
    
    function chart(selection) {
        selection.each(function(datasets) {

            var margin = {top: 20, right: 80, bottom: 30, left: 50}, 
                innerwidth = width - margin.left - margin.right,
                innerheight = height - margin.top - margin.bottom ;
            
            var x_scale = d3.scale.linear()
                .range([0, innerwidth])
                .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }), 
                          d3.max(datasets, function(d) { return d3.max(d.x); }) ]) ;
            
            var y_scale = d3.scale.linear()
                .range([innerheight, 0])
                .domain([ d3.min(datasets, function(d) { return d3.min(d.y)-15; }),
                          d3.max(datasets, function(d) { return d3.max(d.y)+15; }) ]) ;

            var color_scale = d3.scale.category10()
                .domain(d3.range(datasets.length)) ;

            var x_axis = d3.svg.axis()
                .scale(x_scale)
                .orient("bottom") ;

            var y_axis = d3.svg.axis()
                .scale(y_scale)
                .orient("left") ;

            var x_grid = d3.svg.axis()
                .scale(x_scale)
                .orient("bottom")
                .tickSize(-innerheight)
                .tickFormat("") ;

            var y_grid = d3.svg.axis()
                .scale(y_scale)
                .orient("left") 
                .tickSize(-innerwidth)
                .tickFormat("") ;

            var draw_line = d3.svg.line()
                .interpolate("basis")
                .x(function(d) { return x_scale(d[0]); })
                .y(function(d) { return y_scale(d[1]); }) ;

            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")") ;
            
            svg.append("g")
                .attr("class", "x grid")
                .attr("transform", "translate(0," + innerheight + ")")
                .call(x_grid) ;

            svg.append("g")
                .attr("class", "y grid")
                .call(y_grid) ;

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + innerheight + ")") 
                .call(x_axis)
                .append("text")
                .attr("dy", "-.71em")
                .attr("x", innerwidth)
                .style("text-anchor", "end")
                .text(xlabel) ;
            
            svg.append("g")
                .attr("class", "y axis")
                .call(y_axis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .style("text-anchor", "end")
                .text(ylabel) ;

            var data_lines = svg.selectAll(".d3_xy_chart_line")
                .data(datasets.map(function(d) {return d3.zip(d.x, d.y);}))
                .enter().append("g")
                .attr("class", "d3_xy_chart_line") ;
            
            data_lines.append("path")
                .attr("class", "line")
                .attr("d", function(d) {return draw_line(d); })
                .attr("stroke", function(_, i) {return color_scale(i);}) ;
            
            data_lines.append("text")
                .datum(function(d, i) { return {name: datasets[i].label, final: d[d.length-1]}; }) 
                .attr("transform", function(d) { 
                    return ( "translate(" + x_scale(d.final[0]) + "," + 
                             y_scale(d.final[1]) + ")" ) ; })
                .attr("x", 3)
                .attr("dy", ".35em")
                .attr("fill", function(_, i) { return color_scale(i); })
                .text(function(d) { return d.name; }) ;

        }) ;
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.xlabel = function(value) {
        if(!arguments.length) return xlabel ;
        xlabel = value ;
        return chart ;
    } ;

    chart.ylabel = function(value) {
        if(!arguments.length) return ylabel ;
        ylabel = value ;
        return chart ;
    } ;

    return chart;
}

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = WIDTH - margin.left - margin.right,
    height = HEIGHT - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.csv("data.csv", function(error, data) {
  // if (error) throw error;
// var data = [
//     ['State,Under 5 Years','5 to 13 Years','14 to 17 Years','18 to 24 Years','25 to 44 Years','45 to 64 Years','65 Years and Over'],
//     ['AL', 310504, 310504,552339,259034,450818,1231572,1215966,641667]
// ]
// var data = [{'State': 'AL', 'Under 5 Years': 310504, '5 to 13 Years': 310504}]
// 12 for domestic drinking water, 3.5 for livestock, 132 for ag, and like 1 for industry
var data = [
    {'Year': 2015, 'Drinking water': 12, 'Livestock': 3.5, 'Agriculture': 132, 'Industry': 1},
    {'Year': 2016, 'Drinking water': 12, 'Livestock': 3.5, 'Agriculture': 132, 'Industry': 1},
    {'Year': 2017, 'Drinking water': 12, 'Livestock': 3.5, 'Agriculture': 132, 'Industry': 1},
    {'Year': 2018, 'Drinking water': 12, 'Livestock': 3.5, 'Agriculture': 132, 'Industry': 1},
    {'Year': 2019, 'Drinking water': 12, 'Livestock': 3.5, 'Agriculture': 132, 'Industry': 1},
    {'Year': 2020, 'Drinking water': 12, 'Livestock': 3.5, 'Agriculture': 132, 'Industry': 1}
]

// var xy_bars = d3_xy_bars()
//     .width(WIDTH)
//     .height(HEIGHT)
//     .xlabel("Time (years)")
//     .ylabel("Water supply (mcm3)") ;
// var svg_bars = d3.select("#graph-supply").append("svg")
//     .datum(data_bars)
//     .call(xy_bars) ;

// function d3_xy_bars() {
    
//     function chart(selection) {
//         selection.each(function(datasets) {

//             var margin = {top: 20, right: 80, bottom: 30, left: 50}, 
//                 innerwidth = width - margin.left - margin.right,
//                 innerheight = height - margin.top - margin.bottom ;
            
//             // var x_scale = d3.scale.linear()
//             //     .range([0, innerwidth])
//             //     .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }), 
//             //               d3.max(datasets, function(d) { return d3.max(d.x); }) ]) ;
            
//             // var y_scale = d3.scale.linear()
//             //     .range([innerheight, 0])
//             //     .domain([ d3.min(datasets, function(d) { return d3.min(d.y)-15; }),
//             //               d3.max(datasets, function(d) { return d3.max(d.y)+15; }) ]) ;

//             // var color_scale = d3.scale.category10()
//             //     .domain(d3.range(datasets.length)) ;

//             var x = d3.scale.ordinal()
//                 .rangeRoundBands([0, width], .1);

//             var y = d3.scale.linear()
//                 .rangeRound([height, 0]);

//             var color = d3.scale.ordinal()
//                 .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


//             var x_axis = d3.svg.axis()
//                 .scale(x)
//                 .orient("bottom") ;

//             var y_axis = d3.svg.axis()
//                 .scale(y)
//                 .orient("left") ;

//             var x_grid = d3.svg.axis()
//                 .scale(x)
//                 .orient("bottom")
//                 .tickSize(-innerheight)
//                 .tickFormat("") ;

//             var y_grid = d3.svg.axis()
//                 .scale(y)
//                 .orient("left") 
//                 .tickSize(-innerwidth)
//                 .tickFormat("") ;

//             // var draw_line = d3.svg.line()
//             //     .interpolate("basis")
//             //     .x(function(d) { return x_scale(d[0]); })
//             //     .y(function(d) { return y_scale(d[1]); }) ;

//             var svg = d3.select(this)
//                 .attr("width", width)
//                 .attr("height", height)
//                 .append("g")
//                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")") ;
            

//             // start appending shapes for axes
//             svg.append("g")
//                 .attr("class", "x grid")
//                 .attr("transform", "translate(0," + innerheight + ")")
//                 .call(x_grid) ;

//             svg.append("g")
//                 .attr("class", "y grid")
//                 .call(y_grid) ;

//             svg.append("g")
//                 .attr("class", "x axis")
//                 .attr("transform", "translate(0," + innerheight + ")") 
//                 .call(x_axis)
//                 .append("text")
//                 .attr("dy", "-.71em")
//                 .attr("x", innerwidth)
//                 .style("text-anchor", "end")
//                 .text(xlabel) ;
            
//             svg.append("g")
//                 .attr("class", "y axis")
//                 .call(y_axis)
//                 .append("text")
//                 .attr("transform", "rotate(-90)")
//                 .attr("y", 6)
//                 .attr("dy", "0.71em")
//                 .style("text-anchor", "end")
//                 .text(ylabel) ;

//             // get the data!

//             color.domain(d3.keys(data[0]).filter(function(key) { console.log(key); return key !== "Year"; }));

//             datasets.forEach(function(d) {
//                 var y0 = 0;
//                 d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
//                 d.total = d.ages[d.ages.length - 1].y1;
//                 // console.log(d, d.ages, d.total);
//             });

//             datasets.sort(function(a, b) { return b.total - a.total; });

//             x.domain(data.map(function(d) { return d.Year; }));
//             y.domain([0, d3.max(data, function(d) { return d.total+50; })]);

//             // append data 

//             var state = svg.selectAll(".state")
//               .data(datasets)
//             .enter().append("g")
//               .attr("class", "g")
//               .attr("transform", function(d) { return "translate(" + x(d.Year) + ",0)"; });

//             state.selectAll("rect")
//               .data(function(d) { return d.ages; })
//             .enter().append("rect")
//               .attr("width", x.rangeBand())
//               .attr("y", function(d) { return y(d.y1); })
//               .attr("height", function(d) { return y(d.y0) - y(d.y1); })
//               .style("fill", function(d) { return color(d.name); });

//             var legend = svg.selectAll(".legend")
//               .data(color.domain().slice().reverse())
//             .enter().append("g")
//               .attr("class", "legend")
//               .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

//             legend.append("rect")
//               .attr("x", width - 18)
//               .attr("width", 18)
//               .attr("height", 18)
//               .style("fill", color);

//             legend.append("text")
//               .attr("x", width - 24)
//               .attr("y", 9)
//               .attr("dy", ".35em")
//               .style("text-anchor", "end")
//               .text(function(d) { return d; });

//             // var data_lines = svg.selectAll(".d3_xy_chart_line")
//             //     .data(datasets.map(function(d) {return d3.zip(d.x, d.y);}))
//             //     .enter().append("g")
//             //     .attr("class", "d3_xy_chart_line") ;
            
//             // data_lines.append("path")
//             //     .attr("class", "line")
//             //     .attr("d", function(d) {return draw_line(d); })
//             //     .attr("stroke", function(_, i) {return color_scale(i);}) ;
            
//             // data_lines.append("text")
//             //     .datum(function(d, i) { return {name: datasets[i].label, final: d[d.length-1]}; }) 
//             //     .attr("transform", function(d) { 
//             //         return ( "translate(" + x_scale(d.final[0]) + "," + 
//             //                  y_scale(d.final[1]) + ")" ) ; })
//             //     .attr("x", 3)
//             //     .attr("dy", ".35em")
//             //     .attr("fill", function(_, i) { return color_scale(i); })
//             //     .text(function(d) { return d.name; }) ;

//         }) ;
//     }

//     chart.width = function(value) {
//         if (!arguments.length) return width;
//         width = value;
//         return chart;
//     };

//     chart.height = function(value) {
//         if (!arguments.length) return height;
//         height = value;
//         return chart;
//     };

//     chart.xlabel = function(value) {
//         if(!arguments.length) return xlabel ;
//         xlabel = value ;
//         return chart ;
//     } ;

//     chart.ylabel = function(value) {
//         if(!arguments.length) return ylabel ;
//         ylabel = value ;
//         return chart ;
//     } ;

//     return chart;
// }

  color.domain(d3.keys(data[0]).filter(function(key) { console.log(key); return key !== "Year"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.ages[d.ages.length - 1].y1;
    console.log(d, d.ages, d.total);
  });

  data.sort(function(a, b) { return b.total - a.total; });

  x.domain(data.map(function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d.total+50; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Population");

  var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.Year) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

// });



 // var w = 960,
 //    h = 500
 // var w = WIDTH,
 //    h = HEIGHT

 //            // create canvas
 //            var svg = d3.select("#viz").append("svg:svg")
 //            .attr("class", "chart")
 //            .attr("width", w)
 //            .attr("height", h)
 //            .append("svg:g")
 //            .attr("transform", "translate(10,470)");

 //            x = d3.scale.ordinal().rangeRoundBands([0, w])
 //            y = d3.scale.linear().range([0, h])
 //            z = d3.scale.ordinal().range(["darkblue", "blue", "lightblue"])

 //            console.log(d3.scale)

 //            console.log("RAW MATRIX---------------------------");
 //        // 4 columns: ID,c1,c2,c3
 //            var matrix = [
 //                [ 1,  5871, 8916, 2868],
 //                [ 2, 10048, 2060, 6171],
 //                [ 3, 16145, 8090, 8045],
 //                [ 4,   990,  940, 6907],
 //                [ 5,   450,  430, 5000]
 //            ];
 //            console.log(matrix)

 //            console.log("REMAP---------------------------");
 //            var remapped =["c1","c2","c3"].map(function(dat,i){
 //                return matrix.map(function(d,ii){
 //                    return {x: ii, y: d[i+1] };
 //                })
 //            });
 //            console.log(remapped)

 //            console.log("LAYOUT---------------------------");
 //            var stacked = d3.layout.stack()(remapped)
 //            console.log(stacked)

 //            x.domain(stacked[0].map(function(d) { return d.x; }));
 //            y.domain([0, d3.max(stacked[stacked.length - 1], function(d) { return d.y0 + d.y; })]);

 //            // show the domains of the scales              
 //            console.log("x.domain(): " + x.domain())
 //            console.log("y.domain(): " + y.domain())
 //            console.log("------------------------------------------------------------------");

 //            // Add a group for each column.
 //            var valgroup = svg.selectAll("g.valgroup")
 //            .data(stacked)
 //            .enter().append("svg:g")
 //            .attr("class", "valgroup")
 //            .style("fill", function(d, i) { return z(i); })
 //            .style("stroke", function(d, i) { return d3.rgb(z(i)).darker(); });

 //            // Add a rect for each date.
 //            var rect = valgroup.selectAll("rect")
 //                .data(function(d){return d;})
 //                .enter().append("svg:rect")
 //                .attr("x", function(d) { console.log(x(d.x)); return x(d.x); })
 //                .attr("y", function(d) { console.log(-y(d.y0) - y(d.y)); return -y(d.y0) - y(d.y); })
 //                .attr("height", function(d) { console.log(y(d.y), x.rangeBand()); return y(d.y); })
 //                .attr("width", x.rangeBand());

 //            // console.log(x.rangeBand());


