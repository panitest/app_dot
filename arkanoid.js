function seg2hora(seg){
	var hs=Math.floor(seg/3600);
	var s=seg-(hs*3600);
	var mins=Math.floor(s/60);
	var secs=s-(mins*60);
	if(hs<10)hs='0'+hs;
	if(mins<10)mins='0'+mins;
	if(secs<10)secs='0'+secs;
	return [hs,mins,secs];
}
ns.duration=60;
ns.contando=0;
function contar(){
	ns.contando=1;
	ns.ahora=(+new Date);
	ns.segundos=Math.floor((ns.ahora-ns.inicio)/1000);
	var lim=ns.duration;
	var t=lim-ns.segundos;
	if(!t){
		ventana(100,100);
		$('qq').innerHTML='';
		$('cronometro').innerHTML='00:00';
		cerrar();
		//$('fail').play();
		
		openPerdiste();
		
		return;
	}
	var tt=seg2hora(t);
	
	$('cronometro').innerHTML=tt[1]+':'+tt[2];
	ns.contador=setTimeout(contar,1000);
}
ns.particles=[];var gravity = 1;
function Particle(actualX,actualY) {
		this.radius = parseInt(Math.random() * 16);
		this.x = actualX;
		this.y = actualY;
		this.vx = Math.random() * 4 - 2;
		this.vy = Math.random() * -14 - 1;
		var _this=this;
		this.draw = function() {
			ctx.save();
			ctx.translate(this.x,this.y);
			ctx.drawImage($('moneda'), 0, 0,50,50,0,0,_this.radius,_this.radius);
			ctx.restore();
		};
}
	
function explosion(x,y){
	
	var particle_count = parseInt(Math.random() * 30);
	ns.particles = [];
	for (var i = 0; i < particle_count; i++) {
		var particle = new Particle(x,y);
		ns.particles.push(particle);
	}
	
}

