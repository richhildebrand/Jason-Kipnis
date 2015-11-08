define(['LineChart', 'BarChart', 'Templates', 'DataFormatter'],
function(LineChart,   BarChart,   Templates,   DataFormatter) {
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

    var _buildLineChartObservable = function() {
      return {
          horizontalAxisValue: 'Month',
          updateHorizontalAxis: function(event) {
              var selectedValue = event.sender.value();
              this.lineChart.update(this.lineChart.vertialAxis, selectedValue);
          },

          vertialAxisValue: 'BA',
          updateVertialAxis: function(event) {
              var selectedValue = event.sender.value();
              this.lineChart.update(selectedValue, this.lineChart.horizontalAxis);
          }
      }
    }

    var _initBindings = function(barChart, lineChart) {
         var view = $("body");
         var viewModel =  kendo.observable({
            barChartObservable: _buildBarChartObservable(),
            lineChartObservable: _buildLineChartObservable()
         });

        kendo.bind(view, viewModel);
        viewModel.barChart = barChart;
        viewModel.lineChart = lineChart;
        return viewModel;
    }

    var initApp = function() {

        var templates = new Templates();
        var dataFormatter = new DataFormatter();
        var barChart = new BarChart("barChart");
        var lineChart = new LineChart("allPlayerDataChart", templates.lineChartBalloonText);

        var viewModel = _initBindings(barChart, lineChart);

        var playerDataUrl = "http://richhildebrand.github.io/Jason-Kipnis/Data/kipnis2015.json";
        var data = $.getJSON(playerDataUrl, function(playerData) {
            lineChart.init(playerData, "BA", "Date");

            barChart.init(playerData, viewModel.barChartObservable.singleAxisValue, viewModel.barChartObservable.multiAxisValues);
        });
    }();
});