const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    let customer = {};

    // console.log("data: ", data);

    // fetch matching Customer from Stripe
    if (data.customerId !== "" || typeof data.customerId === "undefined") {
      customer = await stripe.customers.retrieve(data.customerId);
      // console.log("existing stripeCustomer: ", customer);
    } else {
      customer = await stripe.customers.create({
        email: data.customerEmail,
        name: data.customerName,
        metadata: {
          orgId: data.orgId,
          subscribed: data.subscribed,
          stale: data.stale,
        },
      });
      // console.log("new stripeCustomer: ", customer);
    }

    let params = {
      customer: customer.id,
      //customer_email: data.customerEmail,
      line_items: [{ price: data.price.id, quantity: 1 }],
      metadata: {
        customerId: customer.id,
        orgId: data.orgId,
        productId: data.productId,
        productSlug: `${data.productSlug}/content`,
        productCategory: data.productCategory,
      }, // include Klubs business id
      mode: data.price.type === "one_time" ? "payment" : "subscription", // "payment" or "subscription",
      cancel_url: `${req.headers.origin}/${data.productSlug}?canceled=true`,
      success_url: `${req.headers.origin}/user/profile/?success=true&session_id={CHECKOUT_SESSION_ID}&customerId=${customer.id}`,
    };
    // console.log("params: ", params);
    // payment_method_types: ["card"], // no longer required and managed automagically by Stripe https://stripe.com/docs/payments/dashboard-payment-methods#section-opt

    // {CHECKOUT_SESSION_ID} is a string literal; do not change it! the actual Session ID is returned in the query parameter when your customer is redirected to the success page.  // go to account page after success

    // TODO: add conditional logic here based on currency of the price usd prices do not support alipay (or wechat)
    // https://stripe.com/docs/payments/alipay
    // https://stripe.com/docs/payments/wechat-pay/accept-a-payment?platform=checkout
    // payment_method_options: {wechat_pay:{client:'web'}},

    try {
      // Create Checkout Sessions from body params.
      let session = await stripe.checkout.sessions.create(params);
      session.message = "success";
      session.requestBody = data;
      res.status(200).json(session);

      // res.json({
      //   success: "Request Session succeeded!",
      //   sessionId: session.id,
      //   url: req.url,
      //   body: req.body,
      // });

      // Redirect to the URL returned on the Checkout Session.
      // With express, you can redirect with:
      // res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
