$('#drip-update').click(function() {

    // get the inputs
    var year = $('#input-year').val();
    var drip = $('#input-drip').val();

    // console.log(year, drip);

    // check if values are null
    if (year == '' || drip == '') {
        alert("Please fill in necessary values!")
    }
    else if (year > 15) {
        alert("Year must be less than 15.")
    }
    else if (drip > 35) {
        alert("Drip must be less than 35.")
    }
    else {

        // clear everything from the form
        $('#input-year').val('');
        $('#input-drip').val('');

        // put it in the html table
        $('#input-table').find('tbody')
            .append($('<tr>')
                .append($('<th>')
                    .text(year)
                )
                .append($('<td>')
                    .text(drip)
                )
                .append($('<td>')
                    .text(100-drip)
                )
                .append($('<td>')
                    .text(65)
                )
            );

        // calculate the new values

        inputs.push([Number(year), Number(drip)]);

    }


    // data.push();

   

});

$('#plot-update').click(function() {

    if (data.length > 1) {
        data.splice(1, 1);
    }

    data.push({
        label: 'Policy',
        x: base,
        y: calc_drip_inputs(inputs)
    });

    // redraw the graph
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


function calc_drip_inputs(inputs) {

    // sort the arrays
    inputs.sort(Comparator);
    var ret = [];

    // create series of arrays
    for (var i = 0; i < inputs.length; i++) {

        console.log(inputs[i], inputs[i+1]);

        var year_diff = (i == inputs.length - 1) ? (15-inputs[i][0]) : (inputs[i+1][0] - inputs[i][0]);
        var drip_val = calc_drip(inputs[i][1]);
        console.log(year_diff, drip_val);
        // console.log(repeated_array( year_diff, drip_val ));
        ret = ret.concat(repeated_array( year_diff, drip_val ));
        // console.log(ret);

    }

    // console.log(ret);
    return ret;

}

function Comparator(a,b) {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
}