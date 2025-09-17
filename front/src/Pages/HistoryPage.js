import React, { useEffect } from 'react';
import Header from '../Comp/Header';
import Nav from '../Comp/Nav';
import axios from 'axios';
import '../styles/list.css';

// ✅ API Base URL
const API_URL = process.env.REACT_APP_API_URL || "http://54.180.22.253/api";

const HistoryPage = (props) => {
    useEffect(() => {
        props.navUsedAt('history');

        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${API_URL}/orders/`, {
                    headers: {
                        Authorization: `Bearer ${props.token || localStorage.getItem("token")}`
                    }
                });

                const filtered = res.data
                    .filter(order => !order.is_done && order.is_paid && order.table === Number(props.table))
                    .map(order => ({
                        ...order,
                        items: order.items.filter(item => item.price !== 0)
                    }))
                    .filter(order => order.items.length > 0);

                props.onUpdateOrders(filtered);
            } catch (err) {
                console.error("주문 내역 불러오기 실패:", err.message);
            }
        };

        fetchOrders();
    }, [props.navUsedAt, props.onUpdateOrders, props.table, props.token]);

    // 주문 아이템 합산 처리
    const mergedItems = {};
    props.prevOrders.forEach(order => {
        order.items.forEach(item => {
            const menuId = item.menu;
            if (!mergedItems[menuId]) {
                mergedItems[menuId] = { ...item };
            } else {
                mergedItems[menuId].quantity += item.quantity;
                mergedItems[menuId].total += item.total;
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

    const grandTotal = mergedList.reduce((sum, item) => sum + item.total, 0);

    return (
        <>
            <Header
                goToCart={props.goToCart}
                goToHistory={props.goToHistory}
                goToMenu={props.goToMenu}
                token={props.token}
            />
            <Nav
                navState={props.navState}
                table={props.table}
            />
            <ul style={{ margin: "0", padding: "0" }}>
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
    );
};

export default HistoryPage;
