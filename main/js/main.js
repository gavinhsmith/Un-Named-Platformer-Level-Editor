const ctx = c.getContext('2d');
const mouse = new Mouse(c);

ctx.clearAll = function () {
  this.clearRect(0,0,c.width,c.height);
};

ctx.fillAll = function (color) {
  this.save();
  this.fillColor = color;
  this.fillRect(0,0,c.width,c.height);
  this.restore();
};

rsjs(c,"full",{margin_width:10,margin_height:10},SCALE);

function loadMap(map) {
  ctx.clearAll();
  CURRENT_MAP = map;
  lvlnamedis.setName(map.name);
  c.width = map.width*GRID_SIZE;
  c.height = map.height*GRID_SIZE;
  rsjs(c,"full",{margin_width:10,margin_height:10},SCALE);
  CANX = c.getBoundingClientRect().x;
  CANY = c.getBoundingClientRect().y;
};

function getMouseTile() {
  var x = mouse.x - CANX;
  var y = mouse.y - CANY;
  x = Math.floor(x/(c.getBoundingClientRect().width/CURRENT_MAP.width));
  y = Math.floor(y/(c.getBoundingClientRect().height/CURRENT_MAP.height));
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x >= CURRENT_MAP.width) x = CURRENT_MAP.width-1;
  if (y >= CURRENT_MAP.height) y = CURRENT_MAP.height-1;
  return {x:x,y:y};
};

function changeScale(scale) {
  SCALE = scale;
  rsjs(c,"full",{margin_width:10,margin_height:10},SCALE);
  CANX = c.getBoundingClientRect().x;
  CANY = c.getBoundingClientRect().y;
};

CANX = c.getBoundingClientRect().x;
CANY = c.getBoundingClientRect().y;

function tileRect(x,y) {
  return {
    x: x*GRID_SIZE,
    y: y*GRID_SIZE,
    width: GRID_SIZE,
    height: GRID_SIZE
  };
};

function drawMap(map) {
  if (map == null) return;
  for (var i = 0; i < map.height; i++) {
    for (var k = 0; k < map.width; k++) {
      ctx.save();
      var rect = tileRect(k,i);
      //ASSETS.SPRITES.EMPTY.draw(ctx,rect.x,rect.y,rect.width,rect.height,{opacity:0.25});
      switch (CURRENT_LAYER) {
        case COLI:
          ASSETS.SPRITES.LEVEL.THEME.GROUND[38].update(ctx,rect.x,rect.y,rect.width,rect.height,undefined);
          if (map.sback[i][k] != 0 && map.sback[i][k] != 8) {
            ASSETS.SPRITES.LEVEL.THEME.GROUND[map.sback[i][k]].update(ctx,rect.x,rect.y,rect.width,rect.height,{opacity:0.5});
          };
          if (map.sfore[i][k] != 0 && map.sfore[i][k] != 8) {
            ASSETS.SPRITES.LEVEL.THEME.GROUND[map.sfore[i][k]].update(ctx,rect.x,rect.y,rect.width,rect.height,{opacity:0.5});
          };
          if (map.coli[i][k] == 1) {
            ASSETS.SPRITES.EMPTY.update(ctx,rect.x,rect.y,rect.width,rect.height,undefined);
          };
          if (map.coli[i][k] == 2) {
            var trect = tileRect(k,i-1)
            ASSETS.SPRITES.PLAYER.COVER.update(ctx,trect.x,trect.y,trect.width,trect.height*2);
          };
          break;
        case BACK:
          ASSETS.SPRITES.LEVEL.THEME.GROUND[0].update(ctx,rect.x,rect.y,rect.width,rect.height,undefined);
          if (map.coli[i][k] == 1) {
            ASSETS.SPRITES.EMPTY.update(ctx,rect.x,rect.y,rect.width,rect.height,{opacity:0.49});
          };
          if (map.coli[i][k] == 2) {
            var trect = tileRect(k,i-1)
            ASSETS.SPRITES.PLAYER.COVER.update(ctx,trect.x,trect.y,trect.width,trect.height*2);
          };
          if (map.sback[i][k] != 0 && map.sback[i][k] != 8) {
            ASSETS.SPRITES.LEVEL.THEME.GROUND[map.sback[i][k]].update(ctx,rect.x,rect.y,rect.width,rect.height,undefined);
          };
          break;
        case FORE:
          ASSETS.SPRITES.LEVEL.THEME.GROUND[0].update(ctx,rect.x,rect.y,rect.width,rect.height,undefined);
          if (map.coli[i][k] == 1) {
            ASSETS.SPRITES.EMPTY.update(ctx,rect.x,rect.y,rect.width,rect.height,{opacity:0.49});
          };
          if (map.sback[i][k] != 0 && map.sback[i][k] != 8) {
            ASSETS.SPRITES.LEVEL.THEME.GROUND[map.sback[i][k]].update(ctx,rect.x,rect.y,rect.width,rect.height,undefined);
          };
          if (map.coli[i][k] == 2) {
            var trect = tileRect(k,i-1)
            ASSETS.SPRITES.PLAYER.COVER.update(ctx,trect.x,trect.y,trect.width,trect.height*2);
          };
          if (map.sfore[i][k] != 0 && map.sfore[i][k] != 8) {
            ASSETS.SPRITES.LEVEL.THEME.GROUND[map.sfore[i][k]].update(ctx,rect.x,rect.y,rect.width,rect.height,undefined);
          };
          break;
        default:
          break;
      };

      ctx.beginPath();
      ctx.strokeStyle = '#44f';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.1;
      ctx.rect(rect.x,rect.y,rect.width,rect.height);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };
  };
  ctx.save();
  var selx = getMouseTile().x;
  var sely = getMouseTile().y;

  var selrect = tileRect(selx,sely);

  ctx.fillStyle = "#f44";
  ctx.globalAlpha = 0.3;
  ctx.fillRect(selrect.x,selrect.y,selrect.width,selrect.height);

  ctx.restore();
};

