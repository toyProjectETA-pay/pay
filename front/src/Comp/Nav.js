import React from 'react'
import '../styles/nav.css'

const Nav = (props) => {

    return (
        <div className='nav'>
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
        </div>
    )
}

export default Nav