import React from 'react'
import QtyBtn from './QtyBtn'
import '../styles/menu.css'

/**props : menuData(parsing된 메뉴), menyQty(메뉴고유아이디, 수량), onSelectMenu(수량 업데이트 함수) */
const Menu = (props) => {
    /**해당 메뉴의 수량을 읽어옴 (수량 변화가 없었다면 0 return) */
    const getQty = (id) => {
        const found = props.menuQty.find(item => item.id === id);
        return found ? found.qty : 0;
    };

    let menuList
    if(props.menuData == null){
        menuList = 'loading...'
    }else{
        menuList = props.menuData.items.map((data)=>{
            if(props.menuData.id === 'etc'){
                return(
                    <li key={data.id}>
                        {data.name}
                        <QtyBtn 
                            menuId={data.id}
                            qty={getQty(data.id)}
                            onSelectMenu={props.onSelectMenu}
                        />
                    </li>
                )
            }
            return(
                <li key={data.id}>
                    <div className='contents-box'>
                        <div className='text-area'>
                            <div>
                                <span>{data.name}</span>
                                <span>{data.desc}</span>
                            </div>
                            <span>{data.price.toLocaleString()}원</span>
                        </div>
                        <div className='img-area'>
                            <img src={data.image}></img>
                            <QtyBtn 
                                menuId={data.id}
                                qty={getQty(data.id)}
                                onSelectMenu={props.onSelectMenu}
                            />
                        </div>
                    </div>
                </li>
            )
        })
    }
    

    return (
        <div className='menu-list'>
            <ul>
                {menuList}
            </ul>
        </div>
    )
}

export default Menu