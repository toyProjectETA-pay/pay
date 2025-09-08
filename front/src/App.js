import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './Comp/Nav.js';
import Menu from './Comp/Menu.js';
import { loadMenu, getActivatedMenuList } from './Handler/menuLoader.js';

function App() {
  const [activated, setActivated] = useState('main');
  const [menu, setMenu] = useState(null);
  const [menuQty, setMenuQty] = useState([]);

  useEffect(()=>{
    const initMenu = async ()=>{
      await loadMenu();
      setMenu(getActivatedMenuList(activated));
    }
    initMenu();
  }, []);

  useEffect(()=>{
    setMenu(getActivatedMenuList(activated));
  }, [activated]);

  useEffect(()=>{
    console.log(menuQty);
  }, [menuQty]);

  return (
    <div className="App">
      <header>
        쥬쥬쥬쥬점
      </header>
      <Nav 
        currentMenu={activated}
        onChangeMenu={(key)=>{
          setActivated(key);
        }}
      />
      <Menu 
        menuData={menu}
        onSelectMenu={(id, qty)=>{
          setMenuQty((prevItems) => {
            // 기존에 동일 id가 있으면 덮어쓰기, 없으면 새로 추가
            const exists = prevItems.find(item => item.id === id);
            if (exists) {
              if(qty === 0){
                return prevItems.filter(item => item.id !== id);
              }
              return prevItems.map(item =>
                item.id === id ? { ...item, qty } : item
              );
            } else {
              return [...prevItems, { id, qty }];
            }
          });
        }}
      />
    </div>
  );
}

export default App;
