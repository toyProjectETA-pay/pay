import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './Comp/Nav.js';
import Menu from './Comp/Menu.js';
import { loadMenu, getActivatedMenuList } from './Handler/menuLoader.js';

function App() {
  const [activated, setActivated] = useState('main');
  const [menu, setMenu] = useState(null);

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
    console.log('changed! : ', menu);
  }, [menu]);

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
      />
    </div>
  );
}

export default App;
