import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from '../sidebar';
import Invoice from './dataInvoice';
import { getAllInvoices, handleInvoiceIdx } from '../../actions';

class Invoices extends Component {
  state = {
    imageURL: '',
    search: '',
  }

  async componentWillMount() {
    await this.props.getAllInvoices();
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  // handleUploadImage(ev) {
  //   ev.preventDefault();

  //   const data = new FormData();
  //   data.append('file', this.uploadInput.files[0]);
  //   data.append('filename', this.fileName.value);

  //   fetch('/upload', {
  //     method: 'POST',
  //     body: data,
  //   }).then((response) => {
  //     response.json().then((body) => {
  //       this.setState({ imageURL: `http://localhost:8000/${body.file}` });
  //     });
  //   });
  // }

  render() {
    let filteredInvoices = [];
    if (this.props.invoices) {
      filteredInvoices = this.props.invoices.filter(invoice => {
        return invoice.clientName.toLowerCase().includes(this.state.search.toLowerCase());
      });
    }
    return (
      <div className="invoice">
        <Sidebar />
        <div className="invoice-main">
          <div className="invoice-navigation">
            <input 
              className="invoice-search"
              type="text"
              placeholder="Search Invoices"
              className="invoice-search_input"
              value={this.state.search}
              onChange={this.updateSearch}
            />
            <Link to="/addinvoice"><p className="invoice-new">Add Invoice<i className="fas fa-plus  fa-fw" /></p></Link>
            <p className="invoice-sort">Sort  <br /> Data<i class="fas fa-sort fa-fw"></i></p>
          </div>
          {filteredInvoices ? (
            <div className="invoice-box">
              {filteredInvoices.map((inv, index) => {
                return (
                  <Invoice
                    key={inv._id}
                    id={inv._id}
                    invoiceID={inv.number}
                    clientName={inv.clientName}
                    company={inv.companyName}
                    handleNoteIndex={this.props.handleInvoiceIdx}
                    history={this.props.history}
                  />
                );
              })}
            </div>
          ) : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    invoices: state.auth.invoices,
  };
};

export default connect(mapStateToProps, { getAllInvoices, handleInvoiceIdx })(Invoices);
