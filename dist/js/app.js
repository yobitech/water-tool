

var slider_rainfall = $('#slider-rainfall').slider({
    formatter: function(value) {
        return value+'%';
    }
});
var slider_chicken = $('#slider-chicken').slider({
    formatter: function(value) {
        return value+'%';
    }
});
$('#slider-chicken').slider('disable');
var slider_cattle = $('#slider-cattle').slider({
    formatter: function(value) {
        return value+'%';
    }
});
$('#slider-cattle').slider('disable');
var slider_buffalo = $('#slider-buffalo').slider({
    formatter: function(value) {
        return value+'%';
    }
});
$('#slider-buffalo').slider('disable');
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

// var irrigation_wheat = $('#irrigation-wheat').slider({
//     min: 0, max: 100, value: [93, 99, 1]
// });
// // $('#irrigation-wheat').css('margin-left', '15px');
// var irrigation_mustard = $('#irrigation-mustard').slider({
//     min: 0, max: 100, value: [55, 99, 1]
// });
// var irrigation_paddy = $('#irrigation-paddy').slider({
//     min: 0, max: 100, value: [100, 100, 100]
// });
// var irrigation_raya = $('#irrigation-raya').slider({
//     min: 0, max: 100, value: [100, 100, 100], range: true
// });
// var irrigation_bajra = $('#irrigation-bajra').slider({
//     min: 0, max: 100, value: [40, 99, 1]
// });
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
    // year_data.Agriculture =
    // var sum_ag = $('#box-wheat').val()+ 
    // $('#box-agriculture').val(parseFloat(
    //     data_crops[year]['w']+data_crops[year]['m']+data_crops[year]['p']+
    //     data_crops[year]['r']+data_crops[year]['b']));
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
    
    $('#box-wheat-flood').val('93%');
    $('#box-wheat-rain').val('6%');
    $('#box-wheat-drip').val('1%');

    $('#box-mustard-flood').val('55%');
    $('#box-mustard-rain').val('44%');
    $('#box-mustard-drip').val('1%');

    $('#box-paddy-flood').val('100%');
    $('#box-paddy-rain').val('0%');
    $('#box-paddy-drip').val('0%');

    $('#box-raya-flood').val('100%');
    $('#box-raya-rain').val('0%');
    $('#box-raya-drip').val('0%');

    $('#box-bajra-flood').val('40%');
    $('#box-bajra-rain').val('59%');
    $('#box-bajra-drip').val('1%');

    $('#box-growth').val(parseFloat(drinking_numbers.growth[year]).toFixed(2));
    $('#box-consumption').val(parseFloat(drinking_numbers.consumption[year]).toFixed(2));
}
// $(document).ready( function() {
sessionStorage.year_curr = $('#box-year').val()-2015;
populate_info(sessionStorage.year_curr);

// });


$('#update-year').click(function (e) {
    e.preventDefault();
    var box_year_val = $('#box-year').val();
    // console.log(box_year_val)
    if (box_year_val < 2015) {
        alert('Year must be greater than 2015');
    }
    else if (box_year_val > 2030) {
        alert('Year must be less than 2030');
    }
    else {
        sessionStorage.year_curr = box_year_val - 2015;
        populate_info(sessionStorage.year_curr);

        // update rainfall
        // 
        // $('#box-rainfall').val(new_rainfall);
        // 
    }
});



