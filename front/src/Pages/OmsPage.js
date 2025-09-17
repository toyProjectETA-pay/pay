import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/oms.css';

// ✅ API Base URL
const API_URL = process.env.REACT_APP_API_URL || "http://54.180.22.253/api";

const OmsPage = (props) => {
    const [orders, setOrders] = useState([]);
    const [isActive, setIsActive] = useState({});

    useEffect(() => {
        const fetchPaidOrders = async () => {
            if (!props.menuData || props.menuData.length === 0) return;

            try {
                const res = await axios.get(`${API_URL}/orders/kitchen`, {
                    params: {
                        is_paid: true,
                        is_ready: false,
                        is_done: false
                    }
                });

                const shouldBeReady = res.data.map(order => {
                    return {
                        ...order,
                        items: order.items.map(it => {
                            const menuObj = props.menuData.find(menu => menu.id === it.menu);
                            return {
                                ...it,
                                displayName: menuObj 
                                    ? (menuObj.desc || menuObj.name) 
                                    : 'Unknown'
                            };
                        })
                    }
                });

                setOrders(shouldBeReady);

            } catch (err) {
                console.error("주문 가져오기 실패:", err.message);
            }
        };

        fetchPaidOrders();

        const autoRefresh = setInterval(() => {
            fetchPaidOrders();
        }, 30000);

        return () => clearInterval(autoRefresh);
    }, [props.menuData]);

    const createdTime = (created_at) => {
        const createdTime = new Date(created_at);
        const now = new Date();
        const diffMins = Math.floor((now - createdTime) / 1000 / 60);
        return diffMins;
    };

    const handleReady = async (orderId) => {
        try {
            const res = await axios.patch(`${API_URL}/orders/${orderId}/ready/`, {
                is_ready: true
            });
            setOrders(prev =>
                prev.map(order =>
                    order.id === orderId ? { ...order, is_ready: true } : order
                )
            );
            console.log('PATCH 성공:', res.data);
        } catch (err) {
            console.error("PATCH 실패:", err.message);
        }
    };

    let memos = (
        orders.map((orders) => (
            <div key={orders.id} className={`memo-container ${isActive[orders.id] ? 'done' : ''}`}>
                <div className='order-info'>
                    <span>#{orders.id}</span>
                    <span className='order-time'> ({createdTime(orders.created_at)}분 전)</span>
                </div>
                <div className='table-info'>{orders.table}번 테이블</div>
                <ul className='menu-info'>
                    {orders.items.map((items) => (
                        <li key={items.menu}>
                            <span className={
                                items.displayName === '합석 성공 시 사이드 증정' ? 'hapsuk' : 'menu'
                            }>
                                {items.displayName}
                            </span>
                            <span> ✖️ </span>
                            <span className='menu-qty'>{items.quantity}</span>
                        </li>
                    ))}
                </ul>
                <div>
                    <input placeholder='해당 주문 담당 주방'></input>
                    <input placeholder='해당 주문 담당 서빙'></input>
                </div>
                
                <button
                    onClick={() => {
                        handleReady(orders.id);
                        setIsActive(prev => ({ ...prev, [orders.id]: true }));
                    }}
                >준비완료</button>
            </div>
        ))
    );

    return (
        <div className='memo-board'>{memos}</div>
    );
}

export default OmsPage;
