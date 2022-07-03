import { stripe } from '@lib/stripe'
import {
  getUser,
  withAuthRequired,
} from '@supabase/supabase-auth-helpers/nextjs'
import { createOrRetrieveCustomer } from '@lib/supabase-admin'
import { getURL } from '@lib/api-helpers'
import { NextApiRequest, NextApiResponse } from 'next'

const createCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { price, quantity = 1, metadata = {} } = req.body

    try {
      const { user } = await getUser({ req, res })

      const customer = await createOrRetrieveCustomer({
        uuid: user?.id || '',
        email: user?.email || '',
      })

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        customer,
        line_items: [
          {
            price: price.id,
            quantity,
          },
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        subscription_data: {
          trial_from_plan: true,
          metadata,
        },
        success_url: `${getURL()}/account`,
        cancel_url: `${getURL()}/`,
      })

      return res.status(200).json({ sessionId: session.id })
    } catch (err: any) {
      console.log(err)
      res.status(500).json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default withAuthRequired(createCheckoutSession)

// LEGACY CODE BELOW
// GOES TO CHECKOUT SESSION INSTANCE CREATED BY PREV API CALL FOR CUSTOMER CHECKING OUT
// REDIRECTS BACK TO ACCOUNT PAGE

// #################################################################################

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// export default async function handler(req, res) {
//   const id = req.query.id;
//   try {
//     if (!id.startsWith("cs_")) {
//       throw Error("Incorrect CheckoutSession ID.");
//     }
//     const checkout_session = await stripe.checkout.sessions.retrieve(id, {
//       expand: ["payment_intent"],
//     });

//     res.status(200).json(checkout_session);
//   } catch (err) {
//     res.status(500).json({ statusCode: 500, message: err.message });
//   }
// }
