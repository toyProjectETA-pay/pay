import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/oms.css'

const OmsPage = (props) => {
    const [orders, setOrders] = useState([]);
    const [isActive, setIsActive] = useState({});

    //orders mapping
    useEffect(()=>{
        const fetchPaidOrders = async()=>{
            if (!props.menuData || props.menuData.length === 0) return; // 메뉴데이터 없으면 대기

            try{
                const res = await axios.get('http://127.0.0.1:8000/api/orders/kitchen', {
                    params:{
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

            } catch(err){
                // console.log('catch문 : ', err);
            }
        }
        fetchPaidOrders();

        const autoRefresh = setInterval(()=>{
            fetchPaidOrders();
        }, 30000)

        return () => clearInterval(autoRefresh);
    }, [props.menuData]);

    //콘솔로그로그로그로그로그로그로글!!!!!!!!!!!!!!!
    useEffect(() => {
        // console.log("바뀌었슨. : ", orders);
    }, [orders]);

    //현 시각 - 주문 시각 => 입장자 분들 덜 기다리시게끔
    const createdTime = (created_at) => {
        const createdTime = new Date(created_at);
        const now = new Date();
        const diffMins = Math.floor((now - createdTime) / 1000 / 60);
        return diffMins
    }
    // console.log('TESTSTSTSTT : ', createdTime("2025-09-16T10:43:56.822341+09:00"))

    //메뉴 준비가 완료 -> 준비완료 btn 클릭하고 서빙 -> btn 클릭시 'is_ready'가 true로 변경
    const handleReady = async (orderId) => {
        try {
            const res = await axios.patch(`http://127.0.0.1:8000/api/orders/${orderId}/ready/`, {
                is_ready: true
            });
            // 성공하면 프론트 상태도 갱신
            setOrders(prev =>
                prev.map(order =>
                    order.id === orderId ? { ...order, is_ready: true } : order
                )
            );
            // console.log('PATCH 요청 성공했는지보셈셈 : ', res.data)
            // console.log('PATCH 확인 : ', orders.find(orders => orders.id === orderId))
        } catch (err) {
            console.error("PATCH 실패:", err);
        }
    };


    //mapping orders set to show order lists to client
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
                        handleReady(orders.id); // 서버 PATCH
                        // 해당 주문의 active 상태 true로
                        setIsActive(prev => ({ ...prev, [orders.id]: true }));
                    }}
                >준비완료</button>
            </div>
        ))
    )

    return (
        <div className='memo-board'>{memos}</div>
    )
}

export default OmsPage