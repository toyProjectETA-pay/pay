import React, { useEffect } from 'react'
import Nav from '../Comp/Nav'
import Menu from '../Comp/Menu'
import OrderBtn from '../Comp/OrderBtn'
import { useNavigate } from 'react-router-dom'

const MenuPage = (props) => {
    const navigate = useNavigate();
    useEffect(()=>{
        props.navUsedAt('menu');
        console.log('nav changed to menu'); //working well
    }, []);
    return (
        <>
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
                onClick={()=> navigate('/aehanmute/cart/id')}
            />
        </>
    )
}

export default MenuPage