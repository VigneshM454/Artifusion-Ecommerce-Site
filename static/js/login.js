const buyer=document.getElementById('buy');
const seller=document.getElementById('sell');
const user_sign=document.getElementById('signin-form');
const user_login=document.getElementById('login-form');

const dynamo=document.getElementById('dynamo');
const refer=document.getElementById('refer');
const h2=document.getElementById('h2');
const p=document.getElementById('p');
let id;
//single signin and login form are used for seller ,buyer,admin
buyer.onclick=()=>{
    user_sign.removeChild(dynamo)
    id=1;
    user_login.classList.remove('demo')
    user_sign.classList.remove('demo')
}
seller.onclick=()=>{
    //alert('sell')
   // h2.innerText='Seller Sign-in'
    p.innerText='By continuing, you agree to Our Conditions of Use and Privacy Policy as a Seller'
    user_sign.appendChild(dynamo)
    user_sign.insertBefore(dynamo,refer)
    id=2;
    user_sign.classList.add('demo')
    user_login.classList.add('demo')
}

function proceed(){
    
    if(id==1){
        //window.location.replace("buyer/home")
    }
    else{
        //window.location.replace("seller/home")
    }

}

const fname =user_sign.querySelector('#fname');
const lname=user_sign.querySelector('#lname');
const phone=user_sign.querySelector('#phoneno')
const email=user_sign.querySelector('#email')
const addr=user_sign.querySelector('#addr')
const pwd=user_sign.querySelector('#pwd');
const terms=user_sign.querySelector('#terms')
let checked=false;

let nameregx=/[A-Za-z\s]+/;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let phregx=/^(\+\d{1,3}\s?)?\d{10}$/

let checkbox;
let shop;
shop=user_sign.querySelector('#shop')
checkbox=user_sign.querySelectorAll('input[name="d"]');

if(id==2){//seller
    console.log(checkbox.length);
}
else{//buyre

}

user_sign.addEventListener('submit',()=>{
    event.preventDefault();
    let url1,url2;
    let f=nameregx.test(fname.value)
    let l=nameregx.test(lname.value)
    let p= phregx.test(phone.value)
    let e=emailRegex.test(email.value)  
    let cid=1;//let all category are checked
    
    const data1={
        firstname:fname.value,
        lastname:lname.value,
        phoneno:phone.value,
        emailid:email.value,
        passwd:pwd.value,
        address:addr.value
    }

    let arr=[f,l,p,e]
    let arr2=[fname,lname,phone,email]
    if(id==2){
        let shopvalue=shop.value;
        data1['shop']=shopvalue;
        data1['category']=''
        let charr=[]
        //data1['category']=''
        checkbox.forEach((ch)=>{
            if(ch.checked){
             //  ch=1
             data1['category']=ch.value
            }
            else{
               // ch=0
            }
            charr.push(ch)
        })
    /*    if( data1['category']!=''){

        }*/
    }
    console.log(data1);
    console.log(id);
    /*
    if(!checked){
       // //alert('please select atleast one which matches')
        cid=0
    }*/
    console.log(pwd.value.length);
    let expr=f&&l&&p&&e&&terms.checked&&(pwd.value.length>5);
    console.log(expr)
    if(expr && id==1 ){//buyer
      //alert("welcome"+fname.value)
        
        fetch(`${window.origin}/artifusion/create-user`,{
            method:'POST',
            headers:{
                'content-Type':'application/json',
            },
            body:JSON.stringify(data1),
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.status_code==200){
                window.location.href='/artifusion/buyer'
            }
            else if(data.status_code==404){
                alert('the mail id already exist')
                window.location.href='/artifusion/create-user'
            }
            else{
                alert('server prolem')
                window.location.href='/create-user'
            }
        })  
        .catch(error=>{

        })      
        //proceed();
    }
    else if(expr && shop && data1['category']!=''){
        //seller
        console.log('hi');
        console.log(data1);
      
        fetch(`${window.origin}/artifusion/create-seller`,{
            method:'POST',
            headers:{
                'content-Type':'application/json',
            },
            body:JSON.stringify(data1),
        })
        .then(function(response){
             alert(response.status)
            if(response.status===200){
                response.json().then(function(data){
                    console.log(data);
                    window.location.replace("/artifusion/seller/home")
                })
            }
            else if(response.status==300){
                alert('A similar seller account with same mail id already exist')
                console.log(`REsponse status not 200 : ${response.status}`);
                return response;
            }
            else{
                alert('some problem'+response.status)
                window.location.replace("/artifusion")

            }
        })
        .catch(function(){
            console.log('no response');
        })        
       
    }
    else{
        alert('Please enter necessary inputs')
        for(var i=0;i<arr.length;i++){
            if(arr[i]==false){
                arr2[i].classList.add('border-danger')
            }
            else{
                arr2[i].classList.remove('border-danger')
            }
        }
        //alert('invalid')
    }

})

