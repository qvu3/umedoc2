/*=========================================================================================
    File Name: crypto-trading.js
    Description: Basic Datatable
    ----------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
   Version: 3.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

/************************************
*       js of alt pagination        *
************************************/


$('.alt-pagination').DataTable( {
    "paging":         false,
    "bInfo" : false
});
$(window).on("load", function(){

    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: '../../../assets/vendors/js/charts/echarts'
        }
    });


    // Configuration
    // ------------------------------

    require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],


        // Charts setup
        function (ec) {
            // Initialize chart
            // ------------------------------
            var myChart = ec.init(document.getElementById('irregular-line-time-axis'));

            // Chart Options
            // ------------------------------
            chartOptions = {

                // Setup grid
                grid: {
                    x: 40,
                    x2: 20,
                    y: 45,
                    y2: 80
                },

                // Add tooltip
                tooltip : {
                    trigger: 'item',
                    formatter : function (params) {
                        var date = new Date(params.value[0]);
                        data = date.getFullYear() + '-'+ (date.getMonth() + 1) + '-'+ date.getDate() + ' '+ date.getHours() + ':'+ date.getMinutes();
                        return data + '<br/>'+ params.value[1] + ', ' + params.value[2];
                    }
                },
                // Enable Data Zoom
                dataZoom: {
                    show: true,
                    start : 70
                },
                // Add legend
                legend: {
                    data: ['Bitcoin']
                },

                // Add custom colors
                color: ['#FF4961'],

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis : [
                    {
                        type : 'time',
                        splitNumber:5
                    }
                ],

                // Vertical axis
                 yAxis : [
                    {
                        type : 'value'
                    }
                ],

                // Add series
                 series : [
                    {
                        name: 'series1',
                        type: 'line',
                        showAllSymbol: true,
                        symbolSize: function (value){
                            return Math.round(value[2]/10) + 2;
                        },
                        data: (function () {
                            var d = [];
                            var len = 0;
                            var now = new Date();
                            var value;
                            while (len++ < 100) {
                                d.push([
                                    new Date(2014, 5, 1, 0, len * 100),
                                    (Math.random()*20).toFixed(2) - 0,
                                    (Math.random()*30).toFixed(2) - 0
                                ]);
                            }
                            return d;
                        })()
                    }
                ]
            };

            // Apply options
            // ------------------------------

            myChart.setOption(chartOptions);

            // Resize chart
            // ------------------------------

            $(function () {

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
                $(".menu-toggle").on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function() {

                        // Resize chart
                        myChart.resize();
                    }, 200);
                }
            });
        }
    );
});
