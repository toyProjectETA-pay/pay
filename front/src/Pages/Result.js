import React from 'react'
import check from '../images/check.png'
import '../styles/result.css'

const Result = (props) => {
  return (
    <div className='container'>
      <div className='result-container'>
        <img src={check} />
        <h2>주문이 완료되었습니다!</h2>
        <p>카운터에서 주문 확인 중 ...</p>
      </div>
      <p onClick={props.goToMenu} style={{color : "#d2d2d2", textDecoration : "underline"}}>메뉴로 돌아가기</p>
    </div>
  )
}

export default Result