const email2=user_login.querySelector('#email');
const pwd2=user_login.querySelector('#pwd');

/*
const admins=[
    {
        'mail':'hackylazy454@gmail.com',
        'pass':'password1'
    },
    {
        'mail':'hacky@gmail.com',
        'pass':'password2'
    },
    {
        'mail':'hacky454@gmail.com',
        'pass':'password3'
    }
]
*/
user_login.addEventListener('submit',(event)=>{
    event.preventDefault();
    let count=1;
    var e2=emailRegex.test(email2.value)
    var p2=pwd2.value.length>5;
    if(e2 && p2){
        const testdata1={
            testemail:email2.value,
            testpwd:pwd2.value
        }
        console.log(window.origin);
        fetch(`${window.origin}/artifusion/admintest`,{
            method:'POST',
            headers:{
            'content-Type':'application/json',
            },
            body:JSON.stringify(testdata1),
        })
        .then(response=>response.json())
        .then((data)=>{
        console.log(data.status_code);
        // data=JSON.parse(data)
        if(data.status_code==200){
            alert('success')
            count=0
            window.location.replace('/artifusion/admin/home')
        }
        else{
            count=1;
            
            let url1,url2;
            if(id==1){
                url1='/artifusion/login-user'
                url2='/artifusion/buyer'
            }
            else{
                url1='/artifusion/login-seller'
                url2='/artifusion/seller/home'    
            }
            fetch(`${window.origin}${url1}`,{
                method:'POST',
                headers:{
                    'content-Type':'application/json',
                },
                body:JSON.stringify(testdata1),
            })
            .then(function(response){
                if(response.status!=200){
                    alert('INcorrect Mail id or Password')
                    console.log(`REsponse login  status not 200 : ${response.status}`);
                    return response;
                }
                response.json().then(function(data){
                    console.log(data);
                    window.location.replace(url2)
        
                })
            })
            .catch(function(){
                console.log('no response');
            })        

               
        
        }

        })
    
        .catch((err,data)=>{
            console.log(err);
            console.log(data);
        })        
   console.log('im outside of fetch');
/* const aemail='hackylazy454@gmail.com'
    const apwd='password2'
    var e2=emailRegex.test(email2.value)
    var p2=pwd2.value.length>5;
    if(e2 && p2){
        const testdata1={
            testemail:email2.value,
            testpwd:pwd2.value
        }*/
        if(count===0){
            alert('ethod prodblem')
        }
        if(count===1){}
    /*if(email2.value == aemail && pwd2.value == apwd){
        url1="/artifusion/login-admin"
        url2="/artifusion/admin/home"
    }*/


        
        //alert('welcome back')
       /*
        if(email2.value=='hackylazy454@gmail.com' && pwd2.value=="hackylazy"){
            window.location.replace("admin/home")
        }
        else{
            proceed();
        }
        */
    }
    else{
        //alert('invalid')
    }
})