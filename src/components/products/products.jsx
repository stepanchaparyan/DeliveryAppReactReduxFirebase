import React, { Component } from 'react';
import ProductList from './productList';
import Notifications from '../dashboard/notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/products.scss';
import AddProduct from './addProduct';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types'; 
import messages from '../../en.messages';

class Products extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string.isRequired
    }),
    notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired
  };
  
  render() {
    const { products, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <DocumentTitle title='Delivery Products'>
        <div className="productPage">
          <div className="productListTitle">{messages.productsList}</div>
            <ProductList products={products} />
            <hr />
            <hr />
            <div className="productListTitle">{messages.addNewProduct}</div>
            <hr />
            <hr />
            <AddProduct />
            <hr />
            <Notifications notifications={notifications} />   
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    products: state.firestore.ordered.products,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'products', orderBy: [ 'name', 'asc' ] },
    { collection: 'notifications', limit: 3, orderBy: [ 'time', 'desc' ] }
  ])
)(Products)