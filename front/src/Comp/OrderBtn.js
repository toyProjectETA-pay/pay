import React, { useEffect } from 'react'
import '../styles/orderBtn.css'

const OrderBtn = (props) => {
  let btn;
  const toBankUrl = `http://aq.gy/f/CTzbd/${props.total}`

  useEffect(()=>{
    console.log('orderBtn : ', props.currentState);
  }, []);

  if(props.navState === 'cart'){
    if(props.total === 0 && props.currentState.length !== 0){
      btn = (
        <div
          className={'enable'}
          onClick={()=>{
            props.onPost();
            props.goToResult();
          }}
        >
          주문하기
        </div>
      )
    }
    else if(props.total !== 0 && props.currentState.length !== 0){
      btn = (
        <div
          className={'enable'}
          onClick={(e)=>{
            e.preventDefault();
            window.open(toBankUrl, "_blank");
            props.onPost();
            props.goToResult();
          }}
        >
          {props.total.toLocaleString()}원 결제하기
        </div>
      )
    }
    else{
      btn = (
        <div
          className={'disable'}
        >
          주문하기
        </div>
      )
    }
  }
  else{
    btn = <div
        className={props.currentState.length === 0 ? 'disable' : 'enable'}
        onClick={props.currentState.length === 0 ? undefined : props.onClick}
    >주문하기</div>
  }
  return (
    <>{btn}</>
  )
}

export default OrderBtn