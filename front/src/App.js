import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { loadMenu, getActivatedMenuList } from './Handler/menuLoader.js';
import MenuPage from './Pages/MenuPage.js';
import CartPage from './Pages/CartPage.js';

function App() {
  const [activated, setActivated] = useState('main');
  const [menu, setMenu] = useState(null);
  const [menuQty, setMenuQty] = useState([]);

  /*menu.json 불러오는 비동기함수, 첫 렌더링에만 실행 */
  useEffect(()=>{
    const initMenu = async ()=>{
      await loadMenu();
      setMenu(getActivatedMenuList(activated));
    }
    initMenu();
  }, []);

  /*tap menu 변경 있을 때마다 실행, menu.json에서 활성화된 tap의 메뉴들만 parsing */
  useEffect(()=>{
    setMenu(getActivatedMenuList(activated));
  }, [activated]);

  /*내사랑콘솔로그 */
  useEffect(()=>{
    console.log(menuQty);
  }, [menuQty]);

  /*메뉴 id와 수량을 매개변수로 받음. 
    1. 이전에 수량 변화가 있었던 메뉴면 기존 인덱스에 qty 새 값 덮어씌움
    2. 이전에 수량 변화가 없었던 메뉴면 새로 인덱스 생성
    3. 수량을 0으로 만들면 해당 id 가진 인덱스 삭제 */
  const onSelectMenu = (id, qty) => {
    setMenuQty(prev => {
      if (qty === 0) return prev.filter(item => item.id !== id);
      const exists = prev.find(item => item.id === id);
      if (exists) {
        return prev.map(item => item.id === id ? { ...item, qty } : item);
      } else {
        return [...prev, { id, qty }];
      }
    });
  };

  return (
    //id 부분에 테이블번호 들어갈 것
    <Router>
      <header>
        쥬쥬쥬쥬점
      </header>
      <Routes>
        <Route path='/' element={<Navigate to={'/aehanmute/id'} />} />
        <Route path='/aehanmute/id' element={
          <MenuPage 
            currentMenu={activated}
            onChangeMenu={(key)=>{
              setActivated(key);
            }}
            menuData={menu}
            menuQty={menuQty}
            onSelectMenu={onSelectMenu}
            currentState={menuQty}
          />
        } />
        <Route path='/aehanmute/id/cart' element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
