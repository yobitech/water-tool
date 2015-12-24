var N = 16;
var base = Array.apply(null, {length: N}).map(Number.call, Number);
var ones = repeated_array(N, 1);
var zeros = repeated_array(N, 0);
var years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];


var HEIGHT = 250;
var WIDTH = 500;
// var HEIGHT = 300;
// var WIDTH = 500;
// var HEIGHT = 435;
// var WIDTH = 580;

// var inputs = {
//     years: [0],
//     drips: [5]
// }
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

// function calc_drip(pd) {
//     return (1440*(1-pd/100)*750 + 1440*(pd/100)*525 + 1440*0.65) / 1000000;
//         // return (1440*(1-pd/100)*750 + 1440*(pd/100)*525 + 1440*0.65);

// //     1440*[1 - pct of drip]*750 + 
// // 1440*[pct of drip]*525 +
// // 1440*[.65 which is rain-fed] =
// }

function calc_drip(pd, yr) {
    // console.log(pd, yr, 132*Math.pow(1.0075,yr)*((1-pd/100)+pd/100*.6)+12*Math.pow(1.035,yr)/1000000);
    return 132*Math.pow(1.0075,yr)*((1-pd/100)+pd/100*.6)+12*Math.pow(1.035,yr)/1000000;
}

function calc_supply(yr) {
    return 216*Math.pow(0.99,yr);
}

var data = [ 
    // { label: "Base",
    //    x: base, 
    //    y: exp_mult(N, 1.05, 1)},
    { label: 'GDP', 
        // x: base,
        x: years,
        y: [12, 31, 50, 26, 72, 35, 49, 81, 43, 32, 57, 63, 26, 61, 70, 52]
        // y: exp_mult(N, 1.05, calc_drip(5,1))
        // y: base.map(function (x) {
        //     // console.log(5, x, calc_drip(5,x))
        //     return calc_drip(5,x)
        // })
        // y: base.map(function (x) {return calc_drip(5)*x})

    }, 
    // { label: 'Supply', 
    //     x: base,
    //     y: base.map(function (x) {return calc_supply(x)})
    // } 
   // { 
   //      label: "Drip irrigation",
   //      x: Array.apply(null, {length: N}).map(Number.call, Number), 
   //      y: exp_mult(N, 1.05, 1).map(function(n) { return n * 0.65; })
   //  }
     // { label: "Data Set 2", 
     //   x: [0, 1, 2, 3, 4], 
     //   y: [0, 1, 4, 9, 16] } 
];

var data_supply = [


    { label: 'Base', 
        x: years,
        y: base.map(function (x) {return calc_supply(5,x)})
    }

];


var xy_chart = d3_xy_chart()
    // .width(960)
    // .height(500)
    // .width(580)
    // .height(435)
    .width(WIDTH)
    .height(HEIGHT)
    .xlabel("Time (years)")
    .ylabel("GDP") ;
var svg = d3.select("#graph-demand").append("svg")
    .datum(data)
    .call(xy_chart) ;


var xy_chart_supply = d3_xy_chart()
    // .width(960)
    // .height(500)
    // .width(580)
    // .height(435)
    .width(WIDTH)
    .height(HEIGHT)
    .xlabel("Time (years)")
    .ylabel("Water supply (mcm3)") ;
var svg_supply = d3.select("#graph-supply").append("svg")
    .datum(data_supply)
    .call(xy_chart_supply) ;

function d3_xy_chart() {
    // var width = 640,  
    //     height = 480, 
    // var width = 500,
    //     height = 435,
    //     xlabel = "X Axis Label",
    //     ylabel = "Y Axis Label" ;
    
    function chart(selection) {
        selection.each(function(datasets) {
            //
            // Create the plot. 
            //
            var margin = {top: 20, right: 80, bottom: 30, left: 50}, 
                innerwidth = width - margin.left - margin.right,
                innerheight = height - margin.top - margin.bottom ;
            
            var x_scale = d3.scale.linear()
                .range([0, innerwidth])
                // .domain(d3.min(zeros), d3.max(0))
                .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }), 
                // .domain([ d3.min(ze), 
                          d3.max(datasets, function(d) { return d3.max(d.x); }) ]) ;
            
            var y_scale = d3.scale.linear()
                .range([innerheight, 0])
                // .domain([ d3.min(datasets, function(d) { return d3.min(d.y); }),
                // .domain([ d3.min(datasets, function(d) { return d3.min(d.y)-10000; }),
                .domain([ d3.min(datasets, function(d) { return d3.min(d.y)-15; }),
                // .domain([ d3.min(zeros),
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









        //     var w = 960,
        //     h = 500
        //     // create canvas
        //     var svg = d3.select("#viz").append("svg:svg")
        //     .attr("class", "chart")
        //     .attr("width", w)
        //     .attr("height", h )
        //     .append("svg:g")
        //     .attr("transform", "translate(10,470)");
        //     x = d3.scale.ordinal().rangeRoundBands([0, w-50])
        //     y = d3.scale.linear().range([0, h-50])
        //     z = d3.scale.ordinal().range(["darkblue", "blue", "lightblue"])
        //     console.log("RAW MATRIX---------------------------");
        // // 4 columns: ID,c1,c2,c3
        //     var matrix = [
        //         [ 1,  5871, 8916, 2868],
        //         [ 2, 10048, 2060, 6171],
        //         [ 3, 16145, 8090, 8045],
        //         [ 4,   990,  940, 6907],
        //         [ 5,   450,  430, 5000]
        //     ];
        //     console.log(matrix)
        //     console.log("REMAP---------------------------");
        //     var remapped =["c1","c2","c3"].map(function(dat,i){
        //         return matrix.map(function(d,ii){
        //             return {x: ii, y: d[i+1] };
        //         })
        //     });
        //     console.log(remapped)
        //     console.log("LAYOUT---------------------------");
        //     var stacked = d3.layout.stack()(remapped)
        //     console.log(stacked)
        //     x.domain(stacked[0].map(function(d) { return d.x; }));
        //     y.domain([0, d3.max(stacked[stacked.length - 1], function(d) { return d.y0 + d.y; })]);
        //     // show the domains of the scales              
        //     console.log("x.domain(): " + x.domain())
        //     console.log("y.domain(): " + y.domain())
        //     console.log("------------------------------------------------------------------");
        //     // Add a group for each column.
        //     var valgroup = svg.selectAll("g.valgroup")
        //     .data(stacked)
        //     .enter().append("svg:g")
        //     .attr("class", "valgroup")
        //     .style("fill", function(d, i) { return z(i); })
        //     .style("stroke", function(d, i) { return d3.rgb(z(i)).darker(); });
        //     // Add a rect for each date.
        //     var rect = valgroup.selectAll("rect")
        //     .data(function(d){return d;})
        //     .enter().append("svg:rect")
        //     .attr("x", function(d) { return x(d.x); })
        //     .attr("y", function(d) { return -y(d.y0) - y(d.y); })
        //     .attr("height", function(d) { return y(d.y); })
        //     .attr("width", x.rangeBand());