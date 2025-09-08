import React from 'react'
import Nav from '../Comp/Nav'
import Menu from '../Comp/Menu'
import OrderBtn from '../Comp/OrderBtn'
import { useNavigate } from 'react-router-dom'

const MenuPage = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <Nav 
                currentMenu={props.currentMenu}
                onChangeMenu={props.onChangeMenu}
            />
            <Menu 
                menuData={props.menuData}
                menuQty={props.menuQty}
                onSelectMenu={props.onSelectMenu}
            />
            <OrderBtn
                currentState={props.currentState}
                onClick={()=> navigate('./cart')}
            />
        </>
    )
}

export default MenuPage