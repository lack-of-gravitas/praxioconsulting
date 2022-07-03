import Stripe from 'stripe'

export interface Customer {
  id: string /* primary key */
  stripe_customer_id?: string
  metadata?: Stripe.Metadata
}

export interface UserDetails {
  id: string /* primary key */
  first_name: string
  last_name: string
  full_name?: string
  avatar_url?: string
  billing_address?: Stripe.Address
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
}
