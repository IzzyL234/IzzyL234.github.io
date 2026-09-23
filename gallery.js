const photos = [
 {src:'photo-1.png',alt:'Two friends hugging by the water at sunset.'},
 {src:'photo-2.png',alt:'Two friends taking a selfie among green trees on a sunny day.'},
 {src:'photo-3.png',alt:'Two friends on a boat with a bridge behind them.'},
 {src:'photo-4.png',alt:'A black-and-white dog on a walk with an orange leash.'},
 {src:'photo-5.png',alt:'A cat lounging beside a large plush toy.'}
];
const gallery=document.querySelector('#photo-gallery');
let current=0;
const photo=gallery.querySelector('img');
function show(index) {
 current=(index+photos.length)%photos.length;
 photo.src=photos[current].src; photo.alt=photos[current].alt;
 gallery.querySelector('output').textContent=(current+1)+' / '+photos.length;
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches) {
 photo.getAnimations().forEach(a=>a.cancel());
 photo.animate([{opacity:0.3},{opacity:1}],{duration:250});
 }
}
gallery.querySelector('[data-prev]').onclick=()=>show(current-1);
gallery.querySelector('[data-next]').onclick=()=>show(current+1);
gallery.addEventListener('keydown',event=>{
 if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}
 if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}
});
let startX=null;
photo.addEventListener('pointerdown',e=>{startX=e.clientX;});
photo.addEventListener('pointerup',e=>{if(startX!==null && Math.abs(e.clientX-startX)>40)show(current+(e.clientX<startX?1:-1));startX=null;});
photo.addEventListener('pointercancel',()=>{startX=null;});
photo.draggable=false;
