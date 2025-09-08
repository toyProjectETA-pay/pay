import React from 'react'

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