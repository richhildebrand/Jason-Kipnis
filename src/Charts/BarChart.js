define(['DataFormatters/DataFormatter'],
function (DataFormatter) {
    'use strict';

    var _getGraphId = function(multiAxis, axis) {
        var idNumber = multiAxis.indexOf(axis) + 1;
        return "AmGraph-" + idNumber;
    }

    var _buildMultiAxisGraphs = function(multiAxis) {
        var graphs = [];
        _(multiAxis).each(function(axis) {
            var graphId = _getGraphId(multiAxis, axis);
            var graph = {
                "balloonText": axis + ": [[value]]",
                "fillAlphas": 0.8,
                "id": graphId,
                "lineAlpha": 0.2,
                "title": axis,
                "type": "column",
                "valueField": axis
            };

            graphs.push(graph);
        });

        return graphs;
    }

    var BarChart = function(chartId) { 
        this.chartId = chartId;
        this.dataFormatter = new DataFormatter();
    }

    BarChart.prototype.chartId = undefined;
    BarChart.prototype.dataFormatter = undefined;
    BarChart.prototype.chartData = undefined;
    BarChart.prototype.singleAxis = undefined;
    BarChart.prototype.multiAxis = undefined;

    BarChart.prototype.update = function(singleAxis, multiAxis) {
        this.init(this.chartData, singleAxis, multiAxis);
    }

    BarChart.prototype.init = function(chartData, singleAxis, multiAxis) {
        this.singleAxis = singleAxis;
        this.multiAxis = multiAxis;
        this.chartData = chartData;

        var formattedData = this.dataFormatter.formatForBarChart(chartData, singleAxis, multiAxis);
        var graphs = _buildMultiAxisGraphs(multiAxis);
        var chart = AmCharts.makeChart(this.chartId, {
            "type": "serial",
             "theme": "light",
            "categoryField": singleAxis,
            "rotate": true,
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start",
                "position": "left"
            },
            "trendLines": [],
            "graphs": graphs,
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "position": "top",
                    "axisAlpha": 0
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "dataProvider": formattedData,
            "export": {
                "enabled": true
             }
        });
    }

   return BarChart;
});