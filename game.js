const c=document.getElementById('game');const ctx=c.getContext('2d');const scoreEl=document.getElementById('score');const startBtn=document.getElementById('start');
let w,h,x,y,angle=0,speed=0,score=0,running=false,last=0;
let coins=0,dailyBonusClaimed=false,lastLogin=null,highScore=0;
const SAVE_KEY='slipstream_save';
function loadSave(){try{const s=localStorage.getItem(SAVE_KEY);if(s){const d=JSON.parse(s);coins=d.coins||0;dailyBonusClaimed=d.dailyBonusClaimed||false;lastLogin=d.lastLogin||null;highScore=d.highScore||0;}}catch(e){}}
function saveGame(){try{localStorage.setItem(SAVE_KEY,JSON.stringify({coins,dailyBonusClaimed,lastLogin,highScore}));}catch(e){}}
function checkDaily(){const today=new Date().toDateString();if(lastLogin!==today){dailyBonusClaimed=false;}if(!dailyBonusClaimed){coins+=50;dailyBonusClaimed=true;lastLogin=today;saveGame();alert('Daily Bonus: +50 coins!');}}
function onGameOver(){running=false;startBtn.style.display='inline-block';if(score>highScore){highScore=score;}coins+=Math.floor(score/10);saveGame();setTimeout(()=>{console.log('Interstitial ad');},500);}
function resize(){w=c.width=innerWidth;h=c.height=innerHeight;x=w/2;y=h/2;}addEventListener('resize',resize);resize();
function update(dt){speed+=0.4;const turn=Math.sin(Date.now()/500)*0.03;angle+=turn;x+=Math.cos(angle)*speed*dt*60;y+=Math.sin(angle)*speed*dt*60;if(x<0||x>w||y<0||y>h){onGameOver();}score+=dt*10;}
function draw(){ctx.clearRect(0,0,w,h);ctx.fillStyle='#1e2636';ctx.fillRect(0,0,w,h);ctx.fillStyle='#4ef0ff';ctx.beginPath();ctx.arc(x,y,12,0,Math.PI*2);ctx.fill();}
function loop(ts){if(!running)return;const dt=(ts-last)/1000;last=ts;update(dt);draw();scoreEl.textContent=Math.floor(score);requestAnimationFrame(loop);}
function accel(){speed+=0.8;}
startBtn.onclick=()=>{running=true;score=0;speed=1;angle=0;x=w/2;y=h/2;last=performance.now();loadSave();checkDaily();startBtn.style.display='none';requestAnimationFrame(loop);}
addEventListener('touchstart',(e)=>{e.preventDefault();accel();},{passive:false});addEventListener('mousedown',accel);