var x = 252;
var y = 478;
var dx = 4;//4
var dy = -6;//-6
var ctx;
var WIDTH=534;
var HEIGHT=540;
var padHeight=31;
var padWidth=106;
var cofre;
var pelota;
var pad;
var points=[];
var ladrillos;
var padx=214;
var pady=509;
var canvasMinX = 0;
var canvasMaxX = 0;
function inicio(){
	if(ns.finarkanoid)return;
	var canvas=$('canvas');
	(function(){canvas.onclick=function(){initSounds();ns.start=1;};})();
	(function(){$('startmge').onclick=function(){initSounds();ns.start=1;};})();
	var pos=getElementPosition.call(canvas);
	canvasMinX = pos.left;
	canvasMaxX = canvasMinX + WIDTH;
	var pto;
	ctx=canvas.getContext('2d');
	cofre=new Image();
	cofre.onload=function(){
		ctx.save();
		ctx.translate(126,50);
		var x1=120,y1=50,i=0,j=0,k=0,xx1=0,yy1=0;
			ladrillos=new Array(5);
			for(j=0;j<6;j++){
				ladrillos[j]=new Array(5);
				for(k=0;k<5;k++){
					 points.push({'x1':xx1+(k*56.4),'y1':yy1+(j*47.66),'x2':xx1+(k*56.4)+56.4,'y2':yy1+(j*47.66)+47.66,'row':j,'col':k});
					 ladrillos[j][k]=1;
				}
			}
			for(;i<30;i++){
				pto=points[i];
				ctx.save();
				ctx.beginPath();
				ctx.moveTo(pto['x1'],pto['y1']);
				ctx.lineTo(pto['x2'],pto['y1']);
				ctx.lineTo(pto['x2'],pto['y2']);
				ctx.lineTo(pto['x1'],pto['y2']);
				ctx.closePath();
				ctx.clip();
				ctx.drawImage(cofre, 0, 0);
				ctx.restore();
			}
			ctx.restore();
			pelota=new Image();
			pelota.onload=function(){
				ctx.drawImage(pelota,x,y);	
			}
			pelota.src='images/arkanoid/pelota.png';
			pad=new Image();
			pad.onload=function(){
				ctx.drawImage(pad,padx,pady);	
			}
			pad.src='images/arkanoid/pad.png';
			setTimeout(drawInicial,10);
	}
	cofre.src='images/arkanoid/cofre.png';
}
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
ns.start=0;
ns.vidas=3;
ns.ladrillos=30;
ns.finarkanoid=0;
function drawInicial(){
	if(ns.finarkanoid)return;
	$('bglightbox2').style.display='none';
	$('startmge').style.display='block';
	if(ns.start){
		if(!ns.contando){
			ns.inicio=(+new Date);
			contar();
		}
		draw();
		return;
	}
	clear();
	ctx.save();
	var pto;
	ctx.translate(126,50);
	for(var i=0;i<30;i++){
		var pto=points[i];
		if(ladrillos[pto['row']][pto['col']]){
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(pto['x1'],pto['y1']);
			ctx.lineTo(pto['x2'],pto['y1']);
			ctx.lineTo(pto['x2'],pto['y2']);
			ctx.lineTo(pto['x1'],pto['y2']);
			ctx.closePath();
			ctx.clip();
			ctx.drawImage(cofre, 0, 0);
			ctx.restore();
		}
	}
	ctx.restore();
	ctx.drawImage(pelota,x,y);
	ctx.drawImage(pad,padx,pady);
	x=padx-15+(padWidth/2);
	y=479;
	setTimeout(drawInicial,10);
}
function draw(){
	if(ns.finarkanoid)return;
	$('startmge').style.display='none';
	clear();
	ctx.save();
	var pto;
	ctx.translate(126,50);
	for(var i=0;i<30;i++){
		var pto=points[i];
		if(ladrillos[pto['row']][pto['col']]){
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(pto['x1'],pto['y1']);
			ctx.lineTo(pto['x2'],pto['y1']);
			ctx.lineTo(pto['x2'],pto['y2']);
			ctx.lineTo(pto['x1'],pto['y2']);
			ctx.closePath();
			ctx.clip();
			ctx.drawImage(cofre, 0, 0);
			ctx.restore();
		}
	}
	ctx.restore();
	if(!ns.ladrillos){
		
		
		openGanaste();
		
		return;	
	}
	ctx.drawImage(pelota,x,y);
	ctx.drawImage(pad,padx,pady);

	if( (y+dy+15)>(HEIGHT-padHeight) ){
		if((x+15)>padx && (x-15)<(padx+padWidth) ){
			dy=-dy;
			dx = 8 * ((x-(padx+padWidth/2))/padWidth);
			//$('toc').play();
		}else{
			drawFinal(x,y,dx,dy);
			//$('wrong').play();
			return;
		}
	}
	if((y+dy)<0){
		dy=-dy;
	}
	if((x+dx+30)>=WIDTH){
		dx=-dx;
	}
	if((x+dx)<0){
		dx=-dx;
	}
	var row = Math.floor((y-50+15)/47.66);
    var col = Math.floor((x-126+15)/56.4);
	if(ladrillos[row] && ladrillos[row][col] && ladrillos[row][col]==1){
		ladrillos[row][col]=0;
		ns.ladrillos--;
		//$('success').play();
		dy=-dy;
		explosion(x,y);
		
		
		
	}
	x += dx;
  	y += dy;
	
	ns.particles.forEach(function(particle,i) {
			particle.vy += gravity;
			particle.x += particle.vx;
			particle.y += particle.vy;
			if(particle.y>HEIGHT){
				ns.particles.splice(i,1);
			}else{
				particle.draw();
			}
		
		});
	
	setTimeout(draw,10);
}
function drawFinal(x,y,dx,dy,t){
	if(ns.finarkanoid)return;
	clear();
	ctx.save();
	var pto;
	ctx.translate(126,50);
	for(var i=0;i<30;i++){
		var pto=points[i];
		if(ladrillos[pto['row']][pto['col']]){
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(pto['x1'],pto['y1']);
			ctx.lineTo(pto['x2'],pto['y1']);
			ctx.lineTo(pto['x2'],pto['y2']);
			ctx.lineTo(pto['x1'],pto['y2']);
			ctx.closePath();
			ctx.clip();
			ctx.drawImage(cofre, 0, 0);
			ctx.restore();
		}
	}
	ctx.restore();
	x += dx;
  	y += dy+6;
	ctx.drawImage(pelota,x,y);
	ctx.drawImage(pad,padx,pady);
	if(!t){
		setTimeout(function(){drawFinal(x,y,dx,dy,1);},10);
	}else{
		ns.vidas--;
		if(ns.vidas==2){
			$('vida3').style.opacity=.3;
			$('vida3').style.filter='alpha(opacity=30)';
		}
		if(ns.vidas==1){
			$('vida2').style.opacity=.3;
			$('vida2').style.filter='alpha(opacity=30)';
		}
		if(ns.vidas==0){
			$('vida1').style.opacity=.3;
			$('vida1').style.filter='alpha(opacity=30)';
		}
		$('bonustiempo').innerHTML='-'+1;
		$('bonustiempo').onMotionFinished=function(){
			$('bonustiempo').style.top='-500px';
			ns.start=0;
			
				if(ns.vidas){
					setTimeout(drawInicial,50);
				}else{
					clearTimeout(ns.contador);
				
					openPerdiste();
					
					//$('fail').play();
				}
				
			};
			$('bonustiempo').style.opacity=1;
			$('bonustiempo').style.filter='alpha(opacity=100)';
			$('bonustiempo').style.top=0;
			setTimeout(
					   function(){
						   fx($('bonustiempo'),
								[
								   {'inicio':1,'fin':0,'u':'','propCSS':'opacity'},
								   {'inicio':0,'fin':400,'u':'px','propCSS':'top'}
								],1000,true,senoidal
							);
					   }
					   ,300
			);
		}
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    padx = Math.max(evt.pageX - canvasMinX - (padWidth/2), 0);
    padx = Math.min(WIDTH - padWidth, padx);
  }
}
function getOffset(obj) {
      var offsetLeft = 0;
	  var offsetTop = 0;
		do {
		  if (!isNaN(obj.offsetLeft)) {
			  offsetLeft += obj.offsetLeft;
		  }
		  if (!isNaN(obj.offsetTop)) {
			  offsetTop += obj.offsetTop;
		  }   
		} while(obj = obj.offsetParent );
		return {left: offsetLeft, top: offsetTop};
	} 
