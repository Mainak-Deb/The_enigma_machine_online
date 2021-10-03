let o="",r="",p="",t="";


function Enigma_code(txt,orientation,rotor,plug_board){
    let rotor_box=[[],[],[]]
    let rotor_i=[21, 5, 9, 18, 14, 11, 0, 15, 23, 3, 1, 16, 22, 20, 17, 7, 4, 6, 8, 25, 13, 10, 24, 19, 2, 12];
    let rotor_ii=[23, 8, 14, 17, 25, 2, 15, 11, 22, 16, 10, 9, 12, 21, 3, 19, 6, 13, 5, 4, 18, 1, 24, 20, 7, 0];
    let rotor_iii=[3, 19, 13, 24, 20, 15, 10, 18, 12, 7, 17, 8, 22, 23, 21, 6, 14, 4, 5, 0, 11, 1, 16, 2, 25, 9];
    let rotor_123=[rotor_i,rotor_ii,rotor_iii];
    let reflector=[19, 20, 25, 15, 24, 18, 22, 13, 16, 21, 23, 14, 17, 7, 11, 3, 8, 12, 5, 0, 1, 9, 6, 10, 4, 2]
    cipher_text=""
    meter=[0,0,0]

    for(let i=0;i<rotor_box.length;i++){
        console.log(i,orientation[i])
        rotor_box[i]=rotor_123[orientation[i]]
    }

    function arrayRotate(arr) {
        arr.unshift(arr.pop());
        return arr;
    }

    function control_meter(){
        rotor_box[0]=arrayRotate(rotor_box[0]);meter[0]++;
        if(meter[0]>25){
            rotor_box[1]=arrayRotate(rotor_box[1]);meter[1]++;meter[0]=0;
        }
        if(meter[1]>25){
            rotor_box[2]=arrayRotate(rotor_box[2]);meter[2]++;meter[1]=0;
        }

    }

    for(let i=0;i<3;i++){
        while(rotor_box[i][0]!=rotor[i]){
            rotor_box[i]=arrayRotate(rotor_box[i]);
        }
    }

    console.log(rotor_box)
    console.log(txt,txt.length)
    for(let i=0;i<txt.length;i++){
        //step 1
        if(txt[i]!=' '){

            console.log(i,txt[i],to_ascii(txt[i]))
            let s_input=to_ascii(txt[i]);console.log("s_input",s_input)
            let s1=rotor_box[0][s_input];console.log("s1",s1)
            let s2=rotor_box[1][s1];console.log("s2",s2)
            let s3=rotor_box[2][s2];console.log("s3",s3)

            let r=reflector[s3]

            let r1=rotor_box[2].indexOf(r);console.log("r1",r1);
            let r2=rotor_box[1].indexOf(r1);console.log("r2",r2);
            let r3=rotor_box[0].indexOf(r2);console.log("r3",r3);

            let charval=String.fromCharCode(65+r3)

            cipher_text=cipher_text+charval;

            control_meter()
            console.log(meter)
        }else{
            cipher_text=cipher_text+' ';
        }

    }
    console.log(cipher_text)
    return cipher_text;

}

function to_int(n){
    return parseInt(n)-1;
}

function to_ascii(n){
    return parseInt(n.toUpperCase().charCodeAt(0))-65;
}

function copy_to_clipboard(){
  var copyText = document.getElementById("cipher");
  copyText.select();
  copyText.setSelectionRange(0, 99999); 
  navigator.clipboard.writeText(copyText.value);
  alert("Copied the text: " + copyText.value);
}
  

function takeinput(){       
    o=document.getElementById("orientation").value.split("")
    r=document.getElementById("rotate").value.toUpperCase().split("")
    p=document.getElementById("plugboard").value.toUpperCase().split(" ")
    t=document.getElementById("txt").value.toUpperCase().trim()
   

    o=o.map(to_int);
    r=r.map(to_ascii)

    if(o.length==0){o=[0,1,2];document.getElementById("orientation").value="123"}
    if(r.length==0){r=[0,1,2];document.getElementById("rotate").value="ABC"}

   


    console.log(document.getElementById("cipher"))
    console.log(o,r,p)
    console.log(o.length,r.length,p.length)
    let ans=Enigma_code(t,o,r,p);
    document.getElementById("cipher").value=ans;

}

