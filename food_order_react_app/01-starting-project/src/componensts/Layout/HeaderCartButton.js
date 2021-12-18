import React from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useState, useEffect } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const cartctx = useContext(CartContext);
    const numberOfCartItems = cartctx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
    const btn_classes = `${classes.button} ${btnIsHighLighted? classes.bump : ''}`

    useEffect(() => {
        if (cartctx.items.length === 0) return;
        setBtnIsHighLighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighLighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
        
    }, [cartctx.items])

    return (
        <button className={btn_classes} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCartButton;