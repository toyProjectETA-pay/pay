import React from 'react'
import check from '../images/check.png'
import '../styles/result.css'

const Result = (props) => {
  return (
    <div className='container'>
      <div className='result-container'>
        <img src={check} />
        <h2>주문이 완료되었습니다!</h2>
        <p style={{ textAlign: "center" }}>카운터에서 입금 확인 후 조리가 시작됩니다. <br/> 잠시만 기다려 주세요. </p>
      </div>
      <p onClick={props.goToMenu(props.token)} style={{color : "#d2d2d2", textDecoration : "underline"}}>메뉴로 돌아가기</p>
    </div>
  )
}

export default Result