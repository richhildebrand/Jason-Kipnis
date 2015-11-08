define([],
function() {
    'use strict';

    var _initMultiAxis = function(multiAxis) {
        var itemData = { };
        _(multiAxis).each(function(axis) {
            itemData[axis] = 0;
        });

        return itemData;
    }

    var _addMultiAxis = function(multiAxis, gameData, currentItem) {
        _(multiAxis).each(function(axis) {
            currentItem[axis] = currentItem[axis] + gameData[axis];
        });
    }

    var BarChartFormatter = function(singleAxis, multiAxis) { 
        this.singleAxis = singleAxis;
        this.multiAxis = multiAxis;
    }

    BarChartFormatter.prototype.singleAxis = undefined;
    BarChartFormatter.prototype.multiAxis = undefined;

    BarChartFormatter.prototype._buildBattingOrderSeries = function(me, singleGroup, formattedCollection) {
        var positionData = _initMultiAxis(me.multiAxis);
        var singleAxisValue = singleGroup[0][this.singleAxis];
        positionData[this.singleAxis] = singleAxisValue;

        _(singleGroup).each(function(gameData) {
            me._addBattingOrderItem(me, gameData, positionData);
        });

        formattedCollection.push(positionData);
     }

    BarChartFormatter.prototype._addBattingOrderItem = function(me, gameData, positionData) {
        _addMultiAxis(this.multiAxis, gameData, positionData);
    }

    BarChartFormatter.prototype.formatForBarChart = function(dataToFormat) {
        var formattedCollection = [];
        var groupedData = _(dataToFormat).groupBy(this.singleAxis);
        var me = this;

        _(groupedData).each(function(singleGroup) {
            me._buildBattingOrderSeries(me, singleGroup, formattedCollection)
        });

        return formattedCollection;
    }

    return BarChartFormatter;
});