window.addEventListener('load', main, false);
function main(){
	const w = canvas.width;
	const h = canvas.height;
	const deltaTime = 2000;
	const ctx = canvas.getContext('2d');
	let finishflag=0;
	let verx= [];
	let verx_Y= [];
	let nis = [];
	let nis_Y = [];
	let pravo = [];
	let pravo_Y = [];
	let levo = [];
	let levo_Y = [];
	let pole = [];
	let pole_Y = [];
	let big_pole=[];
	let flag = 0;
	let predzone = 0;
	for (var i =0; i < 1024; i++) {
					//if (big_pole[i]!=0) {continue;}
					big_pole[i]=0;
				}

	function paint(a){
		let b=0;
		if (a<=5) {b=a;}
		if(a>5 && a<100){b=a/6;}
		if(a>=100){b=0;}
		switch(b){
		case 1 : 
			return `rgb(${255},${0},${0})`;
			break;
		case 2 : 
			return `rgb(${0},${255},${0})`;
			break;
		case 3 : 
			return `rgb(${0},${0},${255})`;
			break;
		case 4 : 
			return `rgb(${0},${255},${255})`;
			break;
		case 5 : 
			return `rgb(${255},${255},${0})`;
			break;
		default :
			return `rgb(${255},${255},${255})`;
		}

	}

	function render_polya(){
		let j = 0;
		let n=0;
		for (var i = 0; i <=8; i++) {
				if (i == 8)
				{
					j++;
					i = 0;
				}
				if (j >= 8)
					break;
				ctx.fillStyle = paint(pole[n]);
				//ctx.fillRect(w/4+i/16*w, h/4+j/16*h, 1/16*w, 1/16*h);
				ctx.strokeRect(w/4+i/16*w, h/4+j/16*h, 1/16*w, 1/16*h);
				ctx.beginPath();
    				ctx.moveTo(w/4+i/16*w,h/4+j/16*h);
    				ctx.lineTo(w/4+i/16*w,h/4+j/16*h+1/16*w);
    				ctx.lineTo(w/4+i/16*w+1/16*h,h/4+j/16*h+1/16*w);
    				ctx.lineTo(w/4+i/16*w+1/16*h,h/4+j/16*h);
    				ctx.fill();
				n++;
    			/*console.log(paint(pole[i]));
    			console.log(j);
    			console.log(i);*/
		}
	}

	function render_verx(){
		let j = 0;
		let LeftBonesX=[12];
		let LeftBonesY=[12];
		let RightBonesX=[12];
		let RightBonesY=[12];
		let UpLeftX0 = 0;
		let UpLeftY0 = 0;
		let UpRightX0 = 0;
		let UpRightY0 = 0;
		let DownLeftX0 = 0;
		let DownLeftY0 = 0;
		let DownRightX0 = 0;
		let DownRightY0 = 0;
		for (var i = 0; i < 13; i++) {
			LeftBonesX[i] = i/(12-i)*w/4/(i/(12-i)+1);
			LeftBonesY[i] = LeftBonesX[i];
			RightBonesX[i] = w - LeftBonesX[i];
			RightBonesY[i] = LeftBonesY[i];
			if (i == 12) {
				LeftBonesX[i] = w/4;
				LeftBonesY[i] = w/4;
				RightBonesX[i] = 3/4*w;
				RightBonesY[i] = 1/4*w;
			}
		}
		for (var i = 0; i <=8; i++) {
				if (i == 7)
				{
					ctx.fillStyle = paint(verx[i+j*8]);
					ctx.beginPath();
    				ctx.moveTo(w - UpRightX0,UpLeftY0);
    				ctx.lineTo(w - UpLeftX0,UpRightY0);
    				ctx.lineTo(w - DownLeftX0,DownRightY0);
    				ctx.lineTo(w - DownRightX0,DownLeftY0);
    				ctx.fill();
    				ctx.stroke();
    				ctx.closePath();
					j++;
					i = -1;
					//console.log('pon');
					continue;
				}
				if (j >= 12)
					break;
				ctx.fillStyle = paint(verx[i+j*8]);
				//ctx.fillRect(w/4+i/16*w, h/4+j/16*h, 1/16*w, 1/16*h);
				let UpLeftX = 0;
				let UpLeftY = 0;
				let UpRightX = 0;
				let UpRightY = 0;
				let DownLeftX = 0;
				let DownLeftY = 0;
				let DownRightX = 0;
				let DownRightY = 0;
				UpLeftX = (LeftBonesX[j]+i/(8-i)*RightBonesX[j])/(1+i/(8-i));
				UpLeftY = /*(j)/12*w/4;*/(LeftBonesY[j]+i/(8-i)*RightBonesY[j])/(1+i/(8-i));
				UpRightX = (LeftBonesX[j]+(i+1)/(7-i)*RightBonesX[j])/(1+(i+1)/(7-i));
				UpRightY = /*(j)/12*w/4;//*/(LeftBonesY[j]+(i+1)/(7-i)*RightBonesY[j])/(1+(i+1)/(7-i));
				DownLeftX = (LeftBonesX[j+1]+i/(8-i)*RightBonesX[j+1])/(1+i/(8-i));;
				DownLeftY = /*(j+1)/12*w/4;*/(LeftBonesY[j+1]+i/(8-i)*RightBonesY[j+1])/(1+i/(8-i));
				DownRightX = (LeftBonesX[j+1]+(i+1)/(7-i)*RightBonesX[j+1])/(1+(i+1)/(7-i));;
				DownRightY =  /*(j+1)/12*w/4;*/(LeftBonesY[j+1]+(i+1)/(7-i)*RightBonesY[j+1])/(1+(i+1)/(7-i));
				if (i == 0)
				{
					UpLeftX0 = UpLeftX;  
					UpLeftY0 = UpLeftY; 
					UpRightX0 = UpRightX; 
					UpRightY0 = UpRightY; 
					DownLeftX0 = DownLeftX; 
					DownLeftY0 = DownLeftY; 
					DownRightX0 = DownRightX;
					DownRightY0 = DownRightY;
				}
				ctx.beginPath(); 
    			ctx.moveTo(UpLeftX,UpLeftY);
    			ctx.lineTo(UpRightX,UpRightY);
    			ctx.lineTo(DownRightX,DownRightY);
    			ctx.lineTo(DownLeftX,DownLeftY);

    			ctx.fill();
    			ctx.stroke();
    			//ctx.closePath();
    			
    			count++;
    			//console.log(i);
		}
	}

	function render_levo(){
		let j = 0;
		let UpBonesX=[12];
		let UpBonesY=[12];
		let DownBonesX=[12];
		let DownBonesY=[12];
		let UpLeftX0 = 0;
		let UpLeftY0 = 0;
		let UpRightX0 = 0;
		let UpRightY0 = 0;
		let DownLeftX0 = 0;
		let DownLeftY0 = 0;
		let DownRightX0 = 0;
		let DownRightY0 = 0;
		for (var i = 0; i < 13; i++) {
			if (i == 12) {
				UpBonesX[i] = w/4;
				UpBonesY[i] = w/4;
				DownBonesX[i] = 1/4*w;
				DownBonesY[i] = 3/4*w;
				break;
			}
			UpBonesX[i] = i/(12-i)*w/4/(i/(12-i)+1);
			UpBonesY[i] = UpBonesX[i];
			DownBonesX[i] = UpBonesX[i];
			DownBonesY[i] = w - UpBonesY[i];
			
		}
		for (var i = 0; i <8; i++) {
				if (i == 7)
				{
					ctx.fillStyle = paint(levo[i+j*8]);
					ctx.beginPath();
    				ctx.moveTo(UpRightX0,w - UpRightY0);
    				ctx.lineTo(UpLeftX0,w - UpLeftY0);
    				ctx.lineTo(DownLeftX0,w - DownLeftY0);
    				ctx.lineTo(DownRightX0,w - DownRightY0);
    				ctx.fill();
    				ctx.stroke();
    				ctx.closePath();
					j++;
					i = -1;
					//console.log('pon');
					continue;
				}
				if (j >= 12)
					break;
				ctx.fillStyle = paint(levo[i+j*8]);
				//ctx.fillRect(w/4+i/16*w, h/4+j/16*h, 1/16*w, 1/16*h);
				let UpLeftX = 0;
				let UpLeftY = 0;
				let UpRightX = 0;
				let UpRightY = 0;
				let DownLeftX = 0;
				let DownLeftY = 0;
				let DownRightX = 0;
				let DownRightY = 0;
				UpLeftX = j/12*w/4;
				UpLeftY = /*(j)/12*w/4;//*/(UpBonesY[j]+i/(8-i)*DownBonesY[j])/(1+i/(8-i));
				UpRightX = (j+1)/12*w/4;
				UpRightY = /*(j)/12*w/4;//*/(UpBonesY[j+1]+(i)/(8-i)*DownBonesY[j+1])/(1+(i)/(8-i));
				DownLeftX = j/12*w/4
				DownLeftY = (UpBonesY[j]+(i+1)/(7-i)*DownBonesY[j])/(1+(i+1)/(7-i));
				DownRightX = (j+1)/12*w/4
				DownRightY =  (UpBonesY[j+1]+(i+1)/(7-i)*DownBonesY[j+1])/(1+(i+1)/(7-i));
				if (i == 0)
				{
					UpLeftX0 = UpLeftX;  
					UpLeftY0 = UpLeftY; 
					UpRightX0 = UpRightX; 
					UpRightY0 = UpRightY; 
					DownLeftX0 = DownLeftX; 
					DownLeftY0 = DownLeftY; 
					DownRightX0 = DownRightX;
					DownRightY0 = DownRightY;
				}
				ctx.beginPath(); 
    			ctx.moveTo(UpLeftX,UpLeftY);
    			ctx.lineTo(UpRightX,UpRightY);
    			ctx.lineTo(DownRightX,DownRightY);
    			ctx.lineTo(DownLeftX,DownLeftY);
    			ctx.fill();
    			ctx.stroke();
    			
    			ctx.closePath();
    			/*console.log(UpLeftY);
    			console.log(UpRightY);
    			console.log(paint(pole[i]));
    			console.log(j);*/
    			count++;
    			/*console.log(i);*/

	}
	
}

function render_nis(){
		let j = 0;
		let LeftBonesX=[12];
		let LeftBonesY=[12];
		let RightBonesX=[12];
		let RightBonesY=[12];
		let UpLeftX0 = 0;
		let UpLeftY0 = 0;
		let UpRightX0 = 0;
		let UpRightY0 = 0;
		let DownLeftX0 = 0;
		let DownLeftY0 = 0;
		let DownRightX0 = 0;
		let DownRightY0 = 0;
		for (var i = 0; i < 13; i++) {
			LeftBonesX[i] = i/(12-i)*w/4/(i/(12-i)+1);
			LeftBonesY[i] = w-LeftBonesX[i];
			RightBonesX[i] = w - LeftBonesX[i];
			RightBonesY[i] = LeftBonesY[i];
			if (i == 12) {
				LeftBonesX[i] = w/4;
				LeftBonesY[i] = 3 * w/4;
				RightBonesX[i] = 3/4*w;
				RightBonesY[i] = 3/4*w;
			}
		}
		for (var i = 0; i <=8; i++) {
				if (i == 7)
				{
					ctx.fillStyle = paint(nis[i+j*8]);
					ctx.beginPath();
    				ctx.moveTo(w - UpRightX0,UpLeftY0);
    				ctx.lineTo(w - UpLeftX0,UpRightY0);
    				ctx.lineTo(w - DownLeftX0,DownRightY0);
    				ctx.lineTo(w - DownRightX0,DownLeftY0);
    				ctx.fill();
    				ctx.stroke();
    				ctx.closePath();
					j++;
					i = -1;
					//console.log('pon');
					continue;
				}
				if (j >= 12)
					break;
				ctx.fillStyle = paint(nis[i+j*8]);
				//ctx.fillRect(w/4+i/16*w, h/4+j/16*h, 1/16*w, 1/16*h);
				let UpLeftX = 0;
				let UpLeftY = 0;
				let UpRightX = 0;
				let UpRightY = 0;
				let DownLeftX = 0;
				let DownLeftY = 0;
				let DownRightX = 0;
				let DownRightY = 0;
				UpLeftX = (LeftBonesX[j]+i/(8-i)*RightBonesX[j])/(1+i/(8-i));
				UpLeftY = /*(j)/12*w/4;*/(LeftBonesY[j]+i/(8-i)*RightBonesY[j])/(1+i/(8-i));
				UpRightX = (LeftBonesX[j]+(i+1)/(7-i)*RightBonesX[j])/(1+(i+1)/(7-i));
				UpRightY = /*(j)/12*w/4;//*/(LeftBonesY[j]+(i+1)/(7-i)*RightBonesY[j])/(1+(i+1)/(7-i));
				DownLeftX = (LeftBonesX[j+1]+i/(8-i)*RightBonesX[j+1])/(1+i/(8-i));;
				DownLeftY = /*(j+1)/12*w/4;*/(LeftBonesY[j+1]+i/(8-i)*RightBonesY[j+1])/(1+i/(8-i));
				DownRightX = (LeftBonesX[j+1]+(i+1)/(7-i)*RightBonesX[j+1])/(1+(i+1)/(7-i));;
				DownRightY =  /*(j+1)/12*w/4;*/(LeftBonesY[j+1]+(i+1)/(7-i)*RightBonesY[j+1])/(1+(i+1)/(7-i));
				if (i == 0)
				{
					UpLeftX0 = UpLeftX;  
					UpLeftY0 = UpLeftY; 
					UpRightX0 = UpRightX; 
					UpRightY0 = UpRightY; 
					DownLeftX0 = DownLeftX; 
					DownLeftY0 = DownLeftY; 
					DownRightX0 = DownRightX;
					DownRightY0 = DownRightY;
				}
				ctx.beginPath(); 
    			ctx.moveTo(UpLeftX,UpLeftY);
    			ctx.lineTo(UpRightX,UpRightY);
    			ctx.lineTo(DownRightX,DownRightY);
    			ctx.lineTo(DownLeftX,DownLeftY);

    			ctx.fill();
    			ctx.stroke();
    			//ctx.closePath();
    			
    			count++;
    			//console.log(i);
		}
	}

	function render_pravo(){
		let j = 0;
		let UpBonesX=[12];
		let UpBonesY=[12];
		let DownBonesX=[12];
		let DownBonesY=[12];
		let UpLeftX0 = 0;
		let UpLeftY0 = 0;
		let UpRightX0 = 0;
		let UpRightY0 = 0;
		let DownLeftX0 = 0;
		let DownLeftY0 = 0;
		let DownRightX0 = 0;
		let DownRightY0 = 0;
		for (var i = 0; i < 13; i++) {
			if (i == 12) {
				UpBonesX[i] = w/4;
				UpBonesY[i] = w/4;
				DownBonesX[i] = 3/4*w;
				DownBonesY[i] = 3/4*w;
				break;
			}
			UpBonesX[i] = w - i/(12-i)*w/4/(i/(12-i)+1);
			UpBonesY[i] = w - UpBonesX[i];
			DownBonesX[i] = UpBonesX[i];
			DownBonesY[i] = w - UpBonesY[i];
			
		}
		for (var i = 0; i <8; i++) {
				if (i == 7)
				{
					ctx.fillStyle = paint(pravo[i+j*8]);
					ctx.beginPath();
    				ctx.moveTo(UpRightX0,w - UpRightY0);
    				ctx.lineTo(UpLeftX0,w - UpLeftY0);
    				ctx.lineTo(DownLeftX0,w - DownLeftY0);
    				ctx.lineTo(DownRightX0,w - DownRightY0);
    				ctx.fill();
    				ctx.stroke();
    				ctx.closePath();
					j++;
					i = -1;
					//console.log('pon');
					continue;
				}
				if (j >= 12)
					break;
				ctx.fillStyle = paint(pravo[i+j*8]);
				//ctx.fillRect(w/4+i/16*w, h/4+j/16*h, 1/16*w, 1/16*h);
				let UpLeftX = 0;
				let UpLeftY = 0;
				let UpRightX = 0;
				let UpRightY = 0;
				let DownLeftX = 0;
				let DownLeftY = 0;
				let DownRightX = 0;
				let DownRightY = 0;
				UpLeftX = w - j/12*w/4;
				UpLeftY = /*(j)/12*w/4;//*/(UpBonesY[j]+i/(8-i)*DownBonesY[j])/(1+i/(8-i));
				UpRightX = w - (j+1)/12*w/4;
				UpRightY = /*(j)/12*w/4;//*/(UpBonesY[j+1]+(i)/(8-i)*DownBonesY[j+1])/(1+(i)/(8-i));
				DownLeftX = w - j/12*w/4
				DownLeftY = (UpBonesY[j]+(i+1)/(7-i)*DownBonesY[j])/(1+(i+1)/(7-i));
				DownRightX = w - (j+1)/12*w/4
				DownRightY =  (UpBonesY[j+1]+(i+1)/(7-i)*DownBonesY[j+1])/(1+(i+1)/(7-i));
				if (i == 0)
				{
					UpLeftX0 = UpLeftX;  
					UpLeftY0 = UpLeftY; 
					UpRightX0 = UpRightX; 
					UpRightY0 = UpRightY; 
					DownLeftX0 = DownLeftX; 
					DownLeftY0 = DownLeftY; 
					DownRightX0 = DownRightX;
					DownRightY0 = DownRightY;
				}
				ctx.beginPath(); 
    			ctx.moveTo(UpLeftX,UpLeftY);
    			ctx.lineTo(UpRightX,UpRightY);
    			ctx.lineTo(DownRightX,DownRightY);
    			ctx.lineTo(DownLeftX,DownLeftY);
    			ctx.fill();
    			ctx.stroke();
    			
    			ctx.closePath();
    			/*console.log(UpLeftY);
    			console.log(UpRightY);
    			console.log(paint(pole[i]));
    			console.log(j);*/
    			count++;
    			/*console.log(i);*/

	}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor((Math.random() * (max - min) + min));
}

function zone0(i)
{
	for(j=0;j<8;j++)
	 if (i>=12+j*32+32*12 && i< 20+j*32+32*12) { return 1}
	return 0;
}

function zone1(i)
{
	for(j=0;j<12;j++)
	 if (i>=12+j*32 && i< 20+j*32) { return 1}
	return 0;
}

function zone2(i)
{
	for(j=0;j<8;j++)
	 if (i>=(0+j*32+32*12) && i< (12+32*j+32*12)) { return 1}
	return 0;
}

function zone3(i)
{
	for(j=0;j<8;j++)
	 if (i>=20+32*12+j*32 && i< 32*12+32*j+32) { return 1}
	return 0;
}

function zone4(i)
{
	for(j=0;j<12;j++)
	 if (i>=12+32*20+j*32 && i< 20+32*20+32*j) { return 1}
	return 0;
}

function zone1dvig(i)
{
	for(j=0;j<3;j++)
	 if (i>=12+j*32 && i< 20+j*32) { return 1}
	return 0;
}

function zone2dvig(i)
{
	for(j=0;j<8;j++)
	 if (i>=(0+j*32+32*12) && i< (3+32*j+32*12)) { return 1}
	return 0;
}

function zone3dvig(i)
{
	for(j=0;j<8;j++)
	 if (i>=29+32*12+j*32 && i< 32*12+32*j+32) { return 1}
	return 0;
}

function zone4dvig(i)
{
	for(j=9;j<12;j++)
	 if (i>=12+32*20+j*32 && i< 20+32*20+32*j) { return 1}
	return 0;
}

function probrazovanie()
{
	let a =0;
	let b =0;
	let c =0;
	let d =0;
	let k = 0;
	let f = 8;
	let r=0;
	let sum = 0;
	let levo2=[];
	let nis2=[];
	let pravo2=[];
	let h=0;
	let y=0;
	for (i=0;i<1024;i++)
	{
		if (zone1(i) == 1) {verx[a] = big_pole[i];a++;continue}
		if (zone2(i) == 1) {
			levo[b*8+k] = big_pole[i];
			b++;
			if (b==12) {b=0;k++}
			/*console.log(levo);continue*/}
		if (zone3(i) == 1) {
			pravo2[h*8+y] = big_pole[i];
			h++;
			if (h==12) {h=0;y++}}
		if (zone4(i) == 1) {nis2[d] = big_pole[i];
		d++;
		continue}
		if (zone0(i) == 1) {pole[r] = big_pole[i];r++;continue}
		/*console.log(big_pole);
		console.log(nis);*/
	}
	for (i=95;i>=0;i--)
	{
		if (i<96 && i>=88) {nis[i-88]=nis2[i]}
		if (i<88 && i>=80) {nis[i-72]=nis2[i]}
		if (i<80 && i>=72) {nis[i-56]=nis2[i]}
		if (i<72 && i>=64) {nis[i-40]=nis2[i]}
		if (i<64 && i>=56) {nis[i-24]=nis2[i]}
		if (i<56 && i>=48) {nis[i-8]=nis2[i]}
		if (i<48 && i>=40) {nis[i+8]=nis2[i]}
		if (i<40 && i>=32) {nis[i+24]=nis2[i]}
		if (i<32 && i>=24) {nis[i+40]=nis2[i]}
		if (i<24 && i>=16) {nis[i+56]=nis2[i]}
		if (i<16 && i>=8) {nis[i+72]=nis2[i]}
		if (i<8 && i>=0) {nis[i+88]=nis2[i]}

	}
	for (i=95;i>=0;i--)
	{
		if (i<96 && i>=88) {pravo[i-88]=pravo2[i]}
		if (i<88 && i>=80) {pravo[i-72]=pravo2[i]}
		if (i<80 && i>=72) {pravo[i-56]=pravo2[i]}
		if (i<72 && i>=64) {pravo[i-40]=pravo2[i]}
		if (i<64 && i>=56) {pravo[i-24]=pravo2[i]}
		if (i<56 && i>=48) {pravo[i-8]=pravo2[i]}
		if (i<48 && i>=40) {pravo[i+8]=pravo2[i]}
		if (i<40 && i>=32) {pravo[i+24]=pravo2[i]}
		if (i<32 && i>=24) {pravo[i+40]=pravo2[i]}
		if (i<24 && i>=16) {pravo[i+56]=pravo2[i]}
		if (i<16 && i>=8) {pravo[i+72]=pravo2[i]}
		if (i<8 && i>=0) {pravo[i+88]=pravo2[i]}

	}
}

function proverka1(k){
	for (let b=0;b<=19;b++){
		if(big_pole[12+k+32*b]!=0 && zone1(12+k+32*b)==1)
			return 1;
	}
	return 0;
}
 
function proverka4(k){
	for (let b=0;b<=19;b++){
		if(big_pole[12+k+32*b+32*12]!=0 && zone4(12+k+32*b+32*12)==1)
			return 1;
	}
	return 0;
}

function proverka2(k){
	for (let b=0;b<=19;b++){
		if(big_pole[b+32*k+32*12]!=0 && zone2(b+32*k+32*12)==1)
			return 1;
	}
	return 0;
}

function proverka3(k){
	for (let b=0;b<=19;b++){
		if(big_pole[12+b+32*k+32*12]!=0 && zone3(12+b+32*k+32*12)==1)
			return 1;
	}
	return 0;
}



function update()
{

	for(z = 0;z < 1024;z++){
		if (big_pole[z]>100) {continue;}
				if (zone1dvig(z) && big_pole[z]!=0 ){
					predzone =1;
					break;
				}
				if (zone2dvig(z) && big_pole[z]!=0 ){
					predzone =2;
					break;
				}
				if (zone3dvig(z) && big_pole[z]!=0 ){
					predzone =3;
					break;
				}
				if (zone4dvig(z)  && big_pole[z]!=0 ){
					predzone =4;
					break;
				}
			}

	if (flag != 0)
	{
		button_inputLeft.onclick = ()=>{
		for(i=0;i<1024;i++)
		{
			if (big_pole[i] != 0) {
				if (zone1dvig(i)==1) {big_pole[i-1] = big_pole[i];big_pole[i] = 0;}
				if (zone3dvig(i)==1) {big_pole[i-32] = big_pole[i];big_pole[i] = 0;}
				
			}
		}
		for(i=1023;i>=0;i--)
		{
			if (big_pole[i] != 0) {
				if (zone2dvig(i)==1) {big_pole[i+32] = big_pole[i];
				big_pole[i] = 0;
				console.log(big_pole);}
				if (zone4dvig(i)==1) {big_pole[i+1] = big_pole[i];big_pole[i] = 0;}
			}
		}
		//console.log(count);
		}
		button_inputRight.onclick = ()=>{
		for(i=1023;i>=0;i--)
		{
			if (big_pole[i] != 0) {
				if (zone1dvig(i)) {big_pole[i+1] = big_pole[i];big_pole[i] = 0;/*continue*/}
				//if (zone2(i)) {big_pole[i-32] = big_pole[i];big_pole[i] = 0;console.log(big_pole);}
				if (zone3dvig(i)) {big_pole[i+32] = big_pole[i];big_pole[i] = 0}
				//if (zone4(i)) {big_pole[i+1] = big_pole[i];big_pole[i] = 0}
			}
		}
		for(i=0;i<=1023;i++)
		{
			if (big_pole[i] != 0) {
				if (zone2dvig(i)) {big_pole[i-32] = big_pole[i];
				big_pole[i] = 0;console.log(big_pole);}
				if (zone4dvig(i)) {big_pole[i-1] = big_pole[i];big_pole[i] = 0;}
			}
		}
		}
		
		button_inputRot.onclick = ()=>{
			let bom= [];

			for(z=0;z<=1023;z++){
				if (big_pole[z]>5) {
					bom[0]=big_pole[z-32-1];
					bom[1]=big_pole[z-32];
					bom[2]=big_pole[z-32+1];
					bom[3]=big_pole[z-1];
					bom[4]=big_pole[z+1];
					bom[5]=big_pole[z+32-1];
					bom[6]=big_pole[z+32];
					bom[7]=big_pole[z+32+1];
					big_pole[z-32-1]=bom[2];
					big_pole[z-32]=bom[4];
					big_pole[z-32+1]=bom[7];
					big_pole[z-1]=bom[1];
					big_pole[z+1]=bom[6];
					big_pole[z+32-1]=bom[0];
					big_pole[z+32]=bom[3];
					big_pole[z+32+1]=bom[5];
					break;
				}
			}
		}

		button_inputDown.onclick = ()=>{
			let h=0;
			let k = 0;
			let r = 0;
			let fagg=1;
			let q = 0;
			let z = 0;
			let min = 0;
			let min_itog=100;
			let count = 0;
			let count2=0;
			for(z = 0;z < 1024;z++){
				if (big_pole[z]>=100) {big_pole[z]=0;}
				if (big_pole[z]>5 && big_pole[z]<100) {big_pole[z]=big_pole[z]/6;}
				}
			/*for(z = 0;z < 1024;z++){
				if (zone1(z) && big_pole[z]!=0 ){
					predzone =1;
					break;
				}
				if (zone2(z) && big_pole[z]!=0 ){
					predzone =2;
					break;
				}
				if (zone3(z) && big_pole[z]!=0 ){
					predzone =3;
					break;
				}
				if (zone4(z)  && big_pole[z]!=0 ){
					predzone =4;
					break;
				}
			}*/
			if (predzone==1)
			{

				for(k=7;k>=0;k--)
				{
					if (proverka1(k)==0) {continue;}
					min=9999;
					for(q=0;q<=19;q++)
					{
						if (fagg == 1 && big_pole[12+k+32*q]!=0) {fagg=0}
						if (fagg == 0 && big_pole[12+k+32*q]==0) {if(min==9999){min=0};min++}
						if (fagg == 0 && big_pole[12+k+32*q]!=0 && /*zone0(12+k+32*q)==1*/q>2 ){fagg=1;break;}
						if (fagg == 0 && big_pole[12+k+32*q]!=0 && /*zone0(12+k+32*q)==1*/q>2) {break;fagg=1;}

						count++;
						if (fagg == 1 && count == 20) {min=900}
						if (proverka1(k)==0) {min=500}
					}
				if (h ==1) {min_itog=0; break;}
					if (min<min_itog) {min_itog=min;min=0}
					//min=0;
					fagg=1;
					count =0;
				}
				console.log(min_itog);
				if(min_itog<3){
					finishflag=1;
				}
				for(z=1023;z>=0;z--)
				{
					if (zone1dvig(z)) {
						if(big_pole[z]!=0)
						{
							big_pole[z+32*(min_itog)]=big_pole[z];
							big_pole[z]=0;
						}
					}
				}
			}
			

			if (predzone==4)
			{

				for(k=7;k>=0;k--)
				{
					min=9999;
					for(q=19;q>=0;q--)
					{
						if (fagg == 1 && big_pole[12+k+32*q+32*12]!=0) {fagg=0}
						if (fagg == 0 && big_pole[12+k+32*q+32*12]==0) {if(min==9999){min=0};min++}
						if (fagg == 0 && big_pole[12+k+32*q+32*12]!=0 && /*zone0(12+k+32*q+32*12)==1*/q<17) {break;fagg=1;}
						count++;
						if (fagg == 1 && count == 20) {min=900}
						if (proverka4(k)==0) {min=500}
					}
					if (min<min_itog) {min_itog=min;min=0}
					min=0;
					fagg=1;
					count =0;
				}
				console.log(min_itog);
				if(min_itog==0){
					finishflag=1;
				}
				for(z=0;z<=1023;z++)
				{
					if (zone4dvig(z)) {
						if(big_pole[z]!=0)
						{
							big_pole[z-32*(min_itog)]=big_pole[z];
							big_pole[z]=0;
						}
					}
				}
			}

			if (predzone==2)
			{

				for(q=0;q<=7;q++)
				{
					min=9999;
					for(k=0;k<=19;k++)
					{
						if (fagg == 1 && big_pole[k+32*q+32*12]!=0) {fagg=0}
						if (fagg == 0 && big_pole[k+32*q+32*12]==0) {if(min==9999){min=0};min++}
						if (fagg == 0 && big_pole[k+32*q+32*12]!=0 && /*zone0(k+32*q+32*12)==1*/k>2) {break;fagg=1;}
						count++;
						if (fagg == 1 && count == 20) {min=900}
						if (proverka2(q)==0) {min=500}
					}
					if (min<min_itog) {min_itog=min;min=0}
					min=0;
					fagg=1;
					count =0;
				}
				console.log(min_itog);
				if(min_itog==0){
					finishflag=1;
				}
				for(z=1023;z>=0;z--)
				{
					if (zone2dvig(z)) {
						if(big_pole[z]!=0)
						{
							big_pole[z+(min_itog)]=big_pole[z];
							big_pole[z]=0;
						}
					}
				}
			}

			if (predzone==3)
			{

				for(q=0;q<=7;q++)
				{
					min=9999;
					for(k=19;k>=0;k--)
					{
						if (fagg == 1 && big_pole[12+k+32*q+32*12]!=0) {fagg=0}
						if (fagg == 0 && big_pole[12+k+32*q+32*12]==0) {if(min==9999){min=0};min++}
						if (fagg == 0 && big_pole[12+k+32*q+32*12]!=0 && /*zone0(12+k+32*q+32*12)==1*/k<17) {break;fagg=1;}
						count++;
						if (fagg == 1 && count == 20) {min=900}
						if (proverka3(q)==0) {min=500}
					}
					if (min<min_itog) {min_itog=min;min=0}
					min=0;
					fagg=1;
					count =0;
				}
				console.log(min_itog);
				if(min_itog==0){
					finishflag=1;
				}
				for(z=0;z<=1023;z++)
				{
					if (zone3dvig(z)) {
						if(big_pole[z]!=0)
						{
							big_pole[z-(min_itog)]=big_pole[z];
							big_pole[z]=0;
						}
					}
				}
			}

			flag=0;

			if (predzone==1) {
				for(q=0;q<=19;q++)
				{
					for(k=7;k>=0;k--)
					{
						if (big_pole[12+k+32*q]!=0 /*&& zone0(12+k+32*q)*/) {count2++;}
					}
					if (count2 == 8) {
						for(r=q;r>=1;r--)
						{
							for(k=7;k>=0;k--)
							{
								big_pole[12+k+32*(r)]=big_pole[12+k+32*(r-1)];
								big_pole[12+k+32*(r-1)]=0;
							}
						}
					}
					count2=0;
				}
			}

			if (predzone==4) {
				for(q=0;q<=19;q++)
				{
					for(k=7;k>=0;k--)
					{
						if (big_pole[12+k+32*q+32*12]!=0 /*&& zone0(12+k+32*q+32*12)*/) {count2++;}
					}
					if (count2 == 8) {
						for(r=q;r<=18;r++)
						{
							for(k=7;k>=0;k--)
							{
								big_pole[12+k+32*(r)+32*12]=big_pole[12+k+32*(r+1)+32*12];
								big_pole[12+k+32*(r+1)+32*12]=0;
							}
						}
					}
					count2=0;
				}
			}

			if (predzone==2) {
				for(q=19;q>=0;q--)
				{
					for(k=7;k>=0;k--)
					{
						if (big_pole[q+32*k+32*12]!=0 /*&& zone0(q+32*k+32*12)*/) {count2++;}
					}
					if (count2 == 8) {
						for(r=q;r>=1;r--)
						{
							for(k=7;k>=0;k--)
							{
								big_pole[r+32*(k)+32*12]=big_pole[r-1+32*(k)+32*12];
								big_pole[r-1+32*(k)+32*12]=0;
							}
						}
					}
					count2=0;
				}
			}

			if (predzone==3) {
				for(q=0;q<=19;q++)
				{
					for(k=7;k>=0;k--)
					{
						if (big_pole[12+q+32*k+32*12]!=0 /*&& zone0(12+q+32*k+32*12)*/) {count2++;}
					}
					if (count2 == 8) {
						for(r=q;r<=18;r++)
						{
							for(k=7;k>=0;k--)
							{
								big_pole[12+r+32*(k)+32*12]=big_pole[12+r+1+32*(k)+32*12];
								big_pole[12+r+1+32*(k)+32*12]=0;
							}
						}
					}
					count2=0;
				}
			}

			for(q=0;q<=19;q++)
				{
					for(k=7;k>=0;k--)
					{
						if (big_pole[12+k+32*q]!=0 /*&& zone0(12+k+32*q)*/) {count2++;}
					}
					if (count2 == 8) {
						for(r=q;r>=1;r--)
						{
							for(k=7;k>=0;k--)
							{
								big_pole[12+k+32*(r)]=0;
							}
							break;
						}
					}
					count2=0;
				}
			for(q=0;q<=19;q++)
				{
					for(k=7;k>=0;k--)
					{
						if (big_pole[12+k+32*q+32*12]!=0 /*&& zone0(12+k+32*q+32*12)*/) {count2++;}
					}
					if (count2 == 8) {
						for(r=q;r<=18;r++)
						{
							for(k=7;k>=0;k--)
							{
								big_pole[12+k+32*(r)+32*12]=0;
							}
							break;
						}
					}
					count2=0;
				}
				for(q=19;q>=0;q--)
				{
					for(k=7;k>=0;k--)
					{
						if (big_pole[q+32*k+32*12]!=0 /*&& zone0(q+32*k+32*12)*/) {count2++;}
					}
					if (count2 == 8) {
						for(r=q;r>=1;r--)
						{
							for(k=7;k>=0;k--)
							{
								big_pole[r+32*(k)+32*12]=0;
							}
							break;
						}
					}
					count2=0;
				}
				for(q=0;q<=19;q++)
				{
					for(k=7;k>=0;k--)
					{
						if (big_pole[12+q+32*k+32*12]!=0 /*&& zone0(12+q+32*k+32*12)*/) {count2++;}
					}
					if (count2 == 8) {
						for(r=q;r<=18;r++)
						{
							for(k=7;k>=0;k--)
							{
								big_pole[12+r+32*(k)+32*12]=0;
							}
							break;
						}
					}
					count2=0;
				}
		}

		for(i=0;i<12;i++)
		{
			/*переход 1*/
			if(big_pole[11+32*i]!=0){
				big_pole[32*12+i]=big_pole[11+32*i];
				big_pole[11+32*i] = 0;
				console.log(big_pole);
				/*continue;*/
			}
			if(big_pole[32*11+i]!=0){
				big_pole[12+32*i]=big_pole[32*11+i];
				big_pole[32*11+i] = 0;
			}
		}
		for(i=11;i>=0;i--)
		{
			
			if(big_pole[32*20+11-i]!=0){
				big_pole[12+32*20+32*i]=big_pole[32*20+11-i];
				big_pole[32*20+11-i] = 0;
			}
			if(big_pole[11+32*20+32*i]!=0){
				big_pole[32*19+11-i]=big_pole[11+32*20+32*i];
				big_pole[11+32*20+32*i] = 0;
			}
		}
		for(i=0;i<12;i++)
		{
			/*переход 1*/
			if(big_pole[20+32*i+32*20]!=0){
				big_pole[32*19+i+20]=big_pole[20+32*i+32*20];
				big_pole[20+32*i+32*20] = 0;
				console.log(big_pole);
				/*continue;*/
			}
			if(big_pole[32*20+i+20]!=0){
				big_pole[19+32*i+32*20]=big_pole[32*20+i+20];
				big_pole[32*20+i+20] = 0;
				console.log(big_pole);
				/*continue;*/
			}
		}
		for(i=0;i<12;i++)
		{
			
			if(big_pole[20+i+32*11]!=0){
				big_pole[32*(11-i)+19]=big_pole[20+i+32*11];
				big_pole[20+i+32*11] = 0;
				console.log(big_pole);
			}
			if(big_pole[32*(11-i)+20]!=0){
				big_pole[20+i+32*12]=big_pole[32*(11-i)+20];
				big_pole[32*(11-i)+20] = 0;
				console.log(big_pole);
			}
		}
		/*console.log(big_pole);*/
	}

	if(flag == 0)
	{
	let n = getRandomInt(1,1);
	let sled_figure = getRandomInt(1,7);
	let color = getRandomInt(1,5);
	let figure = [9]
	switch(sled_figure){
		case 1 : 
			figure[1]=1;
			figure[2]=1;
			figure[3]=1;
			figure[4]=0;
			figure[5]=100;
			figure[6]=1;
			figure[7]=0;
			figure[8]=0;
			figure[9]=0;
			break;
		case 2 : 
			figure[1]=1;
			figure[2]=1;
			figure[3]=1;
			figure[4]=0;
			figure[5]=6;
			figure[6]=0;
			figure[7]=0;
			figure[8]=0;
			figure[9]=0;
			break;
		case 3 : 
			figure[1]=1;
			figure[2]=1;
			figure[3]=0;
			figure[4]=1;
			figure[5]=6;
			figure[6]=0;
			figure[7]=0;
			figure[8]=0;
			figure[9]=0;
			break;
		case 4 : 
			figure[1]=0;
			figure[2]=0;
			figure[3]=1;
			figure[4]=0;
			figure[5]=100;
			figure[6]=1;
			figure[7]=0;
			figure[8]=0;
			figure[9]=1;
			break;
		case 5 : 
			figure[1]=1;
			figure[2]=1;
			figure[3]=0;
			figure[4]=1;
			figure[5]=100;
			figure[6]=0;
			figure[7]=0;
			figure[8]=0;
			figure[9]=0;
			break;
		case 6 : 
			figure[1]=0;
			figure[2]=0;
			figure[3]=0;
			figure[4]=1;
			figure[5]=100;
			figure[6]=0;
			figure[7]=1;
			figure[8]=1;
			figure[9]=1;
			break;
		case 7 : 
			figure[1]=0;
			figure[2]=0;
			figure[3]=1;
			figure[4]=0;
			figure[5]=100;
			figure[6]=0;
			figure[7]=1;
			figure[8]=1;
			figure[9]=1;
			break;
		}
	switch(n){
		case 1 :
				for (i=0;i<96;i++)
					verx[i] = 0;
				/*verx[4] = figure[1]*color;
				verx[5] = figure[2]*color;
				verx[6] = figure[3]*color;
				verx[12] = figure[4]*color;
				verx[13] = figure[5]*color;
				verx[14] = figure[6]*color;
				verx[20] = figure[7]*color;
				verx[21] = figure[8]*color;
				verx[22] = figure[9]*color;*/
				/*for (var i =0; i < 1024; i++) {
					//if (big_pole[i]!=0) {continue;}
					big_pole[i]=0;
				}*/
				big_pole[12+4] =color*figure[1];
				big_pole[12+5] =color*figure[2];
				big_pole[12+6] =color*figure[3];
				big_pole[36+12]=color*figure[4];
				big_pole[36+13]=color*figure[5];
				big_pole[36+14]=color*figure[6];
				big_pole[60+20]=color*figure[7];
				big_pole[60+21]=color*figure[8];
				big_pole[60+22]=color*figure[9];
				flag = 1;
			break;
		}
	}
}

	function render(){	
		ctx.clearRect(0,0,w,h);

		
		if(finishflag==1){
			//ctx.strokeRect(w/4, h/4, w/2, h/2);
			ctx.fillStyle=`rgb(${255},${0},${0})`;
			ctx.font = "48px serif";
  		ctx.fillText(" END", w/2.5, w/2);
		}
		if (finishflag==0) {
		ctx.strokeRect(w/4, h/4, w/2, h/2);
		probrazovanie();
		render_polya();
		render_verx();
		render_levo();
		render_nis();
		render_pravo();
		ctx.beginPath(); 
		ctx.strokeStyle = `rgb(${255},${0},${0})`
		ctx.lineWidth=4;
    ctx.moveTo(3/12*1/4*w+1,3/12*1/4*w-1);
    ctx.lineTo(w-3/12*1/4*w-1,3/12*1/4*w+1);
    ctx.lineTo(w-3/12*1/4*w-1,w-3/12*1/4*w-1);
    ctx.lineTo(3/12*1/4*w+1,w-3/12*1/4*w-1);
    ctx.lineTo(3/12*1/4*w+1,3/12*1/4*w-1);
    //ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = `rgb(${0},${0},${0})`
    ctx.lineWidth=2;
    ctx.closePath();
    		}
		//console.log(verx);
		
	}

	/*for (var i = 0; i < 96; i++) {
			pole[i] = 0;
	}*/
	/*for (var i = 0; i < 96; i++) {
		verx[i] = 0;
		nis[i] = 0;
		pravo[i] = 0;
		levo[i] = 0;
	}*/
	let flag0 = 1;
	let count = 0;
	button_inputGO.onclick = ()=>{
			
			program = setInterval(()=>{if(finishflag ==0){ update()};render();}, 10);
	
			//clearInterval(program);
	}
	button_inputSTOP.onclick = ()=>{
			finishflag=1;
			//clearInterval(program);
	}
	//update();
//render();
	console.log("aboba");
}