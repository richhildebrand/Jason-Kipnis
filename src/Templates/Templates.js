define(['text!Templates/LineChartBalloonText.html'],
function (lineChartBalloonText) {
   'use strict';

    var _trimLineEndings = function(str) {
        return str.replace(/\r?\n|\r/g, '');
    }

    var Templates = function() { }

    Templates.prototype.lineChartBalloonText = _trimLineEndings(lineChartBalloonText);

    return Templates;
});