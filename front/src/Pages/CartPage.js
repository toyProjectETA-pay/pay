import React, { useEffect, useState } from 'react'
import Nav from '../Comp/Nav'
import { getAllMenuList, loadMenu } from '../Handler/menuLoader';
import List from '../Comp/List';
import OrderBtn from '../Comp/OrderBtn';
import axios from 'axios';
import Header from '../Comp/Header';


/**props: nav상태관리, menuQty(id, qty만 들어있음), 
 *        onSelectMenu(QtyBtn에 id와 수량과 함께 보낼 것),
 *        reciept(최종 데이터),
 *        onDecideMenu(최종 주문서 설정, setReceipt() 들어있음) */
const CartPage = (props) => {
  useEffect(()=>{
    props.navUsedAt('cart');  //cart로 nav 상태 변경
  }, []);
  console.log(props.menuQty);

   // menuData와 menuQty props로 받아옴
  const { menuData, menuQty, onSelectMenu, token } = props;

  // menuData와 menuQty 합쳐서 receipt 생성
  const cartItems = props.menuQty.map((item, i) => {
    console.log("i:", i, "name:", item.name, "price:", item.price, "qty:", item.qty);
    return {
      id: item.id,
      name: item.name,
      price: Number(item.price) || 0,
      quantity: Number(item.qty) || 0,
      total: (Number(item.price) || 0) * (Number(item.qty) || 0)
    };
  });

  const grandTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(()=>{
    const calculate = (receipt)=>{
      console.log(receipt.length)
      let total = 0;
      for(let i = 0; i<receipt.length; i++){
        if(receipt[i].price != 0){
          total += receipt[i].price * receipt[i].quantity
          console.log('i :', i, '\nprice : ', receipt[i].price, '\nquantity : ', receipt[i].quantity, '\ntotal : ', total)
        }
        else{
          console.log('i :', i, '\nquantity : ', receipt[i].quantity, '\ntotal : ', total)
          continue;
        }
      }
      props.setTotal(total);
      console.log(total);
    }
    calculate(cartItems);
  }, [cartItems]);

  useEffect(()=>{
    props.onDecideMenu(cartItems);
    console.log(cartItems);
  }, [props.menuQty]);

  //서버로 post 요청
  const url ="http://127.0.0.1:8000/api/orders/";
  const sendDjango = async (receipt, total)=> {
    const resData = {
      // table: Number(props.table), //token을 받아오기에 수정해야
      grand_total: total,
      is_paid: false,
      items: receipt.map(item => {
        const menu = menuData.find(m => m.name === item.name);
        return{
          menu: menu?.id,
          quantity: item.quantity,                 // qty → quantity
          total: item.total 
        };
              // 개별 total 계산
      })
    }
    console.log("POST payload:", resData);

    try{
      const response = await axios.post(url, resData, {
        headers : {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
      console.log("카트 서버 응답: ", response.data);
      return response.data
    }catch(e){
      console.error("서버 응답 에러~~~~~~~~!!!",e.response?.data);
    }
  };

  return (
    <>
      <Header
        goToCart={props.goToCart}
        goToHistory={props.goToHistory}
        goToMenu={props.goToMenu}
      />
      <Nav 
        navState={props.navState}
      />
      <List 
        receipt={cartItems}
        onSelectMenu={onSelectMenu}
        total={grandTotal}
        navState={props.navState}
      />
      
      <OrderBtn 
        currentState = {cartItems} // 총금액.. 뭐로 해야 하지?
        onPost = {() => {
          sendDjango(cartItems, grandTotal)
          props.onDecideMenu([])
          props.setMenuQty([])
        }}
        navState = {props.navState}
        total = {grandTotal}
        goToResult={props.goToResult}
      />
    </>
    
  )
}

export default CartPage