import { popActions } from ".";
import { itemActions } from ".";

export const fetchCart = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-541f2-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("this is error");
      }

      const responseData = await response.json();
      return responseData;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        itemActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        popActions.showNotifications({
          status: "error",
          title: "Error!!",
          message: "Fetching Cart Data Failed",
        })
      );
    }
  };
};

export const sendCart = (cart) => {
  return async (dispatch) => {
    dispatch(
      popActions.showNotifications({
        status: "pending",
        title: "Sending",
        message: "Sending Cart Data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-541f2-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response) {
        throw new Error("Sending Cart Data Failed");
      }
    }
      try {
        await sendRequest();
        dispatch(
          popActions.showNotifications({
            status: "success",
            title: "Sent",
            message: "Data Sent Successfully",
          })
        );
      } catch (error) {
        dispatch(
          popActions.showNotifications({
            status: "error",
            title: "Error!!",
            message: "Sending Cart Data Failed",
          })
        );
      }
    };
  };

