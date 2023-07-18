const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NRJMKLEpW7427gAhNo41IAr6ZfCrNwkOLxSDqXwnVlUR9fvV6nj7RpNtvyptoHNQT4HwhLylPPVaXAO4uQC0mX400OyCfRmy5');


  router.post('/api/payment', async (req, res) => {
    const { paymentMethodId } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // Replace with the actual amount you want to charge
        currency: 'usd', // Replace with the desired currency code
        payment_method: paymentMethodId,
        confirm: true,
      });
  
      // Payment successful
      res.json({ success: true });
    } catch (error) {
      // Payment failed
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
