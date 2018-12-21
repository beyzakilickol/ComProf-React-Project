import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import stripelogo from './stripelogo.png'

import STRIPE_PUBLISHABLE from '../constants/stripe';
import PAYMENT_SERVER_URL from '../constants/server';
import axios from 'axios'


export default class TakeMoney extends React.Component {
  onToken = (token) => {
    axios.post('http://localhost:3001', {
        token: token
    }).then(response => {
      console.log(response.data)
    });
  }

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_aYZkqibzho9OQ5duPHqv7OaO"
        name="COMPROF"
        description='Great platform to meet professionals'
        image={stripelogo}
        amount="0999" // cents
        currency="USD"
        locale="auto"
        email="beyzakilickolakurek@gmail.com"
      />
    )
  }
}
