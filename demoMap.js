$(document).ready(function(){

  // in feet;
  var roomWidth = 20;
  var roomHeight = 36;

  var width = $(document).width();
  var height = $(document).height();

//MVP: Don't make roomWidth larger than roomHeight.
  var scale = roomHeight;
  if (roomWidth > roomHeight){
    scale = roomWidth;
  }
  var feetToPixel = function(ft){
    var foot = width/scale;
    return ft*foot;
  };

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

  // converts the cartesian coordinates (origin at bottom left) to coordinates for svg (origin at top left)

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
  console.log('svg created');


  var floorplan = svg.append('polygon')
                    .attr('points',coorsToString([
                      [0,0],
                      [0,36],
                      [20,36],
                      [20,0]
                      ],true))
                    .attr('fill','white')
                    .attr('class', 'viewPort');

                    // .attr('stroke','blue');

  var topShelf = createShelves(0,0,20,2);
  var shelf1  = createShelves(0,4,2,24);
  var shelf2  = createShelves(8,4,2,24);
  var shelf3  = createShelves(10,4,2,24);
  var shelf4  = createShelves(18,4,2,24);
  var cashier = createShelves(2,32,16,4);

  var shelves = [shelf1, shelf2, shelf3, shelf4, topShelf, cashier];

  svg.selectAll('rect').data(shelves)
    .enter().append('rect')
    .attr('x',function(d){return d.x})
    .attr('y',function(d){return d.y})
    .attr('width',function(d){return d.width})
    .attr('height',function(d){return d.height})
    .attr('stroke','red')
    .attr('fill','red');

//Dan's code
//

    var drag = d3.behavior.drag()
        .on("drag", function(d,i) {
            console.log('bitch be draggin\'');
            var point = d3.mouse(this);
            var p = {x: point[0], y: point[1] };
            $(this).attr('cx',p.x);
            $(this).attr('cy',p.y);

        });

  var drawCircle = function(x, y, size){
    console.log('Drawing circle at', x, y, size);
    svg.append('circle')
        // .attr('class', 'click-circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', size)
        .call(drag);
  };

  svg.on('dblclick', function(){
    //keydown for demo, drag for singe click
    var point = d3.mouse(this);
    var p = {x: point[0], y: point[1] };
    console.log(p);
    console.log(this);
    drawCircle(p.x, p.y, '15px');
    // this.append('circle')
    //   .attr('cx', p.x)
    //   .attr('cy', p.y);
  });


});

