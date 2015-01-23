function click(){
  // Ignore the click event if it was suppressed
  if (d3.event.defaultPrevented) return;

  // Extract the click location\
  var point = d3.mouse(this);
  var p = {x: point[0], y: point[1] };

  // Append a new point
  svg.append("circle")
      .attr("transform", "translate(" + p.x + "," + p.y + ")")
      .attr("class", "startLoc")
      .call(drag);
}
//select all viewports, on.click, add user circle, and drag


d3.select('.viewPort').on('click', function(e){
    var point = d3.mouse(e);
    var p = {x: point[0], y: point[1] };
    console.log('svg took a click');
});
$('.viewPort')
  .on('click', function(e){
    var point = d3.mouse(e);
    var p = {x: point[0], y: point[1] };

});

