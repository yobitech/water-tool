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
var slider_wheat = $('#slider-wheat').slider({
    formatter: function(value) {
        return value+'%';
    }
});
var slider_mustard = $('#slider-mustard').slider({
    formatter: function(value) {
        return value+'%';
    }
});
var slider_paddy = $('#slider-paddy').slider({
    formatter: function(value) {
        return value+'%';
    }
});

var slider_raya = $('#slider-raya').slider({
    formatter: function(value) {
        return value+'%';
    }
});
var slider_bajra = $('#slider-bajra').slider({
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
        return obj.Year == year;
    });
    // console.log(years_data);
    var year_data = years_data[0];

    $('#box-rainfall').val(data_rainfall[year]);
    slider_rainfall.slider('setValue', data_rainfall[year] / init.rainfall * 100);

    $('#box-drinking').val(parseFloat(year_data.Drinking).toFixed(2));
    $('#box-livestock').val(parseFloat(year_data.Livestock).toFixed(2));
    $('#box-agriculture').val(parseFloat(year_data.Agriculture).toFixed(1));
    $('#box-industry').val(parseFloat(year_data.Industry).toFixed(2));

    $('#box-wheat').val(parseFloat(data_crops[year]['w']).toFixed(2));
    $('#box-mustard').val(parseFloat(data_crops[year]['m']).toFixed(2));
    $('#box-paddy').val(parseFloat(data_crops[year]['p']).toFixed(2));
    $('#box-raya').val(parseFloat(data_crops[year]['r']).toFixed(2));
    $('#box-bajra').val(parseFloat(data_crops[year]['b']).toFixed(2));

    slider_wheat.slider('setValue', data_crops[year]['w'] / init['w'] * 100);
    slider_mustard.slider('setValue', data_crops[year]['m'] / init['m'] * 100);
    slider_paddy.slider('setValue', data_crops[year]['p'] / init['p'] * 100);
    slider_raya.slider('setValue', data_crops[year]['r'] / init['r'] * 100);
    slider_bajra.slider('setValue', data_crops[year]['b'] / init['b'] * 100);
    
}
// $(document).ready( function() {
var year_curr = $('#box-year').val()-2015;
populate_info(year_curr);

// });


$('#update-year').click(function () {
    var box_year_val = $('#box-year').val();
    // console.log(box_year_val)
    if (box_year_val < 2015) {
        alert('Year must be greater than 2015');
    }
    else if (box_year_val > 2030) {
        alert('Year must be less than 2030');
    }
    else {
        year_curr = box_year_val - 2015;
        populate_info(year_curr);

        // update rainfall
        // 
        // $('#box-rainfall').val(new_rainfall);
        // 
    }
});



$('#update-rainfall').click(function() {
    
    // update data
    var update_rainfall = slider_rainfall.slider('getValue') / 100;
    data_rainfall[year_curr] = update_rainfall * init.rainfall;
    $('#box-rainfall').val(parseFloat(data_rainfall[year_curr]).toFixed(2));

    // update graph
    data_supply[0].y[year_curr] = calc_supply_rf(data_rainfall[year_curr]);
    $("#graph-supply").html("");

    var xy_bars = d3_xy_bars()
        .width(WIDTH)
        .height(HEIGHT)
        .xlabel("Time (years)")
        .ylabel("Water supply (mcm3)") ;
    var svg_bars = d3.select("#graph-supply").append("svg")
        .datum({'bars': data_bars, 'lines': data_supply})
        .call(xy_bars) ;

    // var xy_chart = d3_xy_chart()
    //     // .width(960)
    //     // .height(500)
    //     .width(WIDTH)
    //     .height(HEIGHT)
    //     .xlabel("Time (years)")
    //     .ylabel("Water demand (mcm3)") ;
    // var svg = d3.select("#graph-supply").append("svg")
    //     .datum(data)
    //     .call(xy_chart) ;

});

$('#update-agriculture').click(function() {

    console.log('before', calc_ag_demand(year_curr, data_crops));

    var update_wheat = slider_wheat.slider('getValue') / 100;
    var update_mustard = slider_mustard.slider('getValue') / 100;
    var update_paddy = slider_paddy.slider('getValue') / 100;
    var update_raya = slider_raya.slider('getValue') / 100;
    var update_bajra = slider_bajra.slider('getValue') / 100;

    data_crops[year_curr]['w'] = update_wheat * init['w'];
    data_crops[year_curr]['m'] = update_mustard * init['m'];
    data_crops[year_curr]['p'] = update_paddy * init['p'];
    data_crops[year_curr]['r'] = update_raya * init['r'];
    data_crops[year_curr]['b'] = update_bajra * init['b'];

    populate_info(year_curr);

    data_bars[year_curr].Agriculture = calc_ag_demand(year_curr, data_crops);
    console.log('after', calc_ag_demand(year_curr, data_crops));

    $("#graph-supply").html("");

    var xy_bars = d3_xy_bars()
        .width(WIDTH)
        .height(HEIGHT)
        .xlabel("Time (years)")
        .ylabel("Water supply (mcm3)") ;
    var svg_bars = d3.select("#graph-supply").append("svg")
        .datum({'bars': data_bars, 'lines': data_supply})
        .call(xy_bars) ;

});








