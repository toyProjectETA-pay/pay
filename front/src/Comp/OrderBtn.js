import React from 'react'
import '../styles/orderBtn.css'
import { useNavigate } from 'react-router-dom';

const OrderBtn = (props) => {
  let btn;
  const navigate = useNavigate();
  const toBankUrl = `http://aq.gy/f/CTzbd/${props.total}`

  const handleClick = (e) =>{
    e.preventDefault();
    window.open(toBankUrl, "blank");
    navigate("/aehanmute/orderresult");
  }

  if(props.navState === 'cart'){
    if(props.total === 0){
      btn = (
        <div
          className={'enable'}
          onClick={()=>{
            props.onPost();
            navigate("/aehanmute/orderresult");
          }}
        >
          주문하기
        </div>
      )
    }
    else{
      btn = (
        <div
          className={'enable'}
          onClick={props.onPost}
        >
          <a href={toBankUrl} onClick={handleClick}>{props.total}원 결제하기</a>
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