var offsetX,offsetY;
function handleTouchMove(e) {
	e.preventDefault();
	e.stopPropagation();
	var touch = e.targetTouches[0];
	//mouseX = (touch.pageX-offsetX) || 0;
	//mouseY = (touch.pageY-offsetY) || 0;
	mouseX = (touch.pageX) || 0;
	mouseY = (touch.pageY) || 0;
  if (mouseX > canvasMinX && mouseX < canvasMaxX) {
    padx = Math.max(mouseX - canvasMinX - (padWidth/2), 0);
    padx = Math.min(WIDTH - padWidth, padx);
  }
}

function closeComoJugar(){
	$('bglightbox').style.display=$('lightboxes').style.display='none';
}
function openPerdiste(){
	$('bglightbox').style.display=$('perdiste').style.display='block';
}
function openGanaste(){
	$('bglightbox').style.display=$('ganaste').style.display='block';
}
function openRegistro(){
	$('bglightbox').style.display=$('registro').style.display='block';
}
function openTeRegistraste(){
	$('bglightbox').style.display=$('teregistraste').style.display='block';
}



ns.sonidoscargados=0;
function initSounds(){
	if(!ns.sonidoscargados){
		ns.sonidoscargados=1;
		/*$('success').play();
		$('success').pause();
		$('toc').play();
		$('toc').pause();
		$('wrong').play();
		$('wrong').pause();
		$('fail').play();
		$('fail').pause();*/
	}
}


