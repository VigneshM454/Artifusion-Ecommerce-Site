*This is a full stack project , where I used my localhost for database activity.

*I used flask for backend and database connectivity, as I didnt know NodeJS

*Most of the styles were implemented using bootstrap franework

*This website has 3 views buyer view, seller view, admin view

*For client side activity i used javascript

*JSON played a great role in transfering data between flask(python) and  javascript 

*I used fetch method to share data to Flask, a sample code is given below

fetch(`${window.origin}/artifusion/buyer/cart`,{
      method:"POST",
      headers:{
        "content-Type":"application/json",
      },
      body:JSON.stringify(demotxt),
    })
.then(response=>response.json())
.then((data)=>
{
  //code to be executed

})

*I created a Session for any user who logs in (Buyer or Seller) using flask which data is passed to all the pages 

*The products displayed were dynamic as their details (images,price,name,qty,description) are given by seller

*I also included Admin view

* I have made Most of the functionality of bueyr view except for order ,where a user can place a order which is uploaded to database, but i have not included any actions to show that order to user, but i have included some functionality to show all the order that a seller received from various buyers in his orders page

* For all sellers, buyers i have included a profile page where they can see their fulll profile detail and can modify it

* I have included the search functionality in buyer page in order to search any product by its name

* For both the seller, and admin page i have no idea about how it should be ,
   -> in seller there are 4 pages, home,orders,products,profile  where orders page represents the orders for that seller in a table format as in db
   ->In admin there are home,orders,products,sellers,buyers it also list all the items in the respective database in tabular format
   -> the home page of both seller, admin looks very average
   ->I have few buttons in both seller,admin page which has no effect i didnt write code to make them dynamic
*For payment page i tried to integrate paypal sandbox but i failed, i creataed my custom payment form, through which orders are placed
*i tried to upload this project to a hosting site, but i failed to upload it with those databases
*Whatever i have failed, but this project motivated me to learn Bootstrap,Flask and a bit of backend stuff.This is also my noteworthy project in python , i already knew the basics of python only, never did any applications with it  , or machine learning and datascience project aspects with it.
*It also give me an experience of storing and retrieving an image from my localhost by converting image to BLOB (a binary format)


