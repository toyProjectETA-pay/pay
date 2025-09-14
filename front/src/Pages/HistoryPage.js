import React, { useEffect, useState } from 'react'
import Header from '../Comp/Header'
import Nav from '../Comp/Nav';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import '../styles/list.css'

const HistoryPage = (props) => {
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
                // .filter(order => order.is_paid)
                .filter(order => !order.is_done && order.is_paid && order.table === Number(table))
                .map(order => ({
                    ...order,
                    items: order.items.filter(item => item.price !== 0)
                }))
                .filter(order => order.items.length > 0);
            console.log('시발왜이렇게많이넘어오지? : ', res.data)
            console.log(table)
            props.onUpdateOrders(filtered);
            } catch (err) {
            console.error(err);
            }
        };
        fetchOrders();
    }, []);

    const mergedItems = {};
    props.prevOrders.forEach(order => {
        order.items.forEach(item => {
        const menuId = item.menu; // 숫자 id
        if (!mergedItems[menuId]) {
            mergedItems[menuId] = { ...item }; // 처음이면 그대로 저장
        } else {
            mergedItems[menuId].quantity += item.quantity; // 수량 합산
            mergedItems[menuId].total += item.total;       // 총액 합산
        }
        });
    });

    const mergedList = Object.values(mergedItems).map(item => {
        const menuObj = props.menuData.find(menu => menu.id === item.menu);
        return {
            ...item,
            name: menuObj ? menuObj.name : 'Unknown'
        };
    });
    console.log(mergedList);

    const grandTotal = mergedList.reduce((sum, item) => sum + item.total, 0);

    return (
        <>
            <Header
                goToCart={props.goToCart}
                goToHistory={props.goToHistory}
                goToMenu={props.goToMenu}
            />
            <Nav 
                navState={props.navState}
            />
            <ul style={{
                margin:"0",
                padding:"0"
            }}>
                {mergedList.map(item => (
                    <li key={item.menu} className='list'>
                        <span>{item.name}</span>
                        <p> X {item.quantity} </p>
                        <span>{item.total.toLocaleString()}원</span>
                    </li>
                ))}
            </ul>
            <div className='sum'>
                총 {grandTotal.toLocaleString()}원
            </div>
        </>
    )
}

export default HistoryPage