import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class AdminBilling extends Component {
  render() {
    return (
      <div className="window" style={{ display: 'flex' }}>
        <div
          className="modal"
          style={{ justifyContent: 'center', alignItems: 'center', margin: 'auto' }}
        >
          <StripeProvider apiKey={process.env.STRIPE_PK || 'pk_test_ILI7ZfrCQbKaNU5WAVRa6yg6'}>
            <div className="example">
              <h1>Can change</h1>
              <Elements>
                <CheckoutForm />
              </Elements>
            </div>
<<<<<<< HEAD
          </div>
        </form>
        {this.checkoutButton()}
        <div
          onClick={() => {
            axios
              .get('/stripe/authorize', {
                headers: { Authorization: localStorage.getItem('id') },
              })
              .then(response => console.log(response));
          }}
        >
          TESTING FOR NOW
=======
          </StripeProvider>
>>>>>>> master
        </div>
      </div>
    );
  }
}

export default AdminBilling;
