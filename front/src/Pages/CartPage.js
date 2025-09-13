import React, { useEffect, useState } from 'react'
import Nav from '../Comp/Nav'
import { getAllMenuList, loadMenu } from '../Handler/menuLoader';
import List from '../Comp/List';
import OrderBtn from '../Comp/OrderBtn';
import axios from 'axios';


/**props: nav상태관리, menuQty(id, qty만 들어있음), 
 *        onSelectMenu(QtyBtn에 id와 수량과 함께 보낼 것),
 *        reciept(최종 데이터),
 *        onDecideMenu(최종 주문서 설정, setReceipt() 들어있음) */
const CartPage = (props) => {
  const [menu, setMenu] = useState([]);
  const [resData, setResData] = useState([]);

  useEffect(()=>{
    props.navUsedAt('cart');  //cart로 nav 상태 변경

    //최종 주문 데이터(서버 전송) 추출을 위해 메뉴 set 가져오기
    const initMenu = async ()=>{
      await loadMenu();
      setMenu(getAllMenuList());
    }
    initMenu();
  }, []);
  console.log(menu); //전체 메뉴
  console.log(props.menuQty);

  //전체 menu set과 client가 담은 특정 메뉴의 수량 set을 합침 => 최종 데이터
  const menuMap = Object.fromEntries(
    menu.map(item => [item.id, item])
  );

  const receipt = props.menuQty.map(({ id, qty }) => ({
        ...menuMap[id],
        qty,
  }));
  console.log(receipt);

  // useEffect(()=>{
  //   props.onDecideMenu(receipt);
  //   console.log(receipt);
  // }, [props.menuQty]);

  const url ="http://127.0.0.1:8000/cart/getTotal";
  const sendDjango = async ()=> {
    try{
      const response = await axios.post(url, resData, {
        'Content-Type': 'application/json'
      
    });
  setResData(response.data);
    }catch(e){
      console.log(e);
    }
  };

  return (
    <>
      <Nav 
        navState={props.navState}
      />
      <List 
        receipt={receipt}
        onSelectMenu={props.onSelectMenu}
      />
      
      <OrderBtn 
      currentState = {props} // 총금액.. 뭐로 해야 하지?
      onClick = {sendDjango}
      />
    </>
    
  )
}

export default CartPage