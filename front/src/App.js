import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import './App.css';
import { loadMenu, getActivatedMenuList } from './Handler/menuLoader.js';
import MenuPage from './Pages/MenuPage.js';
import CartPage from './Pages/CartPage.js';
import Result from './Pages/Result.js';
import HistoryPage from './Pages/HistoryPage.js';
import axios from "axios";
import OmsPage from './Pages/OmsPage.js';

// ✅ API Base URL (환경변수로 설정)
const API_URL = process.env.REACT_APP_API_URL || "http://aehan-mutejujeom/api";

function App() {
  const [activated, setActivated] = useState('main');
  const [menu, setMenu] = useState(null);
  const [menuQty, setMenuQty] = useState([]);
  const [receipt, setReceipt] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);

  const [searchParams] = useSearchParams(); 
  const queryTable = searchParams.get("table");
  const queryToken = searchParams.get("token");
  const table = searchParams.get("table");

  const location = useLocation();
  const navigate = useNavigate();

  const [tokenState, setTokenState] = useState(() => queryToken || localStorage.getItem('token') || null);
  const [tableState, setTableState] = useState(() => queryTable || localStorage.getItem('table') || null);

  // 네비게이션 이동 함수들
  const goToCart = () => navigate(`/aehanmute/cart?token=${tokenState || ''}`);
  const goToHistory = () => navigate(`/aehanmute/history?token=${tokenState || ''}`);
  const goToResult = () => navigate(`/aehanmute/orderresult?token=${tokenState || ''}`);
  const goToMenu = () => navigate(`/aehanmute/order?token=${tokenState || ''}`);

  /* 메뉴 초기 로드 */
  useEffect(() => {
    const initMenu = async () => {
      await loadMenu();
      setMenu(getActivatedMenuList(activated));
    }
    initMenu();
  }, []);

  useEffect(() => {
    setMenu(getActivatedMenuList(activated));
  }, [activated]);

  // 첫 렌더링 시 table 번호 있으면 토큰 발급
  useEffect(() => {
    if (queryTable) {
      fetchToken(queryTable);
    }
  }, [queryTable]);

  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/menus/`)
      .then(res => {
        console.log("App.js-api/menus/ 확인:", res.data);
        setMenuData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const onSelectMenu = (name, qty) => {
    setMenuQty(prev => {
      if (qty === 0) return prev.filter(item => item.name !== name);

      const menu = menuData.find(m => String(m.name) === String(name));

      console.log("onSelectMenu 실행:", name, qty);

      const exists = prev.find(item => item.name === name);
      if (exists) {
        return prev.map(item =>
          item.name === name ? { ...item, qty } : item
        );
      } else {
        return [...prev, { name, qty, name: menu.name, price: menu.price }];
      }
    });
  };

  const [page, setPage] = useState('menu');

  // ✅ 테이블 번호로 서버에 요청해서 JWT access 토큰 발급받는 함수
  const fetchToken = async (table) => {
    try {
      const res = await axios.get(`${API_URL}/generate-token/${table}/`);
      const t = res.data.access;   // access 토큰만 사용
      setTokenState(t);
      setTableState(table);
      localStorage.setItem('token', t);
      localStorage.setItem('table', table);
      navigate(`${location.pathname}?token=${t}`, { replace: true });
      return t;
    } catch (err) {
      console.error("토큰 발급 실패:", err);
      return null;
    }
  };

  // 첫 진입/새로고침 시 token, table 처리
  useEffect(() => {
    (async () => {
      if (queryToken && !tokenState) {
        setTokenState(queryToken);
        localStorage.setItem('token', queryToken);
      } else if (queryTable && !tokenState) {
        await fetchToken(queryTable);
      } else if (!queryToken && !queryTable) {
        const savedToken = localStorage.getItem('token');
        const savedTable = localStorage.getItem('table');
        if (savedToken) setTokenState(savedToken);
        if (savedTable) setTableState(savedTable);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryTable, queryToken]);

  return (
    <div className='fullscreen'>
      <Routes>
        <Route path='/' element={<Navigate to={'/aehanmute/order/'} />} />
        <Route path='/aehanmute/order' element={
          <MenuPage
            currentMenu={activated}
            onChangeMenu={(key) => { setActivated(key); }}
            navUsedAt={(page) => { setPage(page); }}
            navState={page}
            menuData={menuData}
            menuQty={menuQty}
            onSelectMenu={onSelectMenu}
            goToCart={goToCart}
            goToHistory={goToHistory}
            table={tableState}
            token={tokenState}
          />
        } />
        <Route path='/aehanmute/cart/' element={
          <CartPage
            token={tokenState}
            goToCart={goToCart}
            goToHistory={goToHistory}
            goToMenu={goToMenu}
            goToResult={goToResult}
            navUsedAt={(page) => { setPage(page); }}
            navState={page}
            menuQty={menuQty}
            menuData={menuData}
            onSelectMenu={onSelectMenu}
            setMenuQty={() => { setMenuQty([]) }}
            receipt={receipt}
            onDecideMenu={(receipt) => { setReceipt(receipt); }}
            total={total}
            setTotal={(receipt) => { setTotal(receipt) }}
            table={tableState}
          />
        } />
        <Route path='/aehanmute/orderresult/' element={
          <Result
            goToMenu={goToMenu}
            token={tokenState}
          />
        } />
        <Route path='/aehanmute/history/' element={
          <HistoryPage
            goToCart={goToCart}
            goToHistory={goToHistory}
            goToMenu={goToMenu}
            navUsedAt={(page) => { setPage(page); }}
            navState={page}
            prevOrders={orders}
            onUpdateOrders={setOrders}
            menuData={menuData}
            token={tokenState}
            table={tableState}
          />
        } />
        <Route path='/oms' element={<Navigate to={'/oms/aehanmute/'} />} />
        <Route path='/oms/aehanmute/' element={
          <OmsPage menuData={menuData} />
        } />
      </Routes>
    </div>
  );
}

export default App;
