const wishtable=document.querySelector('#wishtable')
const params=new URLSearchParams(window.location.search);
const encodeddata=params.get('data');
let data;
let dataarr=[];
//        <td>In Stock</td>
let demotxt="hacky"
function addcartfn(i){
    console.log(i);
    var id={'productid':i}

    fetch(`${window.origin}/artifusion/buyer/prod/cart`,{
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
            alert('added to cart successfully')
            location.reload()
            
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

    }

function removefn(i){
    var id={"productid":i}
    fetch(`${window.origin}/artifusion/buyer/wishlist/remove`,{
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
            alert('removed from wishlist  successfully')
            location.reload()
            
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
}

window.onload=()=>{
  //location.reload()
    fetch(`${window.origin}/artifusion/buyer/wishlist`,{
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
            let data123=data.js
            //console.log(data)
            if(data123){
                data=JSON.parse(data123)
                data.forEach((d,i)=>{
                    const tr=document.createElement('tr')
                    const trinside=`
                        <td>${i+1}</td>
                        <td><img src="${d.prodimg1}" alt="" height="50px" width="50px" style="border:2px solid black; border-radius:10px"></td>
                        <td>${d.prodname}</td>
                        <td>${'₹'+d.prodprice}</td>
                        <td>
                            <div class=" ">
                                <button id="addcart-${d.productid}" onclick="addcartfn(${d.productid})" class=" btn btn-success col-12 m-1 col-md-5 col-lg-5 h-100 btn1 p-md-2  p-lg-2">Add_Cart</button>    
                                <button id="remove-${d.productid}" onclick="removefn(${d.productid})" class=" btn btn-success col-12 m-1 col-md-5 col-lg-5 h-100 p-md-2 p-lg-2  btn1">Remove</button>        
                            </div>
                        </td>   
                    `
                    tr.innerHTML=trinside;
                    tr.classList.add("btn1")
                    tr.id=d.productid
                    wishtable.append(tr)    
                })
              //  dataarr.push(data)
            }else{
              alert('data not receveid');
            }
            
        }
        else if(data.status_code==500){
          wishtable.innerHTML=`
          <div class="bg-primary p-3 h1 bg-dark text-warning"> Wishlist is empty!</div>
          `
        }
        else if(data.status_code==300){
         alert('the product is already in cart or wishlist')
       }
   
        else if(data.status_code==454){
          //alert('some error has occured'+data.status_code)
          wishtable.innerHTML=`<h1>YOU have no products in your wishlit</h1>`
        }
      })
      .catch(error=>{
         alert("error da ")
      })
}

