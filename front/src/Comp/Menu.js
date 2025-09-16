import React, { useEffect, useState } from 'react'
import QtyBtn from './QtyBtn'
import '../styles/menu.css'



/**props : menuData(parsing된 메뉴), menyQty(메뉴고유아이디, 수량), onSelectMenu(수량 업데이트 함수) */
const Menu = (props) => {
  const getQty = (name) => {
    const found = props.menuQty.find(item => item.name === name);
    return found ? found.qty : 0;
  };

if (!props.menuData) return <div>loading...</div>;

  return (
    <div className='menu-list'>
      <ul>
        {props.menuData.map((data) => (
          <li key={data.name}>
            {props.currentTab === 'etc' ? (
              <div className='etc-area'>
                <span>{data.name}</span>
                <QtyBtn
                  menuName={data.name}
                  qty={getQty(data.name)}
                  onSelectMenu={props.onSelectMenu}
                />
              </div>
            ) : (
              <div className='contents-box'>
                <div className='text-area'>
                  <div>
                    <span>“{data.name}”</span>
                    <span>{data.desc}</span>
                  </div>
                  <span>{data.price.toLocaleString()}원</span>
                  {data.sold_out && <span style={{ color: "red" }}>품절</span>}
                </div>
                <div className='img-area'>
                  <img src={`/static/images/${data.image}`} alt={data.name}/>
                  {
                    !(data.sold_out) ? 
                    <QtyBtn
                      menuName={data.name}
                      qty={getQty(data.name)}
                      onSelectMenu={props.onSelectMenu}
                    /> :
                    <></>
                  }
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu