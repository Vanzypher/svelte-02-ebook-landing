import Stripe from 'stripe'
import { json } from '@sveltejs/kit'
import { PRICE_ID, STRIPE_KEY } from '$env/static/private'
import { PUBLIC_FRONTEND_URL } from '$env/static/public'

const stripe = new Stripe(STRIPE_KEY)

export async function POST() {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: [ "card" ],
            line_items: [
                {
                    price: PRICE_ID,
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: `${PUBLIC_FRONTEND_URL}/checkout/successs`,
            cancel_url: `${PUBLIC_FRONTEND_URL}/checkout/failure`,
        })

        // returning session id is deprecated and removed
        // return session url instead
        // return json({ sessionId: session.id })
        return json({ url: session.url })
    } catch(error) {
        return json({ error }, { status: 500 })
    }
}