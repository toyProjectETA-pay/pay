import React, { useEffect, useState } from 'react'
import Header from '../Comp/Header'
import Nav from '../Comp/Nav';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const HistoryPage = (props) => {
    const [orders, setOrders] = useState([]);
    const [searchParams] = useSearchParams();
    const table = searchParams.get("table");

    //is_done이 false 이고, is_paid가 true인 값 보여주기
    useEffect(() => {
        props.navUsedAt('history');

        const fetchOrders = async () => {
            try {
            const res = await axios.get('http://127.0.0.1:8000/api/orders/', {
                params: { table: table } // 쿼리스트링으로 table 넘김
            });
            const filtered = res.data
                .filter(order => order.is_paid)
                // .filter(order => !order.is_done && order.is_paid)
                .map(order => ({
                    ...order,
                    items: order.items.filter(item => item.price !== 0)
                }))
                .filter(order => order.items.length > 0);

            setOrders(filtered);
            console.log('orders : ', orders);
            } catch (err) {
            console.error(err);
            }
        };

        fetchOrders();
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