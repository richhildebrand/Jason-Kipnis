define(['Charts/BarChart'],
function(BarChart) {
    'use strict';

    var _buildBarChartObservable = function() {
      return {
          singleAxisValue: 'Month',
          updateSingleAxis: function(event) {
              var selectedValue = event.sender.value();
              this.barChart.update(selectedValue, this.barChart.multiAxis);
          },

          multiAxisValues: ['RBI', 'H', 'HR'],
          updateMultiAxis: function(event) {
              var selectedValue = event.sender.value();
              this.barChart.update(this.barChart.singleAxis, selectedValue);
          }
      }
    }

    var _initBindings = function(barChart) {
         var view = $("body");
         var viewModel =  kendo.observable({
            barChartObservable: _buildBarChartObservable()
         });

        kendo.bind(view, viewModel);
        viewModel.barChart = barChart;
        return viewModel;
    }

    var initApp = function() {

        var barChart = new BarChart("barChart");
        var viewModel = _initBindings(barChart);

        var playerDataUrl = "http://richhildebrand.github.io/Jason-Kipnis/Data/kipnis2015.json";
        var data = $.getJSON(playerDataUrl, function(playerData) {
            barChart.init(playerData, viewModel.barChartObservable.singleAxisValue, viewModel.barChartObservable.multiAxisValues);
        });

    }();
});