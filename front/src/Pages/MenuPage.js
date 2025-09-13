import React, { useEffect } from 'react'
import Nav from '../Comp/Nav'
import Menu from '../Comp/Menu'
import OrderBtn from '../Comp/OrderBtn'

const MenuPage = (props) => {
    
    useEffect(()=>{
        props.navUsedAt('menu');
        console.log('nav changed to menu'); //working well
    }, []);

    return (
        <>
            <header>
                쥬쥬쥬쥬점
            </header>
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