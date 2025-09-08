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
        menuQty={menuQty}
        onSelectMenu={onSelectMenu}
      />
    </div>
  );
}

export default App;
