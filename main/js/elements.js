const c = document.querySelector('#lvlmapdis');
const lvlinfo = document.querySelector('.levelinfo');
const lvlnamedis = document.querySelector('#lvlnamedis');
const lvllayer = document.querySelector('#lvllayer');
const hidelvlinf = document.querySelector('#hidelvlinf');
const editscale = document.querySelector('#editscale');
const edittilevalset = document.querySelector('#edittilevalset'); //editqx editqy
const editqx = document.querySelector('#editqx');
const editqy = document.querySelector('#editqy');
const exportlevel = document.querySelector('.exportlevel');
const exportcode = document.querySelector('#exportcode');

lvlnamedis.setName = function (name) {
  this.innerHTML = "Current Level: "+name;
};

lvllayer.on = lvllayer.addEventListener;

lvllayer.on('change',function (e) {
  var layer = e.target.value;
  var sv = COLI;
  if (layer == "coli") {
    sv = COLI;
  } else if (layer == "back") {
    sv = BACK;
  } else if (layer == "fore") {
    sv = FORE;
  }
  CURRENT_LAYER = sv;
});

hidelvlinf.on = hidelvlinf.addEventListener;

hidelvlinf.on('click',function (e) {
  if (lvlinfo.getAttribute('hidden') == 'false') {
    lvlinfo.hide();
    this.innerHTML = '>>>';
  } else {
    lvlinfo.show();
    this.innerHTML = '<<<';
  }
});

lvlinfo.setAttribute('hidden','false');

lvlinfo.hide = function () {
  this.style.display = 'none';
  this.setAttribute('hidden','true');
};

lvlinfo.show = function () {
  this.style.display = 'block';
  this.setAttribute('hidden','false');
};

lvlinfo.show();

editscale.on = editscale.addEventListener;

editscale.on('change',function (e) {
  var scale = e.target.value;
  if (scale > 400) scale = 400;
  if (scale < 20) scale = 20;
  this.value = scale;
  changeScale(e.target.value/100);
});

edittilevalset.on = edittilevalset.addEventListener;
