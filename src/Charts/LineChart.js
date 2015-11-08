define([],
function () {
   'use strict';

    var _zoomChart = function(chartData, chart) {
        chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
    }

    var LineChart = function(chartId, balloonText) { 
        this.chartId = chartId;
        this.balloonText = balloonText;
    }

    LineChart.prototype.chartId = undefined;
    LineChart.prototype.balloonText = undefined;
    LineChart.prototype.chartData = undefined;
    LineChart.prototype.vertialAxis = undefined;
    LineChart.prototype.horizontalAxis = undefined;

    LineChart.prototype.update = function(vertialAxis, horizontalAxis) {
        this.init(this.chartData, vertialAxis, horizontalAxis)
    }

    LineChart.prototype.init = function(chartData, vertialAxis, horizontalAxis) {
        this.chartData = chartData;
        this.vertialAxis = vertialAxis;
        this.horizontalAxis = horizontalAxis;

        var chart = AmCharts.makeChart(this.chartId, {
            "type": "serial",
            "theme": "light",
            "marginRight": 80,
            "autoMarginOffset": 20,
            "marginTop": 7,
            "dataProvider": chartData,
            "valueAxes": [{
                "axisAlpha": 0.2,
                "dashLength": 1,
                "position": "left"
            }],
            "mouseWheelZoomEnabled": true,
            "graphs": [{
                "id": "g1",
                "balloonText": this.balloonText,
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "hideBulletsCount": 50,
                "title": "red line",
                "valueField": vertialAxis,
                "decimals": 3,
                "forceDecimals": 1,
                "useLineColorForBulletBorder": true
            }],
            "chartScrollbar": {
                "autoGridCount": true,
                "graph": "g1",
                "scrollbarHeight": 40
            },
            "chartCursor": {

            },
            "categoryField": horizontalAxis,
            "categoryAxis": {
                "parseDates": true,
                "axisColor": "#DADADA",
                "dashLength": 1,
                "minorGridEnabled": true
            },
            "export": {
                "enabled": true
            }
        });

        chart.addListener("rendered", _zoomChart);
        _zoomChart(chartData, chart);
    }

   return LineChart;
});