var bar=document.getElementById("bar")
var nav=document.getElementById("navbar")
var close=document.getElementById("close")

if(bar){
    bar.addEventListener('click' ,() => {
        nav.classList.add("active");
    })
}

if(close){
    close.addEventListener('click' ,() => {
        nav.classList.remove("active");
    })
}

var MainImg=document.getElementById("MainImg");
var Smallimg=document.getElementsByClassName("small-img");

Smallimg[0].onclick=function(){
    MainImg.src=Smallimg[0].src;
}
Smallimg[1].onclick=function(){
    MainImg.src=Smallimg[1].src;
}
Smallimg[2].onclick=function(){
    MainImg.src=Smallimg[2].src;
}
Smallimg[3].onclick=function(){
    MainImg.src=Smallimg[3].src;
}

// var product=[
//     {
//         id:1,
//         name:"PRODUCT 1",
//         image:"cart1.jpeg",
//         price:2000
//     },
//     {
//         id:2,
//         name:"PRODUCT 2",
//         image:"cart1.jpeg",
//         price:2000
//     },
//     {
//         id:3,
//         name:"PRODUCT 3",
//         image:"cart1.jpeg",
//         price:2000
//     }
// ]

// let listCards=[]

// var initApp =() =>{
//     product.forEach((value,key) =>{
//         let newDiv=document.createElement("div");
//         newDiv.classList.add("item")
//         newDiv.innerHTML=`
//         <img src ="img/${value.images}"
//         <div class="title">${value,name}>/div>
//         <div class="price">${value,price.toLocalString()}
//         <button onclick="addToCart(${key})"Add To Cart</button>
//         `
//         list.appendChild(newDiv)

//     })
// }

// initApp()


function addToCart(productName){
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location="./cart.html"

}


document.addEventListener('DOMContentLoaded',()=> {
    const addToCartButtons= document.querySelectorAll('.add-to-cart');
    const cartItemCount=document.querySelector('.cart-icon span');
    const cartItemsList=document.querySelector('.cart-items');
    const cartTotal=document.querySelector('.cart-total');
    const cartIcon=document.querySelector('.cart-icon ');
    const sidebar=document.querySelector('.sidebar');

    let cartItems=[];
    let totalAmount=0;

    addToCartButtons.forEach((button,index) =>{
        button.addEventListener('click',()=>{
            const item={
                name: document.querySelectorAll('.card .card-title')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1),),

                quantity:1,
            };

            const existingItem= cartItems.find(
                (cartItems)=> cartItems.name===item.name
            );
            if(existingItem){
                existingItem.quantity++;
            }
            else{
                cartItems.push(item);
            }

            totalAmount+= item.price;

            updateCartUI()
        });

        function updateCartUI(){
            updateCartItemCount(cartItems.length)
            updateCartItemsList();
            updatecartTotal();
        }

        function updateCartItemCount(count){
            cartItemCount.textContent=count
        }

        function updateCartItemsList(){
            cartItemsList.innerHTML=''
            cartItems.forEach((item, index) => {
                const cartItem=document.createElement('div')
                cartItems.classList.add('cart-item', 'individual-cart-item');
                cartItems.innerHTML=`
                <span>(${item.quantity}x)${item.name}</span>
                <span class="cart-item-price"> ${(item.price* item.quantity).toFixed(2)}
                <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"</i></button>
                </span>
                `;
                
                cartItemsList.append(cartItems);

    
            });
            const removeButtons=document.querySelectorAll('.remove-item');
            removeButtons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const index= event.target.dataset.index;
                    removeItemFromCart(index);
                });
            })
        }

        function removeItemFromCart(index){
            const removeItem=cartItems.splice(index,1)[0];
            totalAmount-= removeItem.price*removeItem.quantity;
            updateCartUI();
        }

        function updatecartTotal(){

            cartTotal.textContent=`${totalAmount.toFixed(2)}`
            
        }

        cartIcon.addEventListener('click', ()=> {
            sidebar.classList.toggle('open')
        });

        const closeButton=document.querySelector('.sidebar-close');
        closeButton.addEventListener("click" , ()=> {
            sidebar.classList.remove(open);
        })
    });
});