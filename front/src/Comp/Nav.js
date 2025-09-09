import React from 'react'
import '../styles/nav.css'

const Nav = (props) => {
    let contents;
    let table_num = 1;  //dummy
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
    else if(props.navState === 'cart'){
        contents = (
            <span>{table_num}번 테이블</span>
        )
    }

    return (
        <div className='nav'>
            {contents}
        </div>
    )
}

export default Nav