$('#update-rainfall').click(function(e) {
    e.preventDefault();
    
    // update data
    var update_rainfall = slider_rainfall.slider('getValue') / 100;
    // console.log('not updated', data_rainfall)
    data_rainfall[sessionStorage.year_curr] *= update_rainfall;
    // console.log('updated', data_rainfall)
    $('#box-rainfall').val(parseFloat(data_rainfall[sessionStorage.year_curr]).toFixed(2));

    // update graph
    data_supply[0].y[sessionStorage.year_curr] = calc_supply_rf(data_rainfall[sessionStorage.year_curr]);
    $("#graph-supply").html("");

    var xy_bars = d3_xy_bars()
        .width(WIDTH)
        .height(HEIGHT)
        .xlabel("Time (years)")
        .ylabel("Water supply (mcm3)") ;
    var svg_bars = d3.select("#graph-supply").append("svg")
        .datum({'bars': data_bars, 'lines': data_supply})
        .call(xy_bars) ;

    console.log('not updated', data[0].y);
    data[0].y = calc_ecoutput(data_crops, data_rainfall);
    console.log('updated', data[0].y);

    $('#graph-demand').html("");

    var xy_chart = d3_xy_chart()
        .width(WIDTH)
        .height(HEIGHT)
        .xlabel("Time (years)")
        .ylabel("Economic output") ;
    var svg = d3.select("#graph-demand").append("svg")
        .datum(data)
        .call(xy_chart) ;

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

$('#update-agriculture').click(function(e) {
    e.preventDefault();

    // console.log('before', calc_ag_demand(sessionStorage.year_curr, data_crops));

    var update_wheat = slider_wheat.slider('getValue') / 100;
    var update_mustard = slider_mustard.slider('getValue') / 100;
    var update_paddy = slider_paddy.slider('getValue') / 100;
    var update_raya = slider_raya.slider('getValue') / 100;
    var update_bajra = slider_bajra.slider('getValue') / 100;

    data_crops[sessionStorage.year_curr]['w'] = update_wheat * init['w'];
    data_crops[sessionStorage.year_curr]['m'] = update_mustard * init['m'];
    data_crops[sessionStorage.year_curr]['p'] = update_paddy * init['p'];
    data_crops[sessionStorage.year_curr]['r'] = update_raya * init['r'];
    data_crops[sessionStorage.year_curr]['b'] = update_bajra * init['b'];

    populate_info(sessionStorage.year_curr);

    data_bars[sessionStorage.year_curr].Agriculture = calc_ag_demand(sessionStorage.year_curr, data_crops);
    // console.log('after', calc_ag_demand(sessionStorage.year_curr, data_crops));

    $("#graph-supply").html("");

    var xy_bars = d3_xy_bars()
        .width(WIDTH)
        .height(HEIGHT)
        .xlabel("Time (years)")
        .ylabel("Water supply (mcm3)") ;
    var svg_bars = d3.select("#graph-supply").append("svg")
        .datum({'bars': data_bars, 'lines': data_supply})
        .call(xy_bars) ;

    // update ec output too
    data[0].y = calc_ecoutput(data_crops, data_rainfall);

    $('#graph-demand').html("");

    var xy_chart = d3_xy_chart()
        .width(WIDTH)
        .height(HEIGHT)
        .xlabel("Time (years)")
        .ylabel("Economic output") ;
    var svg = d3.select("#graph-demand").append("svg")
        .datum(data)
        .call(xy_chart) ;

});

$('#update-drinking').click(function (e) {
    e.preventDefault();
    var update_growth = Number($('#box-growth').val());
    var update_consumption = Number($('#box-consumption').val());

    // console.log(N-sessionStorage.year_curr);
    // console.log(update_growth);

    // make all following growth/consumption that number
    drinking_numbers.growth = drinking_numbers.growth
        .slice(0, sessionStorage.year_curr)
        .concat(repeated_array(N-sessionStorage.year_curr, update_growth));
    drinking_numbers.consumption = drinking_numbers.consumption
        .slice(0, sessionStorage.year_curr)
        .concat(repeated_array(N-sessionStorage.year_curr, update_consumption));

    populate_info(sessionStorage.year_curr);

    for (var i=sessionStorage.year_curr; i<N; i++) {
        data_bars[i].Drinking = calc_drinking(drinking_numbers.consumption[i], drinking_numbers.growth[i], i);
    }

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

/* show/hide details */

$('#details-drinking').click(function (e) {
    e.preventDefault();
    $('#details-drinking-div').toggle();
    if ($('#update-drinking').prop('disabled')) {
        $('#update-drinking').prop('disabled', false);
    }
    else {
        $('#update-drinking').prop('disabled', true);
    }
});

$('#details-livestock').click(function (e) {
    e.preventDefault();
    $('#details-livestock-div').toggle();
});

$('#details-agriculture').click(function (e) {
    e.preventDefault();
    $('#details-agriculture-div').toggle();
    if ($('#update-agriculture').prop('disabled')) {
        $('#update-agriculture').prop('disabled', false);
    }
    else {
        $('#update-agriculture').prop('disabled', true);
    }
});

$('#district-button').click(function (e) {
    e.preventDefault();
    $(this).addClass('active');
    $('#community-button').removeClass('active');
    $('#drinking-outside-div').show();
    $('#livestock-outside-div').show();
    $('#industry-outside-div').show();
});

$('#community-button').click(function (e) {
    e.preventDefault();
    $(this).addClass('active');
    $('#district-button').removeClass('active');
    $('#drinking-outside-div').hide();
    $('#livestock-outside-div').hide();
    $('#industry-outside-div').hide();
});



