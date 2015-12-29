// $('#drip-update').click(function() {

//     // get the inputs
//     var year = $('#input-year').val();
//     var drip = $('#input-drip').val();

//     // console.log(year, drip);

//     // check if values are null
//     if (year == '' || drip == '') {
//         alert("Please fill in necessary values!")
//     }
//     else if (year > 15) {
//         alert("Year must be less than 15.")
//     }
//     else if (drip > 35) {
//         alert("Drip must be less than 35.")
//     }
//     else {

//         // clear everything from the form
//         $('#input-year').val('');
//         $('#input-drip').val('');

//         // put it in the html table
//         $('#input-table').find('tbody')
//             .append($('<tr>')
//                 .append($('<th>')
//                     .text(year)
//                 )
//                 .append($('<td>')
//                     .text(drip)
//                 )
//                 .append($('<td>')
//                     .text(100-drip)
//                 )
//                 .append($('<td>')
//                     .text(65)
//                 )
//             );

//         // calculate the new values

//         inputs.push([Number(year), Number(drip)]);

//     }

// });

// $('#plot-update').click(function() {

//     if (data.length > 2) {
//         data.splice(2, 1);
//     }

//     data.push({
//         label: 'Policy',
//         x: base,
//         y: calc_drip_inputs(inputs)
//     });

//     // redraw the graph
//      $("#graph-demand").html("");

//     var xy_chart = d3_xy_chart()
//         // .width(960)
//         // .height(500)
//         .width(WIDTH)
//         .height(HEIGHT)
//         .xlabel("Time (years)")
//         .ylabel("Water demand (mcm3)") ;
//     var svg = d3.select("#graph-demand").append("svg")
//         .datum(data)
//         .call(xy_chart) ;

// });

// $('#rainfall-update').click(function() {

//     // get the inputs
//     var year = $('#input-year-supply').val();
//     var drip = $('#input-drip-supply').val();

//     // console.log(year, drip);

//     // check if values are null
//     if (year == '' || drip == '') {
//         alert("Please fill in necessary values!")
//     }
//     else if (year > 15) {
//         alert("Year must be less than 15.")
//     }
//     else if (drip > 35) {
//         alert("Drip must be less than 35.")
//     }
//     else {

//         // clear everything from the form
//         $('#input-year-supply').val('');
//         $('#input-drip-supply').val('');

//         // put it in the html table
//         $('#input-table-supply').find('tbody')
//             .append($('<tr>')
//                 .append($('<th>')
//                     .text(year)
//                 )
//                 .append($('<td>')
//                     .text(drip)
//                 )
//                 .append($('<td>')
//                     .text(100-drip)
//                 )
//                 .append($('<td>')
//                     .text(65)
//                 )
//             );

//         // calculate the new values
//         inputs_supply.push([Number(year), Number(drip)]);

//     }

// });

// $('#plot-update-supply').click(function() {

//     if (data_supply.length > 1) {
//         data_supply.splice(1, 1);
//     }

//     data_supply.push({
//         label: 'Policy',
//         x: base,
//         y: calc_drip_inputs(inputs_supply)
//     });

//     // redraw the graph
//      $("#graph-supply").html("");

//     var xy_chart = d3_xy_chart()
//         // .width(960)
//         // .height(500)
//         .width(WIDTH)
//         .height(HEIGHT)
//         .xlabel("Time (years)")
//         .ylabel("Water supply (mcm3)") ;
//     var svg = d3.select("#graph-supply").append("svg")
//         .datum(data_supply)
//         .call(xy_chart_supply) ;

// });


// function calc_drip_inputs(inputs) {

//     // sort the arrays
//     inputs.sort(Comparator);
//     console.log(inputs);
//     var ret = [];

//     // create series of arrays
//     for (var i = 0; i < inputs.length; i++) {



//         // console.log(inputs[i], inputs[i+1]);
//         var year_in = Number(inputs[i][0]);

//         var year_diff = (i == inputs.length - 1) ? (16-year_in) : (inputs[i+1][0] - year_in);
//         var drip_val = Number(inputs[i][1]);
//         // var drip_val = calc_drip(inputs[i][1]);
//         console.log(year_diff, drip_val);

//         for (var j = year_in; j < year_in+year_diff; j++) {
//             ret.push(calc_drip(drip_val, j));
//         };
//         // console.log(repeated_array( year_diff, drip_val ));
//         // ret = ret.concat(repeated_array( year_diff, drip_val ));
//         // console.log(ret);

//     }

//     // console.log(ret);
//     return ret;

// }

// function Comparator(a,b) {
//     if (a[0] < b[0]) return -1;
//     if (a[0] > b[0]) return 1;
//     return 0;
// }

var slider_rainfall = $('#slider-rainfall').slider({
    formatter: function(value) {
        return value+'%';
    }
});
$('#slider-wheat').slider({
    formatter: function(value) {
        return value+'%';
    }
});
$('#slider-mustard').slider({
    formatter: function(value) {
        return value+'%';
    }
});
$('#slider-paddy').slider({
    formatter: function(value) {
        return value+'%';
    }
});

$('#slider-raya').slider({
    formatter: function(value) {
        return value+'%';
    }
});
$('#slider-bajra').slider({
    formatter: function(value) {
        return value+'%';
    }
});
// $('#ex6').slider({
//     formatter: function(value) {
//         return value+'%';
//     }
// });
// $("#ex16b").slider({ min: 0, max: 100, value: [10,20,30,60], focus: true });
// new Slider("#ex16b", { min: 0, max: 10, value: [0, 10], focus: true });


function populate_info(year) {

    // get data from data_bars for year
    // console.log(2015-Number(year));
    var years_data = data_bars.filter(function (obj) {
        return obj.Year == (Number(year)-2015);
    });
    console.log(years_data);
    var year_data = years_data[0];

    // drinking
    $('#box-drinking').val(parseFloat(year_data.Drinking).toFixed(2));
    $('#box-livestock').val(parseFloat(year_data.Livestock).toFixed(2));
    $('#box-agriculture').val(parseFloat(year_data.Agriculture).toFixed(1));
    $('#box-industry').val(parseFloat(year_data.Industry).toFixed(2));
    // livestock
    // agriculture
    // industry


}
// $(document).ready( function() {
    var year_curr = $('#box-year').val();
    populate_info(year_curr);
    $('#box-rainfall').val(init.rainfall);
// });


$('#update-year').click(function () {
    year_curr = $('#box-year').val();
    if (year_curr < 2015) {
        alert('Year must be greater than 2015');
    }
    else if (year_curr > 2030) {
        alert('Year must be less than 2030');
    }
    else {
        populate_info(year_curr);
    }
});



$('#update-rainfall').click(function() {
    
    var update_rainfall = slider_rainfall.slider('getValue') / 100;
    var curr_rainfall = $('#box-rainfall').val();
    $('#box-rainfall').val(curr_rainfall * update_rainfall);
    // update stored data
    data_rainfall['y'+0] = curr_rainfall * update_rainfall;
    // update graph



});





