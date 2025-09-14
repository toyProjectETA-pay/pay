import React from 'react'
import QtyBtn from './QtyBtn';

const List = (props) => {
  /**해당 메뉴의 수량을 읽어옴 (수량 변화가 없었다면 0 return) */
  const getQty = (name) => {
      const found = props.receipt.find(item => item.name === name);
      return found ? found.quantity : 0;
  };

  return (
    <>
      {
        props.receipt.map(item => (
          <div key={item.id}>
            <span>{item.name}</span>
            <QtyBtn 
              menuName={item.name}
              qty={getQty(item.name)}
              onSelectMenu={props.onSelectMenu}
            />
            <span>{item.price === 0 ? '' : `${item.price * item.quantity}원`}</span>
          </div>
        ))
      }
      <div>
        총 {props.total}원
      </div>
    </>
  )
}

export default List