const productname=document.getElementById("productname");
const productprice=document.getElementById('productprice');
const changeaddr=document.getElementById("changeaddr");
const addr=document.getElementById('addr');
const bill=document.getElementById('bill')

const subtotal=document.getElementById('subtotal');
const tax=document.getElementById('tax');
const total=document.getElementById('total');

const payform=document.getElementById('form');
payform.style.display='none'
//const placeorder=document.getElementById('placeorder')

const params=new URLSearchParams(window.location.search);
const encodeddata=params.get('data');
let data;
//let dataarr=[];
//prodid, buyerid,shipadd,paymethod,totamt,
//proddetail-> prod name,price(id),quantity
let proddetailarr=[]
let proddetail={} 
let prodidarr=[]
let prodpricearr=[]
//let prodnamearr=[]
let prodqtarr=[]
console.log(encodeddata);
if(encodeddata){
    data=JSON.parse(decodeURIComponent(encodeddata))
    console.log(data);
    //dataarr.push(data)
    const pname=document.createElement('p');
    const pprice=document.createElement('p');
    const prodimage=document.createElement('img')
    const productdiv=document.createElement('div')

    let qty=data.orderqty;
    //proddetail['orderqty']=qty;
    prodqtarr.push(qty)
    prodidarr.push(data.productid)
    //prodnamearr.push(data.productname)
    //proddetail['prodid']=data.productid;
    let price=data.prodprice;
    pname.innerText=data.prodname+` ${'('+price +' x '+ qty +')'}`;
    proddetailarr.push(pname.innerText)
    prodimage.src=data.prodimg1;
    prodimage.style.cssText='height:50px; width:50px; border-radius:10px; border:1px solid black;'
    pprice.innerText='₹'+price*qty;
    pprice.style.cssText='line-height:40px;'
    productdiv.append(prodimage,pname)
    productdiv.classList.add('d-flex','align-items-center','gap-4')
    productname.append(productdiv);
   // productname.append(pname);
    productprice.append(pprice)
    subtotal.innerText='₹'+price*qty;
    tax.innerText='₹'+(price*qty*0.1)
    var x=(price*qty)+(price*qty*0.1)
    total.innerText='₹'+x
    prodpricearr.push(x)
    proddetail['totamt']=x
    proddetail['proddetailarr']=proddetailarr;
    proddetail['prodqtarr']=prodqtarr
    proddetail['prodidarr']=prodidarr
    proddetail['prodpricearr']=prodpricearr
    //proddetailarr.push(proddetail);
}