/*----------------------------------------------------------------------------------*/
ns.luces=['images/simon/1_on.png','images/simon/2_on.png','images/simon/3_on.png','images/simon/4_on.png'];
ns.btns=['images/simon/1.png','images/simon/2.png','images/simon/3.png','images/simon/4.png'];
function registrar(nro){
	$('im'+nro).src=ns.luces[parseInt(nro,10)-1];
	setTimeout(function(){$('im'+nro).src=ns.btns[parseInt(nro,10)-1];},500);
	//$('s'+nro).play();
	test(nro);
}
function activar(){
	for(var i=1,l=5;i<l;i++){
		(function(i){
			$('im'+i).style.cursor='pointer';
			$('im'+i).onclick=function(){
				registrar(i);
		}})(i);
	}
}
function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function desActivar(){
	for(var i=1,l=5;i<l;i++){
		(function(i){
			$('im'+i).style.cursor='default';
			$('im'+i).onclick=function(){}})(i);
	}
}
var cola=[];
var copy=[];
var play=[];
ns.puntos=0;
ns.tiempo=0;
function ejecutarCola(){
	var cur=parseInt(play.shift(),10);
	$('im'+cur).src=ns.luces[parseInt(cur,10)-1];
	setTimeout(function(){$('im'+cur).src=ns.btns[parseInt(cur,10)-1];},200);
	//$('s'+cur).play();
	if(play.length>0){
		setTimeout(ejecutarCola,800);
	}else{
		setTimeout(tuTurno,1000);
	}
	
}
function miTurno(){
	 desActivar();
	
	$('humano').style.opacity=.2;
	$('humano').style.filter='alpha(opacity=20)';
	$('pc').style.opacity=1;
	$('pc').style.filter='alpha(opacity=100)';
	var rnd=getRandomInt(1,4);
	cola.push(rnd);
	play=cola.slice(0);
	ejecutarCola();	
}
function tuTurno(){
	$('pc').style.opacity=.3;
	$('pc').style.filter='alpha(opacity=30)';
	$('humano').style.opacity=1;
	$('humano').style.filter='alpha(opacity=100)';
	activar();
	copy=cola.slice(0);
}
function test(nro){
	var correcto=copy.shift();
	if(correcto!=nro){
		if(ns.puntos){
			openGanaste();
		}else{
			openPerdiste();
		}
		//$('wrong').play();
	}else{
		if(copy.length<1){
			
			$('bonustiempo').innerHTML='+'+1;
					$('bonustiempo').onMotionFinished=function(){
						$('bonustiempo').style.top='-1500px';
						ns.puntos++;
						ns.tiempo=ns.puntos;
						$('score').innerHTML='Puntos: '+ns.puntos;
					};
					$('bonustiempo').style.opacity=1;
					$('bonustiempo').style.filter='alpha(opacity=100)';
					$('bonustiempo').style.top=500;
					setTimeout(
						function(){
							fx($('bonustiempo'),[
							{'inicio':1,'fin':0,'u':'','propCSS':'opacity'},
							{'inicio':500,'fin':0,'u':'px','propCSS':'top'}
							],1000,true,senoidal);
						}
						,300
					);
			
			setTimeout(miTurno,1000);
		}
	}
}




function setAudio(){
	/*$('s1').play();
	$('s1').pause();
	$('s2').play();
	$('s2').pause();
	$('s3').play();
	$('s3').pause();
	$('s4').play();
	$('s4').pause();
	$('wrong').play();
	$('wrong').pause();*/
}
function preloadImages(){
	var i=0,l=4,ims=[],cargadas=[];
	for(;i<l;i++){
		ims[i]=new Image();
		ims[i].src=ns.luces[i];
	}
	var loop=setInterval(
		function(){
			l=ims.length
			if(l>0){
				for(i=0;i<l;i++){
					if(ims[i] && (ims[i].complete || ims[i].width) ){
						ims.splice(i, 1);
					}
				}
			}else{
				clearInterval(loop);
				$('bglightbox2').style.display='none';
			}
		}
		,17
	);
}
/*-----------------------------------------------------------------------*/
function preloadImages2(){
	ventana(100,100);
	$('qq').innerHTML='';
	var i=0,l=6,ims=[],cargadas=[];
	for(;i<l;i++){
		ims[i]=new Image();
		ims[i].src='images/memotest/ficha'+(i+1)+'.png';
	}
	var loop=setInterval(
		function(){
			l=ims.length
			if(l>0){
				for(i=0;i<l;i++){
					if(ims[i] && (ims[i].complete || ims[i].width) ){
						ims.splice(i, 1);
					}
				}
			}else{
				clearInterval(loop);
				cerrar();
			}
		}
		,17
	);
}


