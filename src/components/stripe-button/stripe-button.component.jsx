import React from "react";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton=({price})=>{
    const priceForStripe= price*100;
    const publishableKey='pk_test_51KVzY3KgUQnXY8BRpn6uXXLrJFWnJR54bqeR8CZcrPbiwraXd1PnoVnKXDoHZTonVOBXMjAkUjiJ4Zy9AtefyEKy00NJeLhXDx';
   
    const onToken=token=>{
        console.log(token);
        alert("Payment Successful");
    }
   
    return(
        <StripeCheckout
        label="Pay Now"
        name="Dx Shop"
        billingAddress
        shippingAddress
        image="../../assets/084 crown.svg"
        description={`Your total is ${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;