function get(){
    var x=document.getElementById('x');
    var y=document.getElementById('y');
    var output=document.getElementById('output');
    output.innerHTML=parseInt(x.value)+parseInt(y.value);
}

function generateElem(a,b){
    var aa=document.createElement('label');
    var ab=document.createTextNode('X≡ ');
    var ac=document.createElement('input');
    ac.className="a";
    ac.value=a;

    aa.appendChild(ab);
    aa.appendChild(ac);

    var ba=document.createElement('label');
    var bb=document.createTextNode('mod(');
    var bc=document.createElement('input');
    var bd=document.createTextNode(')');
    bc.className="m";
    bc.value=b;

    ba.appendChild(bb);
    ba.appendChild(bc);
    ba.appendChild(bd);

    var br=document.createElement('br');

    var f=document.getElementById('inp');

    f.appendChild(aa);
    f.appendChild(ba);
    f.appendChild(br);
}

function generate(){
    clearOutput();
    let n=document.getElementById('n').value;

    if(n.length==0){alert("form cannot be empty!");return;}
    if(isNaN(n) || n<=0){alrt(output,"","n must be a positive integer!");return;}

    document.getElementById('inp').innerHTML="";
    let i;
    var a1=[4,1,3,7];
    var m1=[6,5,7,11]
    for(i=0;i<n;i++){
        if(i<4){generateElem(a1[i],m1[i]);}
        else{
            generateElem("","");
        }
    }
}

function gcd(a,b){
	if(b==0)return a;
	return gcd(b,a%b);
}

function check(m){
    let n=m.length,i,j;
    for(i=0;i<n;i++){
        for(j=i+1;j<n;j++){
            if(gcd(m[i],m[j])!=1)return false;
        }
    }
    return true;
}

function clearOutput(){
    document.getElementById("output").innerHTML="";
}

function alrt(elm,txt,message){
    elm.innerHTML=txt+"<div class='warning'>"+message+"</div>";
}

function calculate(){
    clearOutput();
    var aaa=document.getElementsByClassName('a');
    var mmm=document.getElementsByClassName('m');
    var output=document.getElementById('output');
    var txt="";
    var i;

    var a=[];
    var m=[];

    for(i=0;i<aaa.length;i++){
        let sb=""+(i+1);
        sb=sb.sub();
        a[i]=parseInt(aaa[i].value);
        m[i]=parseInt(mmm[i].value);
        txt+="a"+sb+"="+a[i]+",  m"+sb+"="+m[i]+"<br>";
        if(aaa[i].value.length==0 || mmm[i].value.length==0){alrt(output,txt,"form cannot be empty!");return;}
        if(isNaN(a[i]) || isNaN(m[i])){alrt(output,txt,"Please input Integers only!");return;}
        if(m[i]<=0){alrt(output,txt,"all m must be positive integers!");return;}
        if(a[i]<0){alrt(output,txt,"all a must be non negative integers!");return;}
        if(a[i]>=m[i]){alrt(output,txt,"all ai must be less than corresponding mi !");return;}
    }
    txt+="<br>";

    if(!check(m)){
        alrt(output,txt,"all m must be pairwise coprime!");
        return;
    }

    function inv(i,x,mod){
        let a,b,c,d,sb=""+(i+1);
        sb=sb.sub();
        a=parseInt(x/mod);
        b=mod;
        c=x%mod;
        txt+="Y"+sb+'×'+x+" = "+mod+"×k + 1"+"<br>"
        txt+="Y"+sb+'×'+"("+a+"×"+b+' + '+c+") = "+mod+"×k + 1"+"<br>";
        txt+="Y"+sb+'×'+c+" = "+mod+"×k' + 1"+"<br>";
        var k=0;
        while((mod*k+1)%c!=0)k++;
        txt+="Y"+sb+"="+(mod*k+1)+"/"+c+"="+((mod*k+1)/c)+"<br>";
        return (mod*k+1)/c;
    }

    //inv(2,3,7);

    var n=a.length;
	var M=1;
	txt+="M=";
	for(i=0;i<n-1;i++){txt+=m[i]+"×";M*=m[i];}
	M*=m[n-1];
	txt+=m[n-1]+'='+M+'<br>';
	txt+='<br>';////////////////
	var MM=[];
	for(i=0;i<n;i++){
		MM[i]=M/m[i];
        let sb=(""+(i+1)).sub();
		txt+="M"+sb+"="+M+"/"+m[i]+"="+MM[i]+'<br>';
	}
	txt+='<br>';
	var Y=[];
	for(i=0;i<n;i++){
        let sb=(""+(i+1)).sub();
		txt+="Y"+sb+"≡"+MM[i]+"⁻¹ ( mod "+m[i]+" )"+'<br>';
		Y[i]=inv(i,MM[i],m[i]);
		txt+='<br>';
	}
	var X=0;
	txt+="X≡";
	for(i=0;i<n;i++){
        let sb=(""+(i+1)).sub();
		X+=a[i]*MM[i]*Y[i];
		txt+="a"+sb+"M"+sb+"Y"+sb;
		if(i!=n-1)txt+=' + ';
		else{
			txt+="(mod M)<br>";
		}
	}
	txt+="X≡";
	for(i=0;i<n;i++){
		txt+=a[i]+"×"+MM[i]+"×"+Y[i];
		if(i!=n-1)txt+=' + ';
		else{
			txt+="(mod "+M+")<br>";
		}
	}
	txt+="X≡"+X+"(mod "+M+")<br>";
    txt+="X≡"+(X%M)+"(mod "+M+")<br>";
	txt+="X="+M+'×k'+' + '+(X%M)+'<br>';

    output.innerHTML=txt;
}