// LEGACY CODE ---

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body
    let purchases = []

    try {
      let sessions = await stripe.checkout.sessions.list({
        expand: ['data.subscription', 'data.payment_intent'],
      })

      // filter sessions based on stripeId
      sessions = sessions.data.filter((session) => {
        return (
          session.customer === data.stripeId &&
          session.status === 'complete' &&
          session.payment_status === 'paid' // &&
          //   session.mode === "payment"
        )
      })
      // console.log("sessions: ", sessions);

      sessions.forEach((session, index) => {
        purchases.push({
          id: session.id,
          currency: session.currency,
          customer: session.customer,
          //   customer_details: session.customer_details,
          livemode: session.livemode,
          locale: session.locale,
          productInfo: {
            orgId: session.metadata.orgId,
            stripeId: session.metadata.productId,
            slug: session.metadata.productSlug,
            categories: session.metadata.productCategory,
          },
          mode: session.mode,
          payment_status: session.payment_status,
          status: session.status,
          payment_intent: session.payment_intent,
          subscription: session.subscription,
          // payment_intent: {
          //   id: session.payment_intent.id,
          //   amount: session.payment_intent.amount,
          //   created: session.payment_intent.created,
          //   status: session.payment_intent.status,
          // },

          // subscription: {
          //   id: session.subscription.id,
          //   created: session.subscription.created,
          //   current_period_end: session.subscription.current_period_end,
          //   current_period_start: session.subscription.current_period_start,
          //   status: subscription.status,
          // },
        })

        // console.log("purchases: ", purchases);
      })

      let responses = { purchases }
      res.status(200).json(responses)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
