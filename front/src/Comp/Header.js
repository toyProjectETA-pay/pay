import React from 'react'
import history from '../images/history.png'
import cart from '../images/cart.png'
import { useNavigate } from 'react-router-dom'
import '../styles/header.css'

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <div className='header'>
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
    </div>
  )
}

export default Header