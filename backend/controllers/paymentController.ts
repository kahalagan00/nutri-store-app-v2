import { RequestHandler } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

const FRONTEND_LINK = 'https://jhuv-nutrition-v2.netlify.app';

type CartItem = {
  name: string;
  image: string;
  price: number;
  productId: string;
  purpose: string;
  quantity: number;
};

dotenv.config({ path: './config.env' });

const stripe = new Stripe((process.env.STRIPE_SECRET_KEY as string) || '', {
  apiVersion: '2023-08-16' as any,
});

const createCheckoutSession: RequestHandler = async (req, res) => {
  try {
    console.log('CREATE CHECKOUT SESSION HIT 📋');
    // console.log(req.body);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map((item: CartItem) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [`${FRONTEND_LINK}/images/products/${item.image}`], // Stripe supports only a single image per product
            description: item.purpose, // Additional description
          },
          unit_amount: Math.round(item.price * 100), // Amount in cents * 100
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`, // For development
      cancel_url: `http://localhost:5173/cart`, // For development
      // success_url: `${FRONTEND_LINK}/home`, // --> Go to homepage upon successful payment transaction
      // cancel_url: `${FRONTEND_LINK}/account`, // --> Should go back to cart if transaction failed/canceled
    });

    res.json({ sessionId: session.id }); // Return session ID to frontend
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message:
        err instanceof Error
          ? err.message
          : 'An error occured when trying to make payment with Stripe',
    });
  }
};

const paymentStatus: RequestHandler = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(
      sessionId as string
    );

    console.log('PAYMENT STATUS HIT 💳');

    if (session.payment_status === 'paid') {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'pending' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Unable to retrieve session' });
  }
};

// const handleWebhook: RequestHandler = async (req, res) => {
//   const sig = req.headers['stripe-signature'] as string;
//   // const endpointSecret = 'your-webhook-secret'; // Found in the Stripe Dashboard
//   const endpointSecret =
//     'whsec_e4876fa916c86bd79756f3aa331450749ad50ff6ed3db2807bac7baf561b1796';

//   try {
//     const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

//     switch (event.type) {
//       case 'checkout.session.completed':
//         const session = event.data.object as Stripe.Checkout.Session;
//         console.log('Payment successful for session:', session.id);
//         // Handle success (e.g., update order status, email confirmation)
//         break;

//       case 'payment_intent.payment_failed':
//         const paymentIntent = event.data.object as Stripe.PaymentIntent;
//         console.log(
//           'Payment failed:',
//           paymentIntent.last_payment_error?.message
//         );
//         // Handle failure (e.g., notify user, retry logic)
//         break;

//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     res.status(200).send();
//   } catch (err) {
//     console.error('Webhook error:', err.message);
//     res.status(400).send(`Webhook Error: ${err.message}`);
//   }
// };

export { createCheckoutSession, paymentStatus };
