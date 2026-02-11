<script>
    import { loadStripe } from '@stripe/stripe-js'
    import { PUBLIC_STRIPE_KEY } from '$env/static/public'
    import { goto } from '$app/navigation'
    
    // console.log(PUBLIC_STRIPE_KEY)

    let { children, ...props } = $props();
    
    async function onclick() {
        try {
            const stripe = await loadStripe(PUBLIC_STRIPE_KEY); 
        
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ 
                    /* your item data */ 
                }),
            })
            .then((response) => response.json())
            .then((session) => {
                // Redirect to the URL returned in the session object
                window.location.href = session.url; 
                // You could also use window.location.replace(session.url) 
                // to prevent the checkout page from being in the browser history.
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } catch(error) {
            goto("/checkout/failure")
        }

       
        // const { sessionId } = await response.json();
        
        // console.log(sessionId)
        
        // // The stripe.redirectToCheckout method is no longer supported in Stripe.js.
        // await stripe.redirectToCheckout({ sessionId })

        // window.location.href = "https://buy.stripe.com/test_aFa8wR1z096b7wzgla5Vu00"
    }
</script>

<button {...props } {onclick}>{@render children()}</button>

<style>
    button {
       background-color: black; 
       color: white;
       padding: 20px 24px;
       font-weight: normal;
       font-size: 22px;
       text-transform: uppercase;
       transition: all 0.3s;
       border: 1px solid white;
    }
    
    button:hover {
        background-color: white;
        color: black;
    }
</style>