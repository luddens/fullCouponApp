import React, {Component} from "react";
import {Elements, CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51HxjZGBpF4mOeOLxsJ3BGnRqBSdUcGweK8eyYLboC3IGRCBvUaEK2FVv5MS8alqsdtUjTFdIa6pBN88buZvgzw5s00AKtxKtia");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event)=>{
    event.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if(!error){
      console.log("paymentMethod");
      
      let params = {id:"pm_1IA4rNBpF4mOeOLxNZorFRkw", amount: "500"};

      console.log(params);
      try{
        fetch("/stripe/pay", {
          method: "POST",
          body: JSON.stringify(params),
          headers:{
            "Content-Type": "application/json",
          }}).then((response)=>{
              if(response.status === 200){
                  const reader = response.body.getReader();
                  reader.read().then((res)=>{
                      let token = String.fromCharCode.apply(null, res.value);
                      console.log(res);
                  });
              } else {
                  console.log(response);
              }
          });
      } catch (error){

      }
    }


  }
  
  return <form onSubmit = {handleSubmit}>
      <CardElement/>
      <button type = "submit" disabled={!stripe}>Pay me!</button>
  </form>;
}
  
const Index = () => {
    return ( 
    <div style ={{width: "400px"}}>
      <Elements style= {{backgroundColor: "black"}} stripe={stripePromise} id = "POS">
        <CheckoutForm/>
      </Elements>
    </div>
    );
} 

Index.displayName = "POS component";

export default Index;