function createLevel() {
  var cont = document.createElement('div');
  cont.classList.add('newlvlcont');
  cont.classList.add('center');

  cont.innerHTML = '<h2>Create New Level</h2><br>Name: <input type="text" placeholder="Deep Dark Caves" id="newlvlname"></input><br>Width: <input id="newlvlwidth" type="number" min="20" max="200" value="20"><br>Height: <input id="newlvlheight" type="number" min="10" max="100" value="10"><br><br><button onclick="createLevelFin();">Create</button><button type="button" onclick="document.querySelector(\'.newlvlcont\').parentElement.removeChild(document.querySelector(\'.newlvlcont\'));" id="newlvlbtn">Cancel</button>';

  document.body.appendChild(cont);
};

function createLevelFin() {
  var lvl = {
    name: document.querySelector('#newlvlname').value,
    width: document.querySelector('#newlvlwidth').value,
    height: document.querySelector('#newlvlheight').value,
  };
  lvl.lvl = new Map(lvl.name,lvl.width,lvl.height);
  loadMap(lvl.lvl);
  document.querySelector('.newlvlcont').parentElement.removeChild(document.querySelector('.newlvlcont'));
};

function update() {
  ctx.clearAll();
  if (CURRENT_MAP != null) {
    document.querySelector('#editqx').max = CURRENT_MAP.width-1;
    document.querySelector('#editqy').max = CURRENT_MAP.height-1;
    var selx = Number(document.querySelector('#editqx').value);
    var sely = Number(document.querySelector('#editqy').value);
    if (String(selx) == 'NaN') selx = 0;
    if (String(sely) == 'NaN') sely = 0;
    if (selx < 0) selx = 0;
    if (sely < 0) sely = 0;
    if (selx >= CURRENT_MAP.width) selx = CURRENT_MAP.width-1;
    if (sely >= CURRENT_MAP.height) sely = CURRENT_MAP.height-1;
    MOUSE_TILE = getMouseTile();
    selx = MOUSE_TILE.x;
    sely = MOUSE_TILE.y;
    switch (CURRENT_LAYER) {
      case COLI:
        document.querySelector('#edittileval').innerHTML = `Value of Tile: ${CURRENT_MAP.coli[sely][selx]}`;
        break;
      case BACK:
        document.querySelector('#edittileval').innerHTML = `Value of Tile: ${CURRENT_MAP.sback[sely][selx]}`;
        break;
      case FORE:
        document.querySelector('#edittileval').innerHTML = `Value of Tile: ${CURRENT_MAP.sfore[sely][selx]}`;
        break;
      default:
        document.querySelector('#edittileval').innerHTML = `Value of Tile: Unknown`;
    };
  };
  drawMap(CURRENT_MAP);
  if (mouse.active) {
    var value = edittilevalset.value;
    if (value != NaN && CURRENT_MAP != null) {
      switch (CURRENT_LAYER) {
        case COLI:
          CURRENT_MAP.coli[MOUSE_TILE.y][MOUSE_TILE.x] = value;
          break;
        case BACK:
          CURRENT_MAP.sback[MOUSE_TILE.y][MOUSE_TILE.x] = value;
          break;
        case FORE:
          CURRENT_MAP.sfore[MOUSE_TILE.y][MOUSE_TILE.x] = value;
          break;
        default:
          break;
      }
    };
  };
};

/*
LEVELS[0] = new Level( // LVL1 (20x10)
  'Basic Level Test',
  'ground',
  LEVELMAPS[0],
  FORESPRITEMAPS[0],
  BACKSPRITEMAPS[0],
  GRIDSIZE
);
*/

function exportLevelDisplay() {
  if (CURRENT_MAP != null) {
    exportcode.innerHTML = '';
    var lines = [];
    lines[0]   = `LEVELMAPS[ID] = JSON.parse("${JSON.stringify(CURRENT_MAP.coli)}");`;
    lines[1]   = `BACKSPRITEMAPS[ID] = JSON.parse("${JSON.stringify(CURRENT_MAP.sback)}");`;
    lines[2]   = `FORESPRITEMAPS[ID] = JSON.parse("${JSON.stringify(CURRENT_MAP.sfore)}");`;
    lines[3]   = '';
    lines[4]   = `LEVELS[ID] = new Level(`;
    lines[5]   = `  '${CURRENT_MAP.name}',`;
    lines[6]   = `  'ground',`;
    lines[7]   = `  LEVELMAPS[ID],`;
    lines[8]   = `  FORESPRITEMAPS[ID],`;
    lines[9]   = `  BACKSPRITEMAPS[ID],`;
    lines[10]  = `  GRIDSIZE,`;
    lines[11]  = `);`;
    //
    for (var i in lines) {
      if (i == 0) {
        exportcode.innerHTML += lines[i];
      } else {
        exportcode.innerHTML += '<br>'+lines[i];
      };
    };
    //
    exportlevel.classList.remove('hidden');
  };
};

setInterval(update,1000/30);
