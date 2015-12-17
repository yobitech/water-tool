$('#drip-update').click(function() {

    data.push();

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