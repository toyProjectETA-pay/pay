import React from 'react'
import Nav from '../Comp/Nav'

const CartPage = (props) => {
  props.navUsedAt('cart');
  return (
    <>
      <Nav 
        navState={props.navState}
      />
    </>
  )
}

export default CartPage