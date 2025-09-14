import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { loadMenu, getActivatedMenuList } from './Handler/menuLoader.js';
import MenuPage from './Pages/MenuPage.js';
import CartPage from './Pages/CartPage.js';
import { useNavigate, useSearchParams } from 'react-router-dom'
import Result from './Pages/Result.js';
import HistoryPage from './Pages/HistoryPage.js';
import axios from "axios";

function App() {
  const [activated, setActivated] = useState('main');
  const [menu, setMenu] = useState(null);
  const [menuQty, setMenuQty] = useState([]);
  const [receipt, setReceipt] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  // 하겅추가  url로부터 table number 받기 
  // 화면에 테이블 번호 출력하고 싶다면 table 변수를 쓰시오~~!! 
  const [searchParams] = useSearchParams(); // 배열 구조분해라네 
  const table = searchParams.get("table");  



  const navigate = useNavigate();


  const goToCart = () => {
      navigate(`/aehanmute/cart?table=${table}`);
  };
  const goToHistory = () =>{
      navigate(`/aehanmute/history?table=${table}`);
  }
  const goToResult = () =>{
      navigate(`/aehanmute/orderresult?table=${table}`);
  }
  const goToMenu = () =>{
      navigate(`/aehanmute/order?table=${table}`);
  }

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
    console.log(total);
  }, [menuQty]);

  const [menuData, setMenuData] = useState([]);
  useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/menus/")
        .then(res =>{
          console.log("App.js-api/menus/ 확인:", res.data);
          setMenuData(res.data)})
        .catch(err => console.error(err));
    }, []);


  /*메뉴 id와 수량을 매개변수로 받음. 
    1. 수량을 0으로 만들면 해당 id 가진 인덱스 삭제
    2. 이전에 수량 변화가 있었던 메뉴면 기존 인덱스에 qty 새 값 덮어씌움
    3. 이전에 수량 변화가 없었던 메뉴면 새로 인덱스 생성
     */
  const onSelectMenu = (name, qty) => {
    setMenuQty(prev => {
      if (qty === 0) return prev.filter(item => item.name !== name);

      // menuData에서 현재 메뉴 찾아옴
      const menu = menuData.find(m => String(m.name) === String(name));

      console.log("onSelectMenu 실행:", name, qty);



      const exists = prev.find(item => item.name === name);
      if (exists) {
        return prev.map(item => 
          item.name === name ? { ...item, qty } : item);
      } else {
        return [...prev, { name, qty, name: menu.name, price: menu.price }];
      }
    });
  };



  const [page, setPage] = useState('menu');


  return (
    //id 부분에 테이블번호 들어갈 것 파라미터로 넣으면 좋을 듯 ?table=1 식으로.
    //url 확정은 아니니 참고만 해주시고, 나중에 파라미터들은 암호화합싀다.

    //오 이거 안 읽고 그냥 한 건데 통햇네요.. 후후 후 후 후.. 불면은..구멍이뚫리는..
    <div className='fullscreen'>
      <Routes>
        <Route path='/' element={<Navigate to={'/aehanmute/order'} />} />
        <Route path='/aehanmute/order' element={
          <MenuPage 
            currentMenu={activated}
            onChangeMenu={(key)=>{
              setActivated(key);
            }}
            navUsedAt={(page)=>{ setPage(page); }}
            navState={page}
            menuData={menuData}
            menuQty={menuQty}
            onSelectMenu={onSelectMenu}
            goToCart={goToCart}
            goToHistory={goToHistory}
          />
        } />
        <Route path='/aehanmute/cart/' element={
          <CartPage 
            table={table}
            goToCart={goToCart}
            goToHistory={goToHistory}
            goToMenu={goToMenu}
            goToResult={goToResult}
            navUsedAt={(page)=>{ setPage(page); }}
            navState={page}
            menuQty={menuQty}
            menuData={menuData}
            onSelectMenu={onSelectMenu}
            setMenuQty={()=>{ setMenuQty([]) }}
            receipt={receipt}
            onDecideMenu={(receipt)=>{ setReceipt(receipt); }}
            total={total}
            setTotal={(receipt)=>{ setTotal(receipt) }}
          />
        } />
        <Route path='/aehanmute/orderresult/' element={
          <Result 
            goToMenu={goToMenu}
          />
        } />
        <Route path='/aehanmute/history/' element={
          <HistoryPage
            goToCart={goToCart}
            goToHistory={goToHistory}
            goToMenu={goToMenu}
            navUsedAt={(page)=>{ setPage(page); }}
            navState={page}
            prevOrders={orders}
            onUpdateOrders={setOrders}
            menuData={menuData}
          />
        } />
      </Routes>
    </div>
  );
}

export default App;
