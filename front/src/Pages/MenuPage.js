import React, { useEffect } from 'react'
import Nav from '../Comp/Nav'
import Menu from '../Comp/Menu'
import OrderBtn from '../Comp/OrderBtn'
import { useNavigate, useSearchParams } from 'react-router-dom'

const MenuPage = (props) => {
    // 하겅추가  url로부터 table number 받기 
    // 화면에 테이블 번호 출력하고 싶다면 table 변수를 쓰시오~~!! 
    const [searchParams] = useSearchParams(); // 배열 구조분해라네 
    const table = searchParams.get("table");  
    const navigate = useNavigate();

    const goToCart = () => {
        navigate(`/aehanmute/cart?table=${table}`);
    };


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
                onClick={goToCart}
            />
        </>
    )
}

export default MenuPage