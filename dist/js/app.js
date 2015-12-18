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
    }


    // data.push();

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

});


function calc_drip_inputs(inputs) {

}