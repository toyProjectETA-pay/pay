import React from 'react'
import '../styles/orderBtn.css'

const OrderBtn = (props) => {
  let btn;
  if(props.navState === 'cart'){
    btn = (
      <div
        className={props.currentState.length === 0 ? 'disable' : 'enable'}
        onClick={props.onPost}
      >{props.total}원 결제하기</div>
    )
  }
  else{
    btn = <div
        className={props.currentState.length === 0 ? 'disable' : 'enable'}
        onClick={props.onClick}
    >주문하기</div>
  }
  return (
    <>{btn}</>
  )
}

export default OrderBtn