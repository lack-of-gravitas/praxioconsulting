const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("req.body: ", req.body);

    // grab post params for customer id, terms etc.
    let params = {
      org: req.body.org, // org name i.e. LVT or TRK
      customer: req.body.customerId, // req.body.customerId, // customer id to create the session for
    };

    // https://stripe.com/docs/api/customer_portal/sessions/create
    // create portal configuration - use to dynamically render terms/privacy URLs per org
    const configuration = await stripe.billingPortal.configurations.create({
      features: {
        customer_update: {
          allowed_updates: ["email"],
          enabled: false,
        },
        // invoice_history: { enabled: true },
        payment_method_update: { enabled: true },
      },
      business_profile: {
        headline: ``,
        privacy_policy_url: `${req.headers.origin}/privacy`,
        terms_of_service_url: `${req.headers.origin}/terms`,
      },
      default_return_url: `${req.headers.origin}/user/profile`,
    });

    console.log('configuration: ', configuration);

    try {
      // create Portal Session
      const session = await stripe.billingPortal.sessions.create({
        customer: params.customer,
        configuration: configuration.id,
      });

      // Redirect to the URL returned on the Portal Session.       // With express, you can redirect with:
      res.redirect(303, session.url);
      
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
