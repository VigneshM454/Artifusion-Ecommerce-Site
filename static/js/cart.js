const wishtable=document.querySelector('#wishtable')
const prodcontain=document.getElementById('products');
const prodcount=document.getElementsByName('prod-count')
const totalprice=document.getElementById('tot-price');
const buyAllbtn=document.getElementById('buyAll')
let data;
let pricearr=[];
let dataarr=[];
//        <td>In Stock</td>
let demotxt="hacky"
function saveForLater(i){
    console.log(i);
    var id={'productid':i}

    fetch(`${window.origin}/artifusion/buyer/cart/later`,{
        method:"POST",
        headers:{
          "content-Type":"application/json",
        },
        body:JSON.stringify(id),
      })
      .then(response=>response.json())
      .then(data=>{
        if(data.status_code==200){
            console.log(data.js);
            alert('saved for later successfully')
            location.reload()
        }
        else{
          alert('some error has occured'+data.status_code)
        }
      })
      .catch(error=>{
         alert("error da ")
      })
}

function deleteItem(i){
    var id={"productid":i}
    fetch(`${window.origin}/artifusion/buyer/cart/remove`,{
        method:"POST",
        headers:{
          "content-Type":"application/json",
        },
        body:JSON.stringify(id),
      })
      .then(response=>response.json())
      .then(data=>{
        if(data.status_code==200){
            console.log(data.js);
            alert('removed from cart successfully')
            location.reload()

        }
        else{
          alert('some error has occured'+data.status_code)
        }
      })
      .catch(error=>{
         alert("error da ")
      })
}

buyAllbtn.addEventListener('click',()=>{

  let reqarr=document.querySelectorAll('.req-qt');
  console.log(reqarr);
  if(reqarr.length==0){
    alert('please add some items to cart to buy');
  }
  let idarr=[];
  let qtarr=[]
  let object={}
  reqarr.forEach((r,i)=>{
    var id= r.id;
    //var b='hackylaxy';
    b=id.slice(2);
    console.log('id = '+id);
    idarr.push(b);
    var specific_qty=getVal(id);
    qtarr.push(specific_qty);
    object[b]=specific_qty
  })
  console.log(idarr);
  console.log(qtarr);
  console.log(object);

  fetch(`${window.origin}/artifusion/buyer/cart/checkout`,{
    method:"POST",
    headers:{
      "content-Type":"application/json",
    },
    body:JSON.stringify(object),
  })

  .then(response=>response.json())
  .then((data)=>{
    
    console.log(data);
    //alert("nan inum vila vilai",data)
    if(data.status_code==200){
        window.location.href='/artifusion/buyer/checkout'        
    }
    else if(data.status_code==404){
     alert('no product is present in cart')
   }

    else{
      alert('some error has occured'+data.status_code)
    }
    
  })
  .catch(error=>{
     
  })

})

function buy(data,id ){
  event.preventDefault();
  var orderqty=getVal(id)
  data['orderqty']=orderqty;
  console.log(data);
  let encodeddata1=encodeURIComponent(JSON.stringify(data));
  alert('checkout '+orderqty)

  window.location.href=`checkout?data=${encodeddata1}`;

   // window.location.href=`wishlist?data=${encodeddata}`;
}
/*
function buy(i){
    var id={"productid":i}
    fetch(`${window.origin}/artifusion/buyer/cart/remove`,{
        method:"POST",
        headers:{
          "content-Type":"application/json",
        },
        body:JSON.stringify(id),
      })
      .then(response=>response.json())
      .then(data=>{
        if(data.status_code==200){
            console.log(data.js);
            alert('removed from cart successfully')
            location.reload()

        }
        else{
          alert('some error has occured'+data.status_code)
        }
      })
      .catch(error=>{
         alert("error da ")
      })
}
*/
function getVal(id){
  var a=document.getElementById(id);
  return parseInt(a.innerText)
}

function add_prod(id,max){
  console.log("addprod pressed");
  var a=document.getElementById(id);
  var q=parseInt(a.innerText);
  if(q<max){
    q++;
    a.innerText=q;
  }
}

