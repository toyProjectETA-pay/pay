import React, { useEffect } from 'react'
import Header from '../Comp/Header'
import Nav from '../Comp/Nav';

const HistoryPage = (props) => {
    useEffect(()=>{
        props.navUsedAt('history');
    }, []);

    

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