ns.duration=60;
function contar2(){
	ns.ahora=(+new Date);
	ns.segundos=Math.floor((ns.ahora-ns.inicio)/1000);
	var lim=ns.duration;
	var t=lim-ns.segundos;
	if(!t){
		ventana(100,100);
		$('qq').innerHTML='';
		$('cronometro2').innerHTML='00:00';
		cerrar();
		//$('fail').play();
		
		openPerdiste();
		
		return;
	}
	var tt=seg2hora(t);
	
	$('cronometro2').innerHTML=tt[1]+':'+tt[2];
	ns.contador=setTimeout(contar2,1000);
}

var uno=0,dos=0,aciertos=0,fin=0,empezado=0;
function ver(e,cual,el){
	stopEvent(e);
	if(!empezado){
		//$('fail').play();
		//$('fail').pause();
		ns.inicio=(+new Date);
		contar2();
		empezado=1;
	}
	//$('noc').play();
	el.a=getElementsByClassName('front',el)[0];
	el.b=getElementsByClassName('back',el)[0];
	el.a.style.transform='rotateX(180deg)';el.a.style.webkitTransform ='rotateX(180deg)';
	el.b.style.transform='rotateX(0deg)';el.b.style.webkitTransform ='rotateX(0deg)';
	el.old=el.onclick;
	el.onclick=function(){};
	el.cual=cual;
	if(uno){dos=el;}else{uno=el;}
	if(uno && dos){
		var _uno=uno;
		var _dos=dos;
		if(uno.cual==dos.cual){
			setTimeout(
				function(){
					_dos.className=_uno.className='fichabase animated flash';
					aciertos++;
					//$('success').play();
					$('bonustiempo').innerHTML='+'+1;
					$('bonustiempo').onMotionFinished=function(){
						$('bonustiempo').style.top='-500px';
						if(aciertos==6 && !fin){
							clearTimeout(ns.contador);
							
							
							openGanaste();
							
							fin=1;
						}
					};
					$('bonustiempo').style.opacity=1;
					$('bonustiempo').style.filter='alpha(opacity=100)';
					$('bonustiempo').style.top=0;
					setTimeout(
						function(){
							fx($('bonustiempo'),[
							{'inicio':1,'fin':0,'u':'','propCSS':'opacity'},
							{'inicio':0,'fin':400,'u':'px','propCSS':'top'}
							],1000,true,senoidal);
						}
						,300
					);
					
				},
				500
			);
		}else{
			setTimeout(
				function(){
					_uno.a.style.transform='rotateX(0deg)';_uno.a.style.webkitTransform ='rotateX(0deg)';
					_uno.b.style.transform='rotateX(180deg)';_uno.b.style.webkitTransform ='rotateX(180deg)';
					_dos.a.style.transform='rotateX(0deg)';_dos.a.style.webkitTransform ='rotateX(0deg)';
					_dos.b.style.transform='rotateX(180deg)';_dos.b.style.webkitTransform ='rotateX(180deg)';
					_uno.onclick=_uno.old;
					_dos.onclick=_dos.old;
				},
				1000
			);
		}
		 uno=0;dos=0;
	}
}



function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
function IrBrajando(){
	var barajas=shuffle(['1','2','3','4','5','6','1','2','3','4','5','6']);
	var html='';
	for(var i=0;i<12;i++){
		html+='<div class="fichabase" data-indice="'+i+'" onMouseDown="return false" onClick="ver(event,&quot;ficha'+barajas[i]+'&quot;,this)">	<div class="flipper">		<div class="front">			<img src="images/memotest/fichas_base.png">		</div>		<div class="back">			<img src="images/memotest/ficha'+barajas[i]+'.png">		</div>	</div></div>';
	}
	$('barajando').innerHTML=html;
	
}
