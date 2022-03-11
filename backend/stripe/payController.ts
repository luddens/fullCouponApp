// const UserData = require("../dataAccess/users");
// const ListData = require("../dataAccess/lists");
const secret = require("../../localconfig").stripe.secret;
const Stripe = require("stripe");
const checkout = new Stripe(secret);
 
const payController = ()=> {
  const lookUpAndPay = async (req, res) => {
    if(!n(req.body)){
        const {id, amount} = req.body;
    
        try {
            const payment = await checkout.paymentIntents.create({
                amount: amount,
                currency: "USD",
                description: "Some fake item",
                payment_method: id,
                confirm: true
            }).then(()=>{
                res.send(payment)
            })
    
        } catch (error){
            res.send({
                message: error.raw.message
            })
        }
        // res.send(payment)
    } else {
    //   l("User not logged in");
    //   res.status("204").send({data: "User not logged in"});
    }
  };

  return {
    lookUpAndPay
  };
};

export = payController();