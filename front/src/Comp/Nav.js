import React, { useEffect } from 'react'
import '../styles/nav.css'
import { useSearchParams } from 'react-router-dom'


const Nav = (props) => {
    let contents;



    if(props.navState === 'menu'){
        contents = (
            <>
                <div
                    onClick={(e) => {
                        props.onChangeMenu('main');
                    }}
                    className={props.currentMenu === 'main' ? 'active' : 'inactive'}
                >
                    메인
                </div>
                <div
                    onClick={(e)=>{
                        props.onChangeMenu('side');
                    }}
                    className={props.currentMenu === 'side' ? 'active' : 'inactive'}
                >
                    사이드
                </div>
                <div
                    onClick={(e)=>{
                        props.onChangeMenu('beverage');
                    }}
                    className={props.currentMenu === 'beverage' ? 'active' : 'inactive'}
                >
                    음료
                </div>
                <div
                    onClick={(e)=>{
                        props.onChangeMenu('etc');
                    }}
                    className={props.currentMenu === 'etc' ? 'active' : 'inactive'}
                >
                    기타
                </div>
            </>
        )
    }
    else if(props.navState === 'cart' || props.navState === 'history'){
        contents = (
            <span>{props.table}번 테이블</span>
        )
    }

    return (
        <div className='nav'>
            {contents}
        </div>
    )
}

export default Nav