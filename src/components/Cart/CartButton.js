import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { popActions } from '../../store';
import { useSelector } from 'react-redux';
const CartButton = (props) => {
  const dispatch = useDispatch()
  const totalQuantity = useSelector(state => state.itemReducer.totalQuantity)
  console.log(totalQuantity);
  const clickHandler = () => {
    dispatch(popActions.toggle())
  }
  return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
