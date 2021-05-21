import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = token => {
    const body = {
      token,
      products
    };
    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log(response);
        const {status} =response;
        console.log("STATUS : ",status);
        cartEmpty();
      })
      .catch(error => console.log(error));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51Is5yySAkBGLitIPG7mL9hUPwqgvxWbQRlycMNSaS3OI6dtlmL7bjKyKf0xb3HQEMZ82axUcuWpiyH2kX9bAos2E00KRldhG0a"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
