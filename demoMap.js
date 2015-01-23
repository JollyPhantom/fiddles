$(document).ready(function(){

  // these are the shelves used in the demoMap, however, while this is hardcoded now
  // we will need to actuall retrieve these on the fly from the DB
  // every vendor will have a unique ID that specifies their map, shelves, items, etc.
  var shelvesFt = [];
  shelvesFt[0] = [5,0,10,1];
  shelvesFt[1] = [0,9,1,18];
  shelvesFt[2] = [19,0,1,36];
  shelvesFt[3] = [5,17,10,1];
  shelvesFt[4] = [5,19,10,1];
  shelvesFt[5] = [5,35,10,1];

  // this will contain the shelves in SVG/Pixel format
  var shelves = [];
 
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

  // coors is in array
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
  var cartesianToSVGCoords = function(coords) {
    // coords is an array in the format of [x,y,w,h];
    // this function utilizes the variables roomHeight and roomWidth in order figure out the SVG coordinates
    // y = roomHeight - h;
    var _coords = coords.slice();
    _coords[1] = roomHeight - coords[3];
    // what is returned is not actual in the pixel coordiantes, but the x,y where the origin is the top left corner of the room
    return _coords;
  };

  // creates an shelf object with x,y coords and width and height in pixels
  var createShelves = function(x,y,w,h){
    if ( typeof arguments[0] === 'number' ) {
      return {
        x:feetToPixel(x),
        y:feetToPixel(y),
        width:feetToPixel(w),
        height:feetToPixel(h)
      };
    } else if ( Array.isArray(arguments[0]) ) {
      return {
        x: feetToPixel(arguments[0][0]),
        y: feetToPixel(arguments[0][1]),
        width: feetToPixel(arguments[0][2]),
        height: feetToPixel(arguments[0][3])
      };
    }
  }


  var svg = d3.select('#map').append('svg')
              .attr('width',width)
              .attr('height',height);


  var floorplan = svg.append('polygon')
                    .attr('points',coorsToString([
                      [0,0],
                      [0,36],
                      [20,36],
                      [36,0]
                      ],true))
                    .attr('fill','white');
                    // .attr('stroke','blue');


  // creates an array of 'shelves' that have the coords in pixels/svg format
  shelvesFt.forEach(function(shelf, index){
    console.log(shelf);
    shelves.push(createShelves(shelf));
  });

  console.log(shelves);
  // var shelf1  = createShelves(1,1,1,8);
  // var shelf2  = createShelves(8,1,1,4);
  // var shelves = [shelf1,shelf2];

  svg.selectAll('rect').data(shelves)
    .enter().append('rect')
    .attr('x',function(d){return d.x})
    .attr('y',function(d){return d.y})
    .attr('width',function(d){return d.width})
    .attr('height',function(d){return d.height})
    .attr('stroke','red')
    .attr('fill','red')
});