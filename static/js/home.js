const topsell=document.getElementById('topsell');
const dissell=document.getElementById('dis');
const jwlsell=document.getElementById('jwl');
const potsell=document.getElementById('pot');
const hdsell=document.getElementById('hd');
const artwork=document.getElementById('art');
const fursell=document.getElementById('fur');
const toysell=document.getElementById('toy');
//fur pot toy decor jwl art
let newprod=[], disprod=[], furprod=[], toyprod=[]
let jwlprod=[], artpod=[], decorprod=[], potprod=[]
function show(){
    const prodbtn=document.querySelectorAll('.prodbtn');
    prodbtn.forEach((pb,i)=>{
    pb.addEventListener('click',()=>{
        event.preventDefault();
        let id=pb.id
        let prodarr=proddata.map((pb)=>{if (pb.productid==id) {
            const encode=encodeURIComponent(JSON.stringify(pb));
            console.log('pb');
            console.log(pb);
            console.log('encode');
            console.log(encode);
            window.location.href=`product/${id}`
        }})
    })
  })  
}

function createElem(parent,dataarr){
    
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
        imgdiv.append(img);
        imgdiv.classList.add('col', 'd-flex' ,'flex-column');
        
        prodname.innerText=e.prodname;
        prodprice.innerHTML=`<b>${'₹'+e.prodprice}</b>` ;
        btn.innerHTML="View Product";
        btn.classList.add('prodbtn','btn','btn-outline-dark','w-100');
        btn.id=e.productid;
        prodetail1.append(prodname,prodprice,btn);
        prod.append(imgdiv,prodetail1);
        prod.classList.add('prod', 'd-flex', 'flex-column' ,'justify-content-center' ,'p-2', 'col-9'  ,'col-md-3' ,'col-lg-3','col-xl-2')    
        parent.appendChild(prod);
    })  
  } 

    
window.onload=()=>{
    let a='hi'
    fetch(`${window.origin}/artifusion/buyer`,{
        method:'POST',
        headers:{
            'content-Type':'application/json',
        },
        body:JSON.stringify(a),
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.status_code==200){
            proddata= JSON.parse(data.js)

            proddata.forEach((e,i)=>{
                if(e.category=='jewel'){
                    jwlprod.push(e)
                }
                else if(e.category=='furn'){
                    furprod.push(e)
                }
                else if(e.category=='pottery'){
                    potprod.push(e)
                }
                else if(e.category=='homedecor'){
                    decorprod.push(e)
                }
                else if(e.category=='toys'){
                    toyprod.push(e)
                }
                else{
                    artpod.push(e)
                }
            })
            createElem(jwlsell,jwlprod);
            createElem(potsell,potprod);
            createElem(toysell,toyprod);
            createElem(hdsell,decorprod);
            createElem(artwork,artpod);
            createElem(fursell,furprod);
          
            show()  
        }
        else if(data.status_code==404){
            alert('the json data is not received has some problem')
            window.location.href='/artifusion/buyer'
        }
        else{
            alert('server prolem')
            window.location.href='/artifusion/buyer'
        }
    })  
    .catch(error=>{

    })      
}
console.log(toyprod);

/*search  */
const search=document.getElementById("searchbtn");
const sdisplaydiv=document.getElementById('sdisplaydiv');
const inputbar=document.getElementById('inp');
search.addEventListener('click',()=>{
    let searchprod=[]
    sdisplaydiv.innerHTML=""
    console.log("before if else : ",searchprod);
    if(inputbar.value==""){
        sdisplaydiv.innerHTML=`<h3 id="searchpresent">please enter product name to search</h3>`
    }
    else{
        a='hi'
        b=inputbar.value
        fetch(`${window.origin}/artifusion/buyer/searchdemo`,{
            method:'POST',
            headers:{
                'content-Type':'application/json',
            },
            body:JSON.stringify(b),
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.status_code==200){
                let proddata= JSON.parse(data.js)
                console.log(proddata);
                proddata.forEach((e,i)=>{
                    searchprod.push(e);
                    console.log("after data fetched : ",searchprod);
                })

                createElem(sdisplaydiv,searchprod);
              
                show()                 
            //    console.log(proddata);
            }
            else if(data.status_code==404){
                alert('the json data is not received has some problem')
                window.location.href='/artifusion/buyer'
            }
            else{
                alert('server prolem')
                window.location.href='/artifusion/buyer'
            }
        })  
        .catch(error=>{
    
        })      
    }
})
