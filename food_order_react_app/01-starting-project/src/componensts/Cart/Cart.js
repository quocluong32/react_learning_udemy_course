import React, {useContext, useState} from 'react';
import clasess from './Cart.module.css';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addOneItem(item)
    };

    const cartItems = <ul className={clasess['cart-items']}>{cartCtx.items.map(
        (item) => <li>
            <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price} 
            onRemove={cartItemRemoveHandler.bind(null, item.id)} 
            onAdd = {cartItemAddHandler.bind(null, item)}
            /></li>)} </ul>

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const modalActions = <div className={clasess.actions}>
        <button className={clasess['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={clasess.button} onClick={orderHandler}>Order</button>}
    </div>
    return (

    <Modal onClose={props.onClose}>
        <div>
            {cartItems}
            <div className={clasess.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
                        
        </div>

    </Modal>
       
    );
};

export default Cart;