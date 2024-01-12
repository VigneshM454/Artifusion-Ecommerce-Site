const imgdivs = document.getElementById('imgdivs');
const imgip = document.getElementById('imageips');
const addnewprod=document.getElementById('addnewprod')
const addnew=document.getElementById('addnew')
let srcarr = [];
let tot_prod_listed=0;
let tot_prod_sold=0
const prodlisted=document.getElementById('prodlisted')
const prodsold=document.getElementById('prodsold')
console.log(window.origin)
imgip.addEventListener('change', () => {
    while (imgdivs.hasChildNodes()) {
        imgdivs.removeChild(imgdivs.firstChild);
      }    
     if (imgip.files && imgip.files.length <= 3) {
        for (let i = 0; i < imgip.files.length; i++) {
            
            if (imgip.files[i]) {
                const reader = new FileReader();
                reader.onload = (function (index) {
                    return function (e) {
                        const img = document.createElement('img');
                        img.id = 'imgup' + index;
                        img.src = e.target.result;
                        srcarr.push(img.src);
                        img.style.width = '70px';
                        img.style.height = '70px';
                        imgdivs.appendChild(img);
                    };
                })(i);

                reader.readAsDataURL(imgip.files[i]);
            }
        }
    } else {
        alert('Upload at most 3 images only');
    }
    console.log(srcarr);

});
const prodname=document.getElementById('name')
const prodprice=document.getElementById('price')
const prodqty=document.getElementById('qty')
const proddesc=document.getElementById('proddesc')
const prodcatg=document.querySelectorAll('.checkboxgrp');

const sppar=document.getElementById('sppar')
window.onload=()=>{
    a='hi'
    fetch(`${window.origin}/artifusion/seller/products`,{
        method:'POST',
        headers:{
            'content-Type':'application/json',
        },
        body:JSON.stringify(a),
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.status_code==200){
            //window.location.href='/artifusion/seller/products'
//            console.log(data.js);
            proddata= JSON.parse(data.js)
            console.log(proddata.length);
            if(proddata.length==0){
                alert('You have not yet started selling')
                prodlisted.textContent=0;
                prodsold.textContent=0
            }
            else{
                        //    console.log(proddata[1]['prodname']);
                proddata.forEach((e,i)=>{
                    console.log(e);
                    tot_prod_listed+=e['qtyavail']
                    const prodcont=document.createElement('div');
                    prodcont.style.cssText=" border-radius:50px;"
                    prodcont.classList.add('col-8','prodcont','col-sm-6', 'col-md-5', 'sp' ,'col-lg-3', 'border', 'border-dark', 'border-2', 'd-flex', 'flex-column','gap-3', 'py-2')
                    const prods=`
                        <div id=${e['productid']} class="prodsda" style="width:300px;">
                            <div class="row">
                                <img src=${e['prodimg1']}  alt="" width="100" height="300" style="height: 40vh; border-radius:20%">
                            </div>
                            <br>
                            <div class="row d-flex">
                                <div class="col-4">
                                    <p>Prod_Name</p>
                                    <p>Prod_Price</p>
                                    <p>Prod_qnty</p>
                                    <p>Prod_Desc</p>
                                </div>
                                <div class="col-8">
                                    <p><b>${e['prodname']}</b></p>
                                    <p><b>${'₹'+e['prodprice']}</b></p>
                                    <p><b>${e['qtyavail']}</b></p>
                                    <p><b>${e['proddesc']}</b></p>
                                </div>
                            </div>
                            <div class="row gap-5 px-4" style="margin-bottom:20px;">
                                <button class="col btn btn-success">Add More</button>
                                <button class="col btn btn-primary">Edit</button>
                            </div>
                        </div>
                    
                    `
                    prodcont.innerHTML=prods
                //   sppar.append(prodcont)
                    sppar.insertBefore(prodcont,addnew)
                })
             //   console.log(tot_prod_listed);
                prodlisted.textContent=tot_prod_listed
                prodsold.textContent=tot_prod_sold
            }
        }
        else if(data.status_code==404){
            alert('the json data is not received has some problem')
            window.location.href='/artifusion/seller/products'
        }
        else{
            alert('server prolem')
            window.location.href='/artifusion/seller/products'
        }
    })  
    .catch(error=>{

    })      
}

addnewprod.addEventListener('submit',()=>{
    event.preventDefault()
    const npname=prodname.value;
    const npqty=  parseInt(prodqty.value);
    const npprice=prodprice.value;
    const npdesc=proddesc.value
    const imgarr=srcarr;
    let nprodcat=''
    //let democheck=document.getElementsByTagName('input[checkbox]')
    let categcon=false
    prodcatg.forEach((prod,i)=>{
        if(prod.checked){
            nprodcat=prod.value;
            categcon=true
            //alert(nprodcat)
        }
    })
    alert(nprodcat)

    const newprod={
        pname:npname,
        pqty:npqty,
        pprice:npprice,
        pdesc:npdesc,
        pimgarr:imgarr,
        prodcat:nprodcat
    }
    console.log(newprod);//&& categcon===true
    if(npname!=''&& npdesc!='' && npprice!='' && npqty>0 && imgarr.length>=1 && categcon===true){
        alert('success') 
        alert(srcarr[0])
        console.log(srcarr[0]);
        console.log(newprod);
           
        fetch(`${window.origin}/artifusion/seller/products/create-new`,{
            method:'POST',
            headers:{
                'content-Type':'application/json',
            },
            body:JSON.stringify(newprod),
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.status_code==200){
                //window.location.href='/artifusion/seller/products'
                alert('json recieved')
                location.reload()
            }
            else if(data.status_code==404){
                alert('the json data is not received has some problem')
                window.location.href='/artifusion/seller/products'
            }
            else{
                alert('server prolem')
                window.location.href='/artifusion/seller/products'
            }
        })  
        .catch(error=>{

        })      
    }
    else{
        alert('please fill out the necessary details')
    }
})
