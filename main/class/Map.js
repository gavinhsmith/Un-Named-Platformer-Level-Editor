const Map = class {
  constructor(name,width,height) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.theme = 'ground';
    if (this.width < 20) this.width = 20;
    if (this.height < 10) this.height = 10;
    this.coli = new DArray(width,height,0,[{type:"fill",startX:0,startY:height-1,endX:width-1,endY:9,val:1},{type:"single",x:2,y:8,val:2}]);
    this.sback = new DArray(width,height,0);
    this.sfore = new DArray(width,height,0);
  }
  sprites() {
    if (this.theme == 'ground') {
      return ASSETS.SPRITES.LEVEL.THEME.GROUND;
    } else if (this.theme == 'cave') {
      return ASSETS.SPRITES.LEVEL.THEME.CAVE;
    };
  }
};
