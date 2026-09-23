const canvas = document.querySelector('#ant');
const ctx = canvas.getContext('2d');
const size = 100, cell = 6;
let grid, x, y, direction, steps, running = false, last = 0;
const toggle = document.querySelector('#ant-toggle');
const count = document.querySelector('#ant-count');
function draw() {
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = '#000';
  grid.forEach((value, i) => { if(value) ctx.fillRect((i % size)*cell, Math.floor(i/size)*cell, cell, cell); });
  ctx.fillStyle = grid[y*size+x] ? '#fff' : '#000';
  ctx.beginPath(); ctx.arc(x*cell+3,y*cell+3,2,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#000'; ctx.strokeRect(x*cell-1,y*cell-1,8,8);
  count.textContent = steps.toLocaleString() + (steps === 1 ? ' step' : ' steps');
}
function step() {
  const i = y*size+x;
  direction = (direction + (grid[i] ? 3 : 1)) % 4;
  grid[i] ^= 1;
  x = (x + [0,1,0,-1][direction] + size) % size;
  y = (y + [-1,0,1,0][direction] + size) % size;
  steps++;
}
function setRunning(value) { running=value; toggle.textContent=value?'Pause':'Play'; }
function reset() { grid=new Uint8Array(size*size); x=y=50; direction=steps=0; draw(); }
toggle.addEventListener('click',()=>setRunning(!running));
document.querySelector('#ant-step').addEventListener('click',()=>{setRunning(false);step();draw();});
document.querySelector('#ant-reset').addEventListener('click',()=>{setRunning(false);reset();});
document.querySelector('#ant-highway').addEventListener('click',()=>{setRunning(false);reset();for(let i=0;i<11000;i++)step();draw();});
function frame(time) {
  if(running && !document.hidden && time-last>=40) { for(let i=0;i<Number(document.querySelector('#ant-speed').value);i++)step();draw();last=time; }
  requestAnimationFrame(frame);
}
reset();
setRunning(!matchMedia('(prefers-reduced-motion: reduce)').matches);
requestAnimationFrame(frame);
