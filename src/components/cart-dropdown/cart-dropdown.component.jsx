import React from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import CustomButton from "../custom-button/custom-button.component";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import './cart-dropdown.styles.scss';

const CartDropDown=({cartItems,dispatch})=>{
    const navigate = useNavigate(); 
    return(
<div className="cart-dropdown">
    <div className="cart-items">
        { 
            cartItems.length ?
            cartItems.map(cartItem=>(
                <CartItem key={cartItem.id} item={cartItem}/>
            ))
            : <span className="empty-massage">Your cart is empty</span>
        }
          
    </div>
    <CustomButton onClick={() => {
        navigate(`checkout`);
        dispatch(toggleCartHidden())
        
         }} >
        
        CHECKOUT</CustomButton>
</div>
);
    }

const mapStateToProps=createStructuredSelector({
    cartItems:selectCartItems
});

export default connect(mapStateToProps) (CartDropDown);