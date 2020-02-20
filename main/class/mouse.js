const Mouse = class {
  constructor(elmbind,editor) {
    this.x = 0;
    this.y = 0;
    this.active = false;

    if (elmbind == null) elmbind = window;

    if (typeof editor != "function") editor = (x,y) => {return {x:x,y:y}};

    elmbind.addEventListener('mousemove', e => {
      var fin = editor(e.clientX,e.clientY);
      this.x = fin.x;
      this.y = fin.y;
    });

    elmbind.addEventListener('mousedown', e => {
      this.active = true;
    });

    elmbind.addEventListener('mouseup', e => {
      this.active = false;
    });
  }
};