else{
    let demotxt='hackylazy'
    fetch(`${window.origin}/artifusion/buyer/checkout/123`,{
        method:"POST",
        headers:{
          "content-Type":"application/json",
        },
        body:JSON.stringify(demotxt),
      })
      .then(response=>response.json())
      .then(data=>{
        if(data.status_code==200){
    
           // console.log(data.js);
            alert('product added to checkout page')
            let data123=data.js
            let dataobj=data.object
            let stot=0
            if(data123 && dataobj){
                var datajs1=JSON.parse(data123)
                var dataobj1=JSON.parse(dataobj)
                console.log(datajs1);
                console.log(dataobj1);
                datajs1.forEach((d,i)=>{
                    //dataarr.push(d)
                    const pname=document.createElement('p');
                    const pprice=document.createElement('p');
                    const prodimage=document.createElement('img')
                    const productdiv=document.createElement('div')
                    console.log(data);
                    var qty= parseInt(dataobj1[d.productid]);
                    console.log( qty);
                    var price=d.prodprice;
                    prodqtarr.push(qty)
                    prodidarr.push(d.productid)                
                    console.log(typeof d.prodprice);
                    prodimage.src=d.prodimg1;
                    prodimage.style.cssText='height:50px; width:50px; border-radius:10px; border:1px solid black;'
                    pname.innerText=d.prodname+` ${'('+price +' x '+ qty +')'}`;
                    var pp=price*qty;
                    pprice.innerText='₹'+pp;
                    pprice.style.cssText='line-height:40px;'
                    productdiv.append(prodimage,pname)
                    productdiv.classList.add('d-flex','align-items-center','gap-4')
                    productname.append(productdiv);
                    proddetailarr.push(pname.innerText)
                    productprice.append(pprice)
                    stot+=pp
                    prodpricearr.push(pp+pp*0.1)
                    //pricearr.push(price*qty);
                   // subtotal.innerText=price*qty;
                   // tax.innerText=(price*qty*0.1)
                   // total.innerText=(price*qty)+(price*qty*0.1)
                })
             
                console.log(stot);
                subtotal.innerText='₹'+stot;
                tax.innerText='₹'+(stot*0.1)
                var x=(stot)+(stot*0.1)
                total.innerText='₹'+x
                proddetail['totamt']=x
                proddetail['proddetailarr']=proddetailarr;
                proddetail['prodqtarr']=prodqtarr
                proddetail['prodidarr']=prodidarr
                proddetail['prodpricearr']=prodpricearr
            
              //  dataarr.push(data)
            }else{
              alert('data not receveid');
            }    
        }
        else if(data.status_code==404){
         alert('some thing problem')
        // window.location.href='/artifusion/buyer/cart'
       }
    
        else if(data.status_code==454){
          wishtable.innerHTML=`<h1>YOU have no products in your wishlit</h1>`
        }
      })
      .catch(error=>{
         alert("error da ")
      })
    
}
//console.log(proddetailarr);

function placeorder(){
  console.log('in placeorder');
  let demotxt='hackylazy'
  fetch(`${window.origin}/artifusion/buyer/checkout/buy`,{
      method:"POST",
      headers:{
        "content-Type":"application/json",
      },
      body:JSON.stringify(proddetail),
    })
    .then(response=>response.json())
    .then(data=>{
      if(data.status_code==200){
        alert("your order has been placed")
      }
      else if(data.status_code==404){
       alert('the product is already in cart or wishlist')
       window.location.href='/artifusion/buyer/cart'
     }
  
      else{
        alert('something problem')
      }
    })
    .catch(error=>{
    })

}


const orderbtn=document.getElementById('placeorder');
orderbtn.addEventListener('click',()=>{
    let paynow =document.getElementById('pn');
    let payonDeliv=document.getElementById('pd');
    console.log(addr.textContent);
    var d=new Date()
    //d.setMinutes(d.getMinutes() - currentUtcDatetime.getTimezoneOffset())
    proddetail['ordertime']=d
    proddetail['shipaddr']=addr.textContent
    if(paynow.checked){
        console.log('you are redirected to payment page')
        payform.style.display='flex';
        orderbtn.classList.add('disabled')
        paynow.classList.add('disabled')
        payonDeliv.classList.add('disabled')
        proddetail['paymethod']="payonorder"
    }
    if(payonDeliv.checked){
        payform.style.display='none'
        proddetail['paymethod']="payondelivery"
        console.log('your order has been placed , you can pay when you receive the product')
        placeorder()
        //window.location.href='/artifusion/buyer'
    }
    console.log(proddetail);
    console.log(proddetailarr);
})


changeaddr.addEventListener('click',()=>{
    addr.setAttribute("contenteditable",'true');
    let contedit;
    function createUpdAddr(){
      contedit= document.createElement('button');
      contedit.innerText="Update Address"
      contedit.classList.add('btn' ,'mt-3','btn-success');
      contedit.id='updateaddr';
      bill.append(contedit)  
    }
    document.getElementById('updateaddr') ?{}:createUpdAddr()
    
    let upaddr=document.querySelector('#updateaddr');
    upaddr.addEventListener('click',()=>{
        addr.setAttribute("contenteditable",'false');
        contedit.remove()
    })

})

let v=0;

function validatepay(){
  placeorder()
}
