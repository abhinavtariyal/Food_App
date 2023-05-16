import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
const Cart = (props) => {
  const array = useSelector((state) => state.itemReducer.items);
  console.log(array);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {array.map((item,index) => (
          <CartItem key={index} item={item} />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
