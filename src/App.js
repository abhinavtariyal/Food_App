import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart, sendCart } from "./store/cart-actions";
import { Fragment } from "react";
import Notification from "./components/UI/Notification";
let firstLoad = true;
function App() {
  const dispatch = useDispatch();
  const pop = useSelector((state) => state.popReducer.pop);
  const noti = useSelector((state) => state.popReducer.notification);
  const cart = useSelector((state) => state.itemReducer);

  // useEffect(() => {
  //   dispatch(retrieveCart());
  // },[dispatch])
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCart(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {noti && (
        <Notification
          title={noti.title}
          status={noti.status}
          message={noti.message}
        />
      )}
      <Layout>
        {pop && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