function sub_prod(element){
  console.log("subprod pressed")
  var a=document.getElementById(element)
  var q=parseInt(a.innerText);
  if(q>1){
    q--;
    a.innerText=q;
  }
}


function createdropItems(quantity) {
    let dropdownContent = '';
    for (let i = 0; i <= quantity; i++) {
        dropdownContent += `<li><a class="dropdown-item qty-dd" onclick="cartqty(${i})" href="#" id=${i}>${i}</a></li>`;
    }
    return dropdownContent;
}

function cartqty(i){
    const ddbtn=document.getElementById("dropdownMenuButton")
   // alert("hi"+i)
    ddbtn.innerText="Quantity : "+i
}

  
window.onload=()=>{

  fetch(`${window.origin}/artifusion/buyer/cart`,{
      method:"POST",
      headers:{
        "content-Type":"application/json",
      },
      body:JSON.stringify(demotxt),
    })
    .then(response=>response.json())
    .then((data)=>{
      console.log(data);
      if(data.status_code==200){
            alert('Displayed from cart')
            let data123=JSON.parse(data.js)
              console.log(data123);
              
              //alert("lenght: "+ data123.length)
              prodcount.forEach((p)=>{
                p.innerText=data123.length;
              })//
              data123.forEach((d,i)=>{
                
                console.log(d);
                pricearr.push(d.prodprice)
                let product=document.createElement('div');
                let line=document.createElement('hr')
                line.classList.add("text-light")
                product.classList.add("row","mx-0",'my-2')
                product.innerHTML= `
                  <div class="col-12 col-lg-3 col-md-3">
                      <img src="${d.prodimg1}" style="width: 150px; height: 180px; border-radius: 25px;">
                  </div>
                  <div class="col-9 col-lg-9 col-md-9 p-1 d-flex flex-column">
                      <h3>${d.prodname}</h3>
                      <h1>${'₹'+d.prodprice}</h1>

                      <div class="d-flex  ">
                        <h4 >Quantity : </h4> 
                        <div  class="mx-2">
                          <button class="btn btn-light" id="subbtn" onclick="sub_prod('qt${d.productid}' )" >-</button>
                          <span id="qt${d.productid}" class="p-2 req-qt">1</span>
                          <button class="btn btn-light" id="addbtn" onclick="add_prod('qt${d.productid}',${d.qtyavail})" >+</button>
                        </div>    
                      </div>
      
                      <div class="cartopt dropdown col d-flex flex-wrap bg-primary col-lg-8 col-md-10 col-12 gap-1" style="min-width:260px;">
                      
                      <div class="  vlcol"> <div class="vertical-line"></div> </div>
                      <button id="buyBtn" class="btn col btn-primary" onclick='buy( ${JSON.stringify(d)},"qt${d.productid}" )'>Buy</button>
                      <div class=" vlcol"> <div class="vertical-line"></div> </div>
                      <button id="deleteBtn" class="btn col btn-primary" onclick="deleteItem(${d.productid})">Delete</button>
                      <div class=" vlcol"> <div class="vertical-line"></div> </div>
                      <button id="saveBtn" class="btn btn-primary col" onclick="saveForLater(${d.productid})">Save for later</button>
                      <div class=" vlcol"> <div class="vertical-line"></div> </div>
                          
                  </div>
                  
                  </div>`
                let tot=0;
                pricearr.forEach((elem,i)=>{
                  tot+=elem;
                })
                totalprice.innerText='₹'+tot;
             prodcontain.append(product,line)                        
                      
              })
        //  }
          
      }
      else if(data.status_code==500){
        prodcontain.innerHTML=`
        <div class="bg-primary p-3 h1 bg-dark text-warning">Cart is empty!</div>
        `
      }
      else if(data.status_code==404){
       alert('the product is already in cart or wishlist')
     }
 
      else{
        alert('some error has occured'+data.status_code)
      }
    })
    .catch(error=>{
       alert("error da ");
       
    })
}

