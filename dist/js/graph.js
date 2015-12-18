var N = 16;
var base = Array.apply(null, {length: N}).map(Number.call, Number);
var ones = repeated_array(N, 1);
var zeros = repeated_array(N, 0);

// var inputs = {
//     years: [0],
//     drips: [5]
// }
var inputs = [[0,5]];

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

function calc_drip(pd) {
    return (1440*(1-pd/100)*750 + 1440*(pd/100)*525 + 1440*0.65) / 1000000;
        // return (1440*(1-pd/100)*750 + 1440*(pd/100)*525 + 1440*0.65);

//     1440*[1 - pct of drip]*750 + 
// 1440*[pct of drip]*525 +
// 1440*[.65 which is rain-fed] =
}

var data = [ 
            // { label: "Base",
            //    x: base, 
            //    y: exp_mult(N, 1.05, 1)},
            { label: 'Base', 
                x: base,
                // y: exp_mult(N, 1.05, calc_drip(5))
                y: ones.map(function (x) {return calc_drip(5)*x})
                // y: base.map(function (x) {return calc_drip(5)*x})

            } 
           // { 
           //      label: "Drip irrigation",
           //      x: Array.apply(null, {length: N}).map(Number.call, Number), 
           //      y: exp_mult(N, 1.05, 1).map(function(n) { return n * 0.65; })
           //  }
             // { label: "Data Set 2", 
             //   x: [0, 1, 2, 3, 4], 
             //   y: [0, 1, 4, 9, 16] } 
           ] ;
var xy_chart = d3_xy_chart()
    // .width(960)
    // .height(500)
    // .width(580)
    // .height(435)
    .width(580)
    .height(435)
    .xlabel("Time (years)")
    .ylabel("Water demand (mcm3)") ;
var svg = d3.select("#graph").append("svg")
    .datum(data)
    .call(xy_chart) ;

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
                .domain([ d3.min(datasets, function(d) { return d3.max(d.y)-0.1; }),
                // .domain([ d3.min(zeros),
                          d3.max(datasets, function(d) { return d3.max(d.y)+0.1; }) ]) ;

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