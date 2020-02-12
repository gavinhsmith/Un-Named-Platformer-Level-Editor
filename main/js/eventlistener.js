window.on = window.addEventListener;
document.on = document.addEventListener;

window.on('resize',function (e) {
  rsjs(c,"full",{margin_width:10,margin_height:10},SCALE);
});
