$('#drip-update').click(function() {

    data.push({ 
        label: "Drip irrigation",
        x: Array.apply(null, {length: N}).map(Number.call, Number), 
        y: (data[0].y).map(function(n) { return n * 0.65; })
    });

    $("#graph").html("");

    var xy_chart = d3_xy_chart()
        // .width(960)
        // .height(500)
        .width(580)
        .height(435)
        .xlabel("Time (years)")
        .ylabel("Water demand (mcm3)") ;
    var svg = d3.select("#graph").append("svg")
        .datum(data)
        .call(xy_chart) ;

})