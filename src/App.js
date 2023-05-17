import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { popActions } from "./store/index";
import { Fragment } from "react";
import Notification from "./components/UI/Notification";
let firstLoad = true;
function App() {
  const dispatch = useDispatch();
  const pop = useSelector((state) => state.popReducer.pop);
  const noti = useSelector((state) => state.popReducer.notification);
  const cart = useSelector((state) => state.itemReducer);

  console.log(cart);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        popActions.showNotifications({
          status: "pending",
          title: "Sending",
          message: "Sending Cart Data",
        })
      );

      const response = await fetch(
        "https://react-http-541f2-default-rtdb.firebaseio.com/cart",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response) {
        throw new Error("Sending Cart Data Failed");
      }
      dispatch(
        popActions.showNotifications({
          status: "success",
          title: "Sent",
          message: "Data Sent Successfully",
        })
      );
    };
    if (firstLoad) {
      firstLoad = false;
      return;
    }
    fetchData().catch((error) => {
      dispatch(popActions.showNotifications({
        status: "error",
        title: "Error!!",
        message: "Sending Cart Data Failed",
      }));
    });
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
