const DArray = class extends Array {
  constructor(width,height,def,preset) {
    super();
    for (var i = 0; i < height; i++) {
      this[i] = [];
      for (var k = 0; k < width; k++) {
        this[i][k] = def;
      };
    };
    if (preset != undefined) {
      for (var i in preset) {
        if (preset[i].type == 'single') {
          this.setItem(preset[i].x,preset[i].y,preset[i].val);
        } else if (preset[i].type == 'fill') {
          var width = (preset[i].endX+1) - preset[i].startX;
          var height = (preset[i].endY+1) - preset[i].startY;
          for (var b = 0; b < height; b++) {
            for (var k = 0; k < width; k++) {
              this.setItem(preset[i].startX+k,preset[i].startY+b,preset[i].val);
            };
          };
        };
      };
    };
  }
  getItem(x,y) {
    return this[y][x];
  }
  setItem(x,y,val) {
    this[y][x] = val;
    return this.getItem(x,y);
  };
}
