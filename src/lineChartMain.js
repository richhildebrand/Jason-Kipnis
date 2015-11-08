define(['Charts/LineChart', 'Templates/Templates'],
function(LineChart, Templates) {
    'use strict';

    var _buildLineChartObservable = function() {
      return {
          vertialAxisValue: 'BA',
          updateVertialAxis: function(event) {
              var selectedValue = event.sender.value();
              this.lineChart.update(selectedValue, this.lineChart.horizontalAxis);
          }
      }
    }

    var _initBindings = function(lineChart) {
         var view = $("body");
         var viewModel =  kendo.observable({
            lineChartObservable: _buildLineChartObservable()
         });

        kendo.bind(view, viewModel);
        viewModel.lineChart = lineChart;
        return viewModel;
    }

    var initApp = function() {

        var templates = new Templates();
        var lineChart = new LineChart("allPlayerDataChart", templates.lineChartBalloonText);
        var viewModel = _initBindings(lineChart);

        var playerDataUrl = "http://richhildebrand.github.io/Jason-Kipnis/Data/kipnis2015.json";
        var data = $.getJSON(playerDataUrl, function(playerData) {
            lineChart.init(playerData, "BA", "Date");
        });
    }();
});