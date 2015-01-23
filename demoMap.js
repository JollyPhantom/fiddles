$(document).ready(function(){

  // in feet;
  var roomWidth = 20;
  var roomHeight = 36;

  var width = $(document).width();
  var height = $(document).height();
  var scale = roomWidth;
  var feetToPixel = function(ft){
    var foot = width/scale;
    return ft*foot;
  }

  var coorsToString = function(coors, convertToPixel){
    var result = '';

    for(var i = 0; i < coors.length; i++){
      var x = coors[i][0];
      var y = coors[i][1];
      if(convertToPixel){
        x = feetToPixel(x);
        y = feetToPixel(y);
      }

      result = result+x+','+y+' ';
    }

    return result;
  }

  var createShelves = function(x,y,w,h){
    return {
      x:feetToPixel(x),
      y:feetToPixel(y),
      width:feetToPixel(w),
      height:feetToPixel(h)
    }
  }


  var svg = d3.select('#map').append('svg')
              .attr('width',width)
              .attr('height',height);


  var floorplan = svg.append('polygon')
                    .attr('points',coorsToString([
                      [0,0],
                      [10,0],
                      [10,5],
                      [15,5],
                      [15,10],
                      [10,10],
                      [0,10]
                      ],true))
                    .attr('fill','white')
                    .attr('stroke','blue');

  var shelf1  = createShelves(1,1,1,8);
  var shelf2  = createShelves(8,1,1,4);
  var shelves = [shelf1,shelf2];

  svg.selectAll('rect').data(shelves)
    .enter().append('rect')
    .attr('x',function(d){return d.x})
    .attr('y',function(d){return d.y})
    .attr('width',function(d){return d.width})
    .attr('height',function(d){return d.height})
    .attr('stroke','red')
    .attr('fill','red')
});