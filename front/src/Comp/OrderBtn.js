import React from 'react'
import '../styles/orderBtn.css'

const OrderBtn = (props) => {
  return (
    <div
        className={props.currentState.length === 0 ? 'disable' : 'enable'}
        onClick={props.onClick}
    >주문하기</div>
  )
}

export default OrderBtn