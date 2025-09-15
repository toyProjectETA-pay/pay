import React, { useEffect, useState } from 'react'
import axios from 'axios';

const OmsPage = (props) => {
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        const fetchPaidOrders = async()=>{
            try{
                const res = await axios.get('http://127.0.0.1:8000/api/orders', {
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
            console.log('바꿨슨:', shouldBeReady);

            } catch(err){
                console.log('catch문 : ', err);
            }
        }
        fetchPaidOrders();

        const autoRefresh = setInterval(()=>{
            fetchPaidOrders();
        }, 120000)

        return () => clearInterval(autoRefresh);
    }, []);

    

    return (
        <div>OmsPage</div>
    )
}

export default OmsPage