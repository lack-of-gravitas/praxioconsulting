import { handleAuth } from '@supabase/supabase-auth-helpers/nextjs'

export default handleAuth({
  logout: { returnTo: '/signin' },
  cookieOptions: {
    lifetime: 60 * 60 * 8,
    // lifetime: 1 * 365 * 24 * 60 * 60  // Keep the user logged in for a year.
  },
})
