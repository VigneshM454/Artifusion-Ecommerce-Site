
export function show(){
    const prodbtn=document.querySelectorAll('.prodbtn');
    prodbtn.forEach((pb,i)=>{
    pb.addEventListener('click',()=>{
        event.preventDefault();
        let id=pb.id
        console.log("hi");
       // alert('hi')
        //alert(id)
            let prodarr=proddata.map((pb)=>{if (pb.productid==id) {
            console.log(pb);
            const encode=encodeURIComponent(JSON.stringify(pb));
            console.log(encode);
            window.location.href=`buyer/product?data=${encode}`;
                //return (pb)
        }})
    })
  })
  
}

/*
products.forEach((e,i)=>{
    if(e.new===true && newprod.length<10){
        newprod.push(e)
    }
    if(e.discounts==true && disprod.length<10){
        disprod.push(e)
    }
    if(e.category=='fur'){
        furprod.push(e)
    }
    else if(e.category=='pot'){
       potprod.push(e) 
    }
    else if(e.category=='toy'){
        toyprod.push(e)
    }
    else if(e.category=='decor'){
        decorprod.push(e)
    }
    else if(e.category=='jwl'){
        jwlprod.push(e)
    }
    else {//art
        artpod.push(e)
    }
    
})
*/
export function createElem(parent,dataarr){
    
    dataarr.forEach((e,i)=>{
        const prod=document.createElement("div");
        const imgdiv=document.createElement("div");
        const img=document.createElement("img")
        const spn=document.createElement('span')
        const prodname=document.createElement("h5")
        const prodprice=document.createElement("p");
        const prodetail1=document.createElement("div");    
        const btn=document.createElement("button")
        img.setAttribute('src',e.prodimg1)
    /*    if(e.new==true){
            spn.innerHTML="New";
            spn.classList.add('badge','bg-success', 'position-absolute', 'left-0', 'p-1')
            imgdiv.append(spn)
        }*/
        imgdiv.append(img);
        imgdiv.classList.add('col', 'd-flex' ,'flex-column');
        
        prodname.innerText=e.prodname;
        prodprice.innerHTML=`<b>${e.prodprice}</b>` ;
       // prodprice.classList.add('text-bold')
        btn.innerHTML="View Product";
        btn.classList.add('prodbtn','btn','btn-secondary','w-100');
        btn.id=e.productid;
        prodetail1.append(prodname,prodprice,btn);
        prod.append(imgdiv,prodetail1);
        prod.classList.add('prod','border', 'd-flex', 'flex-column' ,'justify-content-center' ,'p-2', 'col-9'  ,'col-md-3' ,'col-lg-3','col-xl-2')    
        parent.appendChild(prod);
    })
  
  } 

//export {show,createElem}