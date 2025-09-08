import React, { useEffect, useState } from 'react'
import '../styles/qtyBtn.css'

const QtyBtn = (props) => {
    const [active, setActive] = useState(false);
    const [qty, setQty] = useState(0);

    useEffect(()=>{
        if (!active) return;

        const timer = setTimeout(() => {
            setActive(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [qty, active]);

    useEffect(()=>{
        if(qty >= 0){
            props.onSelectMenu(props.menuId, qty);
        }
    }, [qty, props.menuId]);

    let btn;
    if(!active && qty === 0){
        btn = <div className="plus-shape"></div>
    }
    else if(!active && qty > 0){
        btn = <div className="btn-inactive qty">{qty}</div>
    }
    else if(active){
        
        btn = <div className="qty-controls">
                <div onClick={() => setQty(q => Math.max(0, q - 1))}>-</div>
                <span>{qty}</span>
                <div onClick={() => setQty(q => q + 1)}>+</div>
              </div>
    }
    

    return (
        <div
            key={props.key}
            className={active === false ? 'btn-inactive' : 'btn-active'}
            onClick={(e)=>{
                setActive(true);                
            }}
        >
            {btn}
        </div>
    )
}

export default QtyBtn