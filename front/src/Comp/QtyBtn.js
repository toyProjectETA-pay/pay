import React, { useEffect, useState } from 'react'
import '../styles/qtyBtn.css'

/**props: menuId(해당 메뉴의 고유아이디), qty(해당 메뉴를 담은 수량), onSelectMenu(수량 업데이트 함수) */
const QtyBtn = (props) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (props.navState === 'cart') {
            setActive(true);
        }
    }, [props.navState]);
    
    /**수량 버튼 activate 시키는 역할, 
     * 버튼과 상호작용 있을 시 타이머 초기화, 5초 이상 상호작용 없을 시 원으로 돌아감 */
    useEffect(()=>{
        if (!active || props.navState === 'cart') return;

        const timer = setTimeout(() => {
            setActive(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [active, props.navState]);

    let btn;
    if(!active && props.qty === 0){
        btn = <div className="plus-shape"></div>
    }
    else if(!active && props.qty > 0){
        btn = <div className="btn-inactive qty">{props.qty}</div>
    }
    else if(active){
        btn = <div className="qty-controls">
                <div onClick={() => props.onSelectMenu(props.menuName, Math.max(0, props.qty - 1))}>-</div>
                <span>{props.qty}</span>
                <div onClick={() => props.onSelectMenu(props.menuName, props.qty + 1)}>+</div>
              </div>
    }
    

    return (
        <div
            key={props.menuName}
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