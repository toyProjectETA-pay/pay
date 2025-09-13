import React, { useEffect } from 'react'
import Header from '../Comp/Header'
import Nav from '../Comp/Nav';

const HistoryPage = (props) => {
    useEffect(()=>{
        props.navUsedAt('history');
    }, []);

    //is_done이 false 이고, is_paid가 true인 값 보여주기

    return (
        <>
            <Header
                goToCart={props.goToCart}
                goToHistory={props.goToHistory}
            />
            <Nav 
                navState={props.navState}
            />
        </>
    )
}

export default HistoryPage