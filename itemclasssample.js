var Items = function(){
  var items = {};
  items.data = [];
  items.fetch = function(){
    $http.get('URL',function(data){
      items.data = data;
    })
  };
  items.create = function(){
    $http.post('URL',NEWITEM,function(){
      //clear input form
    })
  };
  return items;
};


var Category = function(){
  var category = {};
  category.data = [];
  category.fetch = function(){
    $http.get('URL',function(data){
      category.data = data;
    });
  };
  category.create = function(){
    $http.post('URL',NEWCAT,function(){

    });
  }
  return category;
}

