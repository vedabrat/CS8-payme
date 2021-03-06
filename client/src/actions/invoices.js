import axios from 'axios';

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const SUCCESS = 'SUCCESS';
export const ADD_INVOICE = 'ADD_INVOICE';
export const ALL_INVOICE = 'ALL_INVOICE';
export const INVOICE_IDX = 'INVOICE_IDX';
export const CURRENT_INVOICE = 'CURRENT_INVOICE';
export const ARRAY_MOVE = 'ARRAY_MOVE';
export const RESET_CURRINV = 'RESET_CURRINV';

const token =  localStorage.getItem('id');
axios.defaults.headers.common['Authorization'] = `bearer ${token}`;

/////////////////////////////////////
// Invoices
////////////////////////////////////

export function authError(error) {
  if (error) {
    return {
      type: AUTHENTICATION_ERROR,
      payload: error,
    };
  }
}

export function resetCurrInv() {
  return {
    type: RESET_CURRINV,
    payload: '',
  };
}


export function getAllInvoices() {
  return dispatch => {
    axios.get('/api/invoices', { headers: { Authorization: `bearer ${localStorage.getItem('id')}` } })
      .then(res => {
        dispatch({ type: ALL_INVOICE, payload: res.data });
      })
      .catch(err => {
        if (err) console.log('error: ', err);
        dispatch(authError('Error retrieving invoices', err));
      });
  };
}


export function addInvoice(info, history) {
  return dispatch => {
    axios.post('/api/addinvoice', info, { headers: { Authorization: `bearer ${localStorage.getItem('id')}` } })
      .then(res => {
        history.push('/invoices');
        console.log(res.data);
        dispatch({ type: SUCCESS, payload: 'Added a new invoice'});
      })
      .catch(err => dispatch(authError('Error adding an invoice', err)));
  };
}

export function updateInvoice(credentials, history) {
  return (dispatch, getState) => {
    const data = { ...credentials, email: { address: credentials.email }, phone: { number: credentials.phone } };
    const { number } = getState().invoice.currentInvoice;
    axios.put(`/api/updateinvoice/${number}`, data, { headers: { Authorization: `bearer ${localStorage.getItem('id')}` } })
      .then(res => {
        history.push('/invoices');
        dispatch({ type: SUCCESS, payload: 'Updated your invoice' });
        console.log(res);
      })
      .catch(err => dispatch(authError('Error adding an invoice', err)));
  };
}

export function deleteInvoice(invoiceNumber, history) {
  return dispatch => {
    console.log(invoiceNumber);
    axios.delete(`/api/deleteinvoice/${invoiceNumber}`, { headers: { Authorization: `bearer ${localStorage.getItem('id')}` } })
      .then(res => {
        console.log(res);
        history.push('/invoices');
        dispatch({ type: SUCCESS, payload: `Deleted invoice #${invoiceNumber}` });
      })
      .catch(err => dispatch(authError('Error deleting invoice', err)));
  };
}

export function getInvoice(id) {
  return dispatch => {
    axios.get(`/api/invoices/${id}`, { headers: { Authorization: `bearer ${localStorage.getItem('id')}` } })
      .then(res => {
        dispatch({ type: 'CURRENT_INVOICE', payload: res.data });
      })
      .catch(err => {
        if (err) console.log('error: ', err);
        dispatch(authError('Error retrieving invoices', err));
      });
  };
}
export function getPdf(id) {
  return dispatch => {
    axios.get(`/api/getpdf/${id}`, { headers: { Authorization: `bearer ${localStorage.getItem('id')}` } })
      .then(res => console.log(res.data))
      .catch(err => {
        if (err) console.log('error: ', err);
        dispatch(authError('Error retrieving invoices', err));
      });
  };
}

export function handleInvoiceIdx(inputID, history) {
  return (dispatch, getState) => {
    const { invoices } = getState().invoice;
    console.log(inputID);
    invoices.forEach((invoice, i) => {
      if (invoice.number === inputID) {
        dispatch({ type: 'INVOICE_IDX', payload: i });
        dispatch({ type: 'CURRENT_INVOICE', payload: invoice });
        history.push({ pathname: `/invoice/${invoice.number}` });
      }
    });
  };
}

export const onSortEnd = orderList => {
  return {
    type: 'ARRAY_MOVE',
    payload: orderList,
  };
};
