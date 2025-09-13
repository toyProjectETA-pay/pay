import React, { useEffect } from 'react'
import Nav from '../Comp/Nav'
import Menu from '../Comp/Menu'
import OrderBtn from '../Comp/OrderBtn'
import Header from '../Comp/Header'

const MenuPage = (props) => {
    
    useEffect(()=>{
        props.navUsedAt('menu');
        console.log('nav changed to menu'); //working well
    }, []);

    return (
        <>
            <Header
                goToCart={props.goToCart}
            />
            <Nav 
                currentMenu={props.currentMenu}
                onChangeMenu={props.onChangeMenu}
                navState={props.navState}
            />
            <Menu 
                menuData={props.menuData}
                menuQty={props.menuQty}
                onSelectMenu={props.onSelectMenu}
            />
            <OrderBtn
                currentState={props.menuQty}
                onClick={props.goToCart}
            />
        </>
    )
}

export default MenuPage