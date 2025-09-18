import React, { useEffect } from 'react';
import Nav from '../Comp/Nav';
import { getAllMenuList, loadMenu } from '../Handler/menuLoader';
import List from '../Comp/List';
import OrderBtn from '../Comp/OrderBtn';
import axios from 'axios';
import Header from '../Comp/Header';

// ✅ API Base URL (환경변수)
const API_URL = process.env.REACT_APP_API_URL || "http://54.180.22.253/api";

const CartPage = (props) => {
  useEffect(() => {
    props.navUsedAt('cart');  // cart로 nav 상태 변경
  }, []);

  const { menuData, menuQty, onSelectMenu, token } = props;

  // menuData와 menuQty 합쳐서 receipt 생성
  const cartItems = props.menuQty.map((item, i) => {
    return {
      id: item.id,
      name: item.name,
      price: Number(item.price) || 0,
      quantity: Number(item.qty) || 0,
      total: (Number(item.price) || 0) * (Number(item.qty) || 0)
    };
  });

  const grandTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    const calculate = (receipt) => {
      let total = 0;
      for (let i = 0; i < receipt.length; i++) {
        if (receipt[i].price !== 0) {
          total += receipt[i].price * receipt[i].quantity;
        }
      }
      props.setTotal(total);
    };
    calculate(cartItems);
  }, [cartItems]);

  useEffect(() => {
    props.onDecideMenu(cartItems);
  }, [props.menuQty]);

  // 서버로 post 요청

  const sendDjango = async (receipt, total) => {
    const currentToken = token || localStorage.getItem("token");

    if (!currentToken) {   // token 방어 코드
      alert('세션(token)이 없습니다. QR을 다시 스캔해주세요.');
      return;
    }

    const resData = {
      table: Number(props.table),
      grand_total: total,
      is_paid: false,
      is_done: false,   // ✅ 추가
      is_ready: false,  // ✅ 추가
      items: receipt.map(item => {
        const menu = menuData.find(m => m.name === item.name);
        return {
          menu: menu?.id,
          quantity: item.quantity,
          total: item.total
        };
      })
    };

    try {
      const response = await axios.post(`${API_URL}/orders/`, resData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentToken}`
        },
      });

      console.log("서버 응답: ", response.data);
      return response.data;
    } catch (e) {
      console.error("서버 응답 에러~~~~~~~~!!!", e.response?.data || e.message);
      if (e.response?.status === 401) {
        alert("세션이 만료되었습니다. QR을 다시 스캔해주세요.");
      }
    }
  };

  return (
    <>
      <Header
        goToCart={props.goToCart}
        goToHistory={props.goToHistory}
        goToMenu={props.goToMenu}
        token={token}
      />
      <Nav
        navState={props.navState}
        table={props.table}
      />
      <List
        receipt={cartItems}
        onSelectMenu={onSelectMenu}
        total={grandTotal}
        navState={props.navState}
      />

      <OrderBtn
        currentState={cartItems}
        onPost={() => {
          sendDjango(cartItems, grandTotal);
          props.onDecideMenu([]);
          props.setMenuQty([]);
        }}
        navState={props.navState}
        total={grandTotal}
        goToResult={props.goToResult}
        token={token}
      />
    </>
  );
};

export default CartPage;
