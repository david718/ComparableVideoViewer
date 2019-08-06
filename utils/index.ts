export const draggableBar = (
  canvas: any,
  ctx: any,
  startX: number,
  startY: number,
  boundaryWidth: number,
  boundaryHeight: number,
  setBarStart: any
) => {
  var x = startX;
  var y = startY;
  var dragok = false;

  function rect(x: number, y: number, w: number, h: number) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
  }

  function init() {
    ctx = canvas.getContext('2d');
    return setInterval(draw, 10);
  }

  function draw() {
    ctx.clearRect(0, 0, boundaryWidth, boundaryHeight);
    ctx.fillStyle = '#00ff0000';
    rect(0, 0, boundaryWidth, boundaryHeight);
    ctx.fillStyle = '#444444';
    rect(x - 15, y - 15, 40, 80);
  }

  function myMove(e: any) {
    if (dragok) {
      x = e.pageX - canvas.offsetLeft;
      y = e.pageY - canvas.offsetTop;
    }
  }

  function myDown(e: any) {
    if (
      e.pageX < x + 15 + canvas.offsetLeft &&
      e.pageX > x - 15 + canvas.offsetLeft &&
      e.pageY < y + 15 + canvas.offsetTop &&
      e.pageY > y - 15 + canvas.offsetTop
    ) {
      x = e.pageX - canvas.offsetLeft;
      y = e.pageY - canvas.offsetTop;
      dragok = true;
      canvas.onmousemove = myMove;
    }
  }

  function myUp() {
    dragok = false;
    canvas.onmousemove = null;
  }

  init();
  canvas.onmousedown = myDown;
  canvas.onmouseup = myUp;
};
