function alerta(mje,w){
	var ww=w || 466;
	ventana(ww,70);
	$('qq').innerHTML='<div class="cajaalert" style="width:'+ww+'px;  text-align:center;padding: 30px 0"><a onclick="cerrar();return false;" href="" style="display:block;width:15px;height:15px;position:absolute; background:url(images/bt_cerrar_2.png);right: 10px;top: 10px;"></a>'+mje+'</div>';
}
/*---*/
function error(el,desde, hasta,t){
	if(desde[0]!=hasta[0] || desde[1]!=hasta[1] || desde[2]!=hasta[2]){
		desde[0]=(desde[0]+3)<hasta[0]?desde[0]+3:hasta[0];
		desde[1]=(desde[1]+3)<hasta[1]?desde[1]+3:hasta[1];
		desde[2]=(desde[2]+3)<hasta[2]?desde[2]+3:hasta[2];
		el.style.backgroundColor='rgb('+desde[0]+','+desde[1]+','+desde[2]+')';
		setTimeout(function(){error(el,desde, hasta,t)},30);
	}else{
		if(t){
			el.style.backgroundColor='transparent';
		}
	}
}
if(!String.prototype.trim){  
  String.prototype.trim = function(){  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
}
function solonro(e) { // 1
	/*uso  onkeypress="return solonro(event)"*/
    tecla = e.keyCode || e.which; // 2
    if (tecla==8 || tecla==0 || tecla==9  || tecla==46) return true; // 3
    patron =/\d/; // Solo acepta n?meros
    te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
} 
function sololetra(e) { // 1
    tecla = (document.all) ? e.keyCode : e.which; 
    if (tecla==8 || tecla==0 || tecla==9) return true; // 3
    if (tecla==32) return true; // espacio
    if (e.ctrlKey && tecla==86) { return true;} //Ctrl v
    if (e.ctrlKey && tecla==67) { return true;} //Ctrl c
    if (e.ctrlKey && tecla==88) { return true;} //Ctrl x
 
    patron = /[a-zA-Z]/; //patron
 
    te = String.fromCharCode(tecla); 
    return patron.test(te); // prueba de patron
} 
function ver(e,callback){ 
    var t=e.keyCode || e.wich; 
    if(t==13){ 
        callback();
        return false; 
    } 
    return true; 
}
/*---*/
function caracteresRestantes(info,limite,campo){
	if(campo.value.length>limite){
		campo.value=campo.value.substr(0,limite);
	}
	info.innerHTML=(limite-parseInt(campo.value.length))+' caracteres restantes';
}
/*---*/
function error(el,desde, hasta,t){
	if(desde[0]!=hasta[0] || desde[1]!=hasta[1] || desde[2]!=hasta[2]){
		desde[0]=(desde[0]+3)<hasta[0]?desde[0]+3:hasta[0];
		desde[1]=(desde[1]+3)<hasta[1]?desde[1]+3:hasta[1];
		desde[2]=(desde[2]+3)<hasta[2]?desde[2]+3:hasta[2];
		el.style.backgroundColor='rgb('+desde[0]+','+desde[1]+','+desde[2]+')';
		setTimeout(function(){error(el,desde, hasta,t)},30);
	}else{
		if(t){
			el.style.backgroundColor='transparent';
		}
	}
}


