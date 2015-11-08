define(['DataFormatters/BarChartFormatter'],
function(BarChartFormatter) {
    'use strict';

    var DataFormatter = function() { }

    DataFormatter.prototype.formatForBarChart = function(dataToFormat, singleAxis, multiAxis) {
        var barChartFormatter = new BarChartFormatter(singleAxis, multiAxis);
        return barChartFormatter.formatForBarChart(dataToFormat);
    }

    return DataFormatter;
});