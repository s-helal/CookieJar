async function test() {
  // JavaScript
  const model = await tf.loadLayersModel('/model.json');
  
  var img = new Image();
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = "https://cdn.glitch.com/b2e8793d-4a3b-4bd4-9f1a-1cf126eeac9a%2Fsample.png?1610926580142";
  ctx.drawImage(img, 0, 0);
  var w = img.width, h=img.height;
  var imgdata = ctx.getImageData(0,0,w,h);
  var rgba = imgdata.data;
  const example = tf.browser.fromPixels(img);  // for example
  const prediction = model.predict(example);
  
  console.log(prediction)
}

test()