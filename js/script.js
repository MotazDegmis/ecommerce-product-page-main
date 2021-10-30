const mainImg = document.querySelector('[data-mainimg]')

const lightBox = document.querySelector('[data-lightbox]')

let itemCount = 1


main()

function main(){
    menuToggle()
    cartToggle()
    lightBoxToggle()
    mainSlider()
    addItem()
}





function mainSlider(){
    const mainImgs = document.querySelectorAll('[data-mimg]')
    const sliderBtns = document.querySelectorAll('.img__btn')
    const sliderBg = document.querySelector('[data-mslider]')
    let cunt = 1
    mainImgs.forEach(img=>{
        img.addEventListener('click',(ev)=>{
            const num = ev.target.dataset.mimg
            mainImgs.forEach(img=>{
                img.classList.remove('active')
            })
            ev.target.classList.add('active')
            mainImg.src = `./img/image-product-${num}.jpg`
        })
    })
    sliderBtns.forEach(btn=>{

        window.addEventListener('resize', ()=>{
            const width = window.innerWidth
            if(width <= 768){
                sliderBg.style.backgroundImage = null
            }
        })
        
        btn.addEventListener('click',ev=>{
            
            if(ev.target.dataset.next == ""){
                cunt = cunt == 4 ? 1 : cunt + 1 
                sliderBg.style.backgroundImage = `url(./img/image-product-${cunt}.jpg)`
            }else{
                cunt = cunt == 1 ? 4 : cunt - 1
                sliderBg.style.backgroundImage = `url(./img/image-product-${cunt}.jpg)`
            }
            
        })
    })
}

function lightSlider(){
    const lightBoxImg = document.querySelector('[data-lightImgs]')
    const lightImgs = document.querySelectorAll('[data-limg]')
    const sliderBtns = document.querySelectorAll('.imgL__btn')
    let cunt = 1
    lightImgs.forEach(img=>{
        img.addEventListener('click',(ev)=>{
            const num = ev.target.dataset.limg
            lightImgs.forEach(img=>{
                img.classList.remove('active')
            })
            ev.target.classList.add('active')
            lightBoxImg.src = `./img/image-product-${num}.jpg`
            cunt = parseInt(num, 10)
        })
    })

    
    sliderBtns.forEach(btn=>{
        btn.addEventListener('click',ev=>{
        
            if(ev.target.dataset.next == ""){
                
                cunt = cunt == 4 ? 1 : cunt + 1 
                lightBoxImg.src = `./img/image-product-${cunt}.jpg`
            }else{
                
                cunt = cunt == 1 ? 4 : cunt - 1
                lightBoxImg.src = `./img/image-product-${cunt}.jpg`
            }
            lightImgs.forEach(img=>{
                img.classList.remove('active')
            })
            lightImgs[cunt-1].classList.add('active')
        })
    })
}



function menuToggle(){
    const nav = document.querySelector('[data-nav]')
    const menuBtn = document.querySelector('[data-menu]')
    const closeBtn = document.querySelector('[data-close]')
    
    menuBtn.addEventListener('click',()=>{
        nav.classList.add('active')
    })
    closeBtn.addEventListener('click',()=>{
        nav.classList.remove('active')
    })
}



function cartToggle(){
    const cart = document.querySelector('[data-cartbtn]')
    const cartContent = document.querySelector('[data-cartcontent]')

    cart.addEventListener('click',()=>{
        if(cartContent.classList.contains('active')){
            cartContent.classList.remove('active')
        }else{
            cartContent.classList.add('active')
        }
        
    })

    document.addEventListener('click',e =>{
        if(e.target.parentElement == null ){
            cartContent.classList.remove('active')
        }else if (!e.target.parentElement.classList.contains('cart__content') && !e.target.classList.contains('cart__btn') && !e.target.classList.contains('delete__btn') && !e.target.classList.contains('Checkout')){
            cartContent.classList.remove('active')
        }     
    })
}



function lightBoxToggle(){
    const closeBtn = document.querySelector('[data-closebtn]')

    mainImg.addEventListener('click',()=>{
        lightBox.classList.add('active')
        lightSlider()
    })

    closeBtn.addEventListener('click',()=>{
        lightBox.classList.remove('active')
    })
}

function addItem(){
    const countBtns = document.querySelectorAll('[data-countbtn]')
    const countNum = document.querySelector('[data-count]')
    const addItem = document.querySelector('[data-add]')
    const cartbtn = document.querySelector('[data-cartbtn]')

    const cartText = document.querySelector('[data-cartbody]')

    countNum.innerHTML = itemCount

    countBtns.forEach(btn=>{
        btn.addEventListener('click',ev=>{
            if(ev.target.classList.contains('minus')){
                if(itemCount == 1)return
                itemCount = itemCount - 1
                
                countNum.innerHTML = itemCount
            }else{
                itemCount = itemCount + 1
                countNum.innerHTML = itemCount
                
            }

        })
    })

    addItem.addEventListener('click',()=>{
        cartbtn.style.setProperty("--color", "hsl(26, 100%, 55%)");
        cartbtn.style.setProperty("--count", `"${itemCount}"`);
        const prise = itemCount *125.00
        const text = `<div>
        <div class="item__img">
          <img
            src="./img/image-product-1-thumbnail.jpg"
            alt="image product thumbnail"
          />
        </div>
        <div>
          <p>Fall Limited Edition Sneakers</p>
          <span>$125.00 x</span>
          <span>${itemCount}</span>
          <span>$${prise}.00</span>
        </div>
        <button class="delete__btn" type="button">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
      <button class="Checkout" type="button">Checkout</button>`
        cartText.innerHTML = text
        const deleteItem = document.querySelector('.delete__btn')
        deleteItem.addEventListener('click',()=>{
            
            itemCount = 1
            countNum.innerHTML = itemCount
            cartbtn.style.setProperty("--color", "");
            cartbtn.style.setProperty("--count", `""`);
            cartText.innerHTML = "Your cart is empty."
        })

    })


}
