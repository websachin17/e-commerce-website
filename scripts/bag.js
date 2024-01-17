

let bagItemObj ;
onload()



function onload(){
   loadBagItems()
    displayBagItems()
    bagSummary()
}

// ab apan ko vohi items bag item me dikhane hai  jinko add to bag kiya hai

function loadBagItems(){
   bagItemObj = arr1.map(function(itemid){
     for(let i=0 ;i<items.length ;i++){
        if(itemid==items[i].id){
            return items[i]
        }
     }
   })
}

function removeItem(itemID){

   arr1 = arr1.filter(bagitemid => bagitemid!=itemID) //ye jab bhi false hoga filter usko skip kr dega
   // again store arr1
   localStorage.setItem('arr1',JSON.stringify(arr1))
   // again call loadbag items
   loadBagItems();
   bagIconCount()
   //again display 
   displayBagItems();
   bagSummary()

}


function displayBagItems(){


    let bagItems = document.querySelector('.bag-items-container')

    let inner = '';
    bagItemObj.forEach(element => {   //this will iterate on all the items which are in bagitems
          inner = inner + generateItemHtml(element)  
    });

    bagItems.innerHTML = inner;
}

function generateItemHtml(item){  //this function will take a item object and generrate it;s inner html
     
     return `  <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">${item.current_price}</span>
        <span class="original-price">${item.original_price}</span>
        <span class="discount-percentage">${item.discount_percentage}</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">14 days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">20-oct-2023</span>
      </div>
    </div>

    <div class="remove-from-cart "  onclick = removeItem(${item.id})>X</div>
  </div>
`

}


function bagSummary(){

    let summary = document.querySelector('.bag-summary')

    let totalMrp = 0;
    let discount = 0;
    let finalpayement = 0;

    bagItemObj.forEach(function(items){
        totalMrp = totalMrp + items.original_price;
        discount = discount + items.original_price - items.current_price
        finalpayement = finalpayement + items.current_price
    })

    finalpayement = totalMrp -discount + 99
    

    summary.innerHTML = `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${arr1.length} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">${totalMrp}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs${discount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">${finalpayement}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
</div>`

}