import React from 'react'
import { useNavigate } from 'react-router-dom'

const Result = () => {
  const navigate = useNavigate();
  const handleClick = (e) =>{
    e.preventDefault();
    navigate("/");
  }
  return (
    <div>
        <h1>주문 완료!</h1>
        <p>결제 확인 중입니다.</p>
        <a onClick={handleClick} style={{color : "#d2d2d2", textDecoration : "underline"}}>홈으로</a>
    </div>
  )
}

export default Result