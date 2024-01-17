
let arr1 ;

onload()

function onload(){
    let arr1str   = localStorage.getItem('arr1')
     arr1 = arr1str ? JSON.parse(arr1str) :[];
    displayItems()  // used to display items on home page
    bagIconCount()  //used to show count in bag
}

function addtobag(itemid){
  arr1.push(itemid)
  // save this in local storage as well
  localStorage.setItem('arr1',JSON.stringify(arr1))
  bagIconCount()
}

function bagIconCount(){
    let bagcount = document.querySelector('.bag-item-count ')

    bagcount.innerHTML = arr1.length
}
function displayItems(){

    let itemsContainer = document.querySelector('.items-container');

    if(!itemsContainer){
        return;
    }
let inner = '';
items.forEach(item=>{
     inner += ` <div class="item-container">
     <img class="img" src="${item.image}" alt="">
     <div class="rating">
         ${item.rating.stars}  | ${item.rating.count}
     </div>
     <div class="company-name">${item.company}</div>
     <div class="item-name">${item.item_name}</div>
     <div class="price">
         <span class="current-price">${item.current_price}</span>
         <span class="original-price">${item.original_price}</span>
         <span class="discount">${item.discount_percentage}</span>
     </div>
     <div class="">
         <button class="btn" onclick = addtobag(${item.id})>Add to Bag</button>
     </div>
     </div>`  
})

itemsContainer.innerHTML = inner;
}

