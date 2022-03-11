import React, {Component, useRef, useEffect} from "react"; 
  
export default function Paypal (){

  const paypal = useRef();
  
  useEffect(()=>{
    window.paypal.Buttons({
      createOrder: (data, actions, err)=>{
        return actions.order.create({
          intent: "Capture",
          purchase_units: [
            {
              description: "Some strange item",
              amount: {
                 currency_code: "USD",
                 value: 250.00
              }
            }
          ]
        })
      }, 
      onApprove: async (data, actions)=>{
        const order = await actions.order.capture();
        console.log(order);
      },
      onError: (err) =>{
        console.log(err)
      }
    }).render(paypal.current);
  }, [])
  
  return ( 
    <div ref = {paypal}>
      {/* {checkout?( */}
      
        {/* ):( */}
      {/* <button onClick = {() => { setCheckOut(true);}}/> */}
      {/* )} */}
    </div>
  );
} 
 
Paypal.displayName = "Paypal"; 
