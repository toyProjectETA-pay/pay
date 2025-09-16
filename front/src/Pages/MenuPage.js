import React, { useEffect } from 'react'
import Nav from '../Comp/Nav'
import Menu from '../Comp/Menu'
import OrderBtn from '../Comp/OrderBtn'
import Header from '../Comp/Header'

const MenuPage = (props) => {
    
    useEffect(()=>{
        props.navUsedAt('menu');
        //console.log('nav changed to menu'); //working well
    }, []);

    // 탭별 데이터 분리
  const getMenusByTab = (tab) => {
    if (tab === 'main') return props.menuData.filter(m => m.id < 20);
    if (tab === 'side') return props.menuData.filter(m => m.id >= 20 && m.id < 30);
    if (tab === 'beverage') return props.menuData.filter(m => m.id >= 30 && m.id < 40);
    if (tab === 'etc') return [
      { id: 41, name: "숟가락" },
      { id: 42, name: "젓가락" },
      { id: 43, name: "앞접시" },
      { id: 44, name: "물컵" },
      { id: 45, name: "휴지" },
      { id: 46, name: "합석원해요" },
      { id: 47, name: "직원호출" },
    ];
    return [];
  };

const filteredMenus = props.menuData.filter(m => m.category === props.currentMenu);
// console.log("currentTab:", props.currentMenu);
// console.log("menuData sample:", props.menuData);
// console.log("filteredMenus:", filteredMenus);

    return (
        <>
            <Header
                goToCart={props.goToCart}
                goToHistory={props.goToHistory}
            />
            <Nav 
                currentMenu={props.currentMenu}
                onChangeMenu={props.onChangeMenu}
                navState={props.navState}
            />
            <Menu 
                menuData={filteredMenus}
                menuQty={props.menuQty}
                onSelectMenu={props.onSelectMenu}
                currentTab={props.currentMenu}
            />
            <OrderBtn
                currentState={props.menuQty}
                onClick={props.goToCart}
            />
        </>
    )
}

export default MenuPage