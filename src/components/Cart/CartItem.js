import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { itemActions } from "../../store";
const CartItem = (props) => {
  const {
    item: { title, quantity, totalPrice, price, itemId },
  } = props;
  const dispatch = useDispatch();
  const increaseHandler = () => {
    dispatch(itemActions.addItem({ title, price, itemId }));
  };

  const decreaseHandler = () => {
    dispatch(itemActions.removeItem(itemId));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>
            (${price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseHandler}>-</button>
          <button onClick={increaseHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
