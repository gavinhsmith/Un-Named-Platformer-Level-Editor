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
        this.setItem(preset[i].x,preset[i].y,preset[i].val);
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
