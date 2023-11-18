
console.log(123)
var imgload = function (img) {
  var ref = $.Deferred();
  if (img.complete) {
    ref.resolve();
  } else {
    img.onload = function (event) {
      ref.resolve(event)
    }

    img.onerror = function (err) {
      ref.reject(err)
    }
  }
  return ref;
}

// mode选项一般选为wspectFill
var imageCenter = function (domList, mode) {
  
  $(domList).each(function (index,item) {
    var img = item.children[0];
    var itemW = item.offsetWidth;
    var itemH = item.offsetHeight;
    var itemR = itemW / itemH;
    imgload(img).then(function () {
      var imgW = img.naturalWidth;
      var imgH = img.naturalHeight;
      var imgR = imgW / imgH;
      var resultMode = null;
      switch (mode) {
        case 'aspectFill':
          resultMode = imgR > 1 ? 'aspectFill-x' : 'aspectFill-y';
          break;
        case 'wspectFill':
          resultMode = itemR > imgR ? 'aspectFill-x' : 'aspectFill-y'
          break;
        default:
      }
      $(img).addClass(resultMode);
    })
  })
}

