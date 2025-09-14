import React from 'react'
import '../styles/header.css'

const Header = (props) => {
  return (
    <div className='header'>
      <header
        onClick={()=>props.goToMenu()}
      >大뮤트 酒점</header>
      <div>
        <i 
          class="bi bi-receipt-cutoff"
          style={{
            fontSize : '1.55rem'
          }}
          alt="주문내역" 
          onClick={() => props.goToHistory()}
        ></i>
        <i 
          class="bi bi-bag"
          style={{
            fontSize : '1.55rem'
          }}
          alt="장바구니" 
          onClick={() => props.goToCart()}
        ></i>
      </div>
    </div>
  )
}

export default Header