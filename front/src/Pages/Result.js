import React from 'react'
import check from '../images/check.png'

const Result = (props) => {
  return (
    <div>
        <img src={check} />
        <h1>주문 완료!</h1>
        <p>결제 확인 중입니다.</p>
        <p onClick={props.goToMenu} style={{color : "#d2d2d2", textDecoration : "underline"}}>홈으로</p>
    </div>
  )
}

export default Result