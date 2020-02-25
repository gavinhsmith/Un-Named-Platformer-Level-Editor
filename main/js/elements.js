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
const lvltype = document.querySelector('#lvltype');
const lvlid = document.querySelector('#lvlid');
const lvltileselbtn = document.querySelector('#lvltileselbtn');

CURRENT_LEVEL_ID = lvlid.value;

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
  this.value = scale;
  changeScale(e.target.value/100);
});

edittilevalset.on = edittilevalset.addEventListener;

edittilevalset.on('click',function (e) {
  this.value = '';
});

lvltype.on = lvltype.addEventListener;

lvltype.on('change',function (e) {
  CURRENT_LEVEL_TYPE = e.target.value;
  if (CURRENT_MAP != null) {
    CURRENT_MAP.theme = CURRENT_LEVEL_TYPE;
  };
});

lvlid.on = lvlid.addEventListener;

lvlid.on('change',function (e) {
  var val = Number(this.value);
  if (val == NaN) val = 0;
  CURRENT_LEVEL_ID = val;
});

lvltileselbtn.on = lvltileselbtn.addEventListener;

lvltileselbtn.addEventListener('click',function (e) {
  selectTile();
});
