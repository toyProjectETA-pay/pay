import React from 'react'
import QtyBtn from './QtyBtn'

const Menu = (props) => {
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
                            onSelectMenu={props.onSelectMenu}
                        />
                    </li>
                )
            }
            return(
                <li key={data.id}>
                    <div>
                        <div>
                            <span>{data.name}</span>
                            <span>{data.desc}</span>
                        </div>
                        <span>{data.price}</span>
                    </div>
                    <img src={data.image}></img>
                    <QtyBtn 
                        menuId={data.id}
                        onSelectMenu={props.onSelectMenu}
                    />
                </li>
            )
        })
    }
    

    return (
        <ul>
            {menuList}
        </ul>
    )
}

export default Menu