//import {scaleLinear} from 'd3-scale';
//import crossfilter from 'crossfilter2';
//import dc from 'dc';
import './dc.min.css';
import Data from './data.csv';
var d3 = require("d3");
var crossfilter = require('crossfilter2')
var dc = require('dc')

function component() {
  var element = document.createElement('div');

  //element.innerHTML = 'Chart failed loading...';
  element.id = 'test';

  return element;
}

document.body.appendChild(component());

dc.config.defaultColors(d3.schemeSet1)

var chart = dc.barChart('#test')

//d3.csv("data.csv", function(d) {
//  return {
//    Expt: d.Expt,
//    Run: d.Run,
//    Speed: +d.Speed
//  };
//}).then(function(Data) {
  //console.log(Data);


  var ndx             = crossfilter(Data),
      runDimension    = ndx.dimension(function(d) {return +d.Run;}),
      speedSumGroup   = runDimension.group().reduceSum(function(d) {return d.Speed * d.Run / 1000;});

  chart
    .width(768)
    .height(480)
    .x(d3.scaleLinear().domain([6,20]))
    .brushOn(false)
    .yAxisLabel("This is the Y Axis!")
    .dimension(runDimension)
    .group(speedSumGroup)
    .on('renderlet', function(chart) {
        chart.selectAll('rect').on("click", function(d) {
            console.log("click!", d);
        });
    });

  chart.render();

//});
