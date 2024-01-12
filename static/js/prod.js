
const dynprod=document.getElementById('dynprod');
const params=new URLSearchParams(window.location.search);
const encodeddata=params.get('data');
console.log(encodeddata);
let data;
let data1;
const prodqt=document.getElementById('qt')
const qtymax=document.getElementById('qty-max').value;

function add_prod(){
  let i=parseInt(prodqt.textContent);
  if(i<parseInt(qtymax)){
    i++;
    prodqt.innerText=i;   
  }
}
function sub_prod(){
  let i=parseInt(prodqt.textContent);
  if(i>1){
    i--;
    prodqt.innerText=i; 
  }     
}
let prodname =document.getElementById('prodname').textContent;
let prodprice =document.getElementById('prodprice').value;
let prodimg1 =document.getElementById('img1').src;
let prodid=document.getElementById('prod-id').value
const pb={
  'productid':prodid,
  'prodname':prodname,
  'prodprice':prodprice,
  'qtyavail':qtymax,
  'prodimg1':prodimg1,
}


const addcart=document.getElementById('addcart')
const buynow=document.getElementById('buynow')
const wish=document.getElementById('addwish')
        
addcart.addEventListener('click',()=>{
   event.preventDefault();
   alert('add to cart')
   //console.log(data);
  fetch(`${window.origin}/artifusion/buyer/prod/cart`,{
    method:"POST",
    headers:{
      "content-Type":"application/json",
    },
    body:JSON.stringify(pb),
  })
  .then(response=>response.json())
  .then(data=>{
    if(data.status_code==200){
      alert('added to cart successfully')
      window.location.href='/artifusion/buyer/'

    }
    else if(data.status_code==300){
      alert('the product is already in cart')
    }
    else{
      alert('some error has occured'+data.status_code)
    } 
  })
  .catch(error=>{
     alert("error da ")
  })
 })

  wish.addEventListener('click',()=>{
    event.preventDefault();
    alert('add to wishlist')
    console.log(pb);
   fetch(`${window.origin}/artifusion/buyer/prod/wish`,{
     method:"POST",
     headers:{
       "content-Type":"application/json",
     },
     body:JSON.stringify(pb),
   })
   .then(response=>response.json())
   .then(data=>{
     if(data.status_code==200){
      
       alert('added to wishlist successfully')
       window.location.href='/artifusion/buyer/'
     }
     else if(data.status_code==300){
      alert('the product is already in cart or wishlist')
    }
    else{
       alert('some error has occured'+data.status_code)
     }
   })
   .catch(error=>{
      alert("error da ")
   })
     // window.location.href=`wishlist?data=${encodeddata}`;
  })
  buynow.addEventListener('click',()=>{
    event.preventDefault();
    pb['orderqty']=parseInt(prodqt.textContent);

    let encodeddata1=encodeURIComponent(JSON.stringify(pb));
    alert('checkout ')
    
   console.log(pb);
   const encode=encodeURIComponent(JSON.stringify(pb));

   window.location.href=`/artifusion/buyer/checkout?data=${encodeddata1}`;

  })

  console.log(qtymax); 