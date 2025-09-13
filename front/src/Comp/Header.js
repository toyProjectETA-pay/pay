import React from 'react'
import history from '../images/history.png'
import cart from '../images/cart.png'
import { useNavigate } from 'react-router-dom'

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <header>쥬쥬쥬쥬점</header>
      <div>
        <img 
          src={history} 
          alt="주문내역" 
          onClick={() => props.goToHistory()}
        />
        <img 
          src={cart} 
          alt="장바구니" 
          onClick={() => props.goToCart()}
        />
      </div>
    </>
  )
}

export default Header