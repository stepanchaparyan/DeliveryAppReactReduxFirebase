import React, { Component, Fragment } from 'react';
import { Table, Button } from 'reactstrap';
import './shopList.scss';
import { connect } from 'react-redux';
import { deleteShop } from '../../store/actions/shopActions';
import UpdateShop from './updateShop';

class ShopList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      show: false,
      id: ''
    };
  }

  toggle(e) {
    this.setState(({ 
      show: !this.state.show,
      id: Number(e.target.id) 
    }));
  }

  render () {
    const { shops } = this.props;
    return ( 
        <Table striped>
          <thead>
            <tr>
                <th className="firstTD">#</th>
                <th>Name</th>
                <th>City</th>
                <th>Address</th> 
            </tr>
          </thead>
          <tbody> 
            { shops && shops.map((shop, i) => {
                return (
                  <Fragment key={i}>
                  <tr key={i}>
                    <td className="firstTD">{i+1}</td>
                    <td>{shop.name}</td>             
                    <td>{shop.city}</td>
                    <td>{shop.address}</td>
                    <td id="x" onClick={() => this.props.deleteShop(shop.id)}>x</td>
                    <td id="tdButton">
                      <Button className="btnUpdate" outline color="info" id={i} onClick={this.toggle}>Update</Button>
                    </td>
                  </tr>
                  { this.state.show && i===this.state.id ? 
                  <tr className="updateTR">
                    <td className="emptySpace"></td>
                    <td>      
                      <UpdateShop id={shop.id} data="name"/>
                    </td>
                    <td>
                      <UpdateShop id={shop.id} data="city"/>
                    </td>                  
                    <td>
                      <UpdateShop id={shop.id} data="address"/>
                    </td>
                    <td className="emptySpace"></td>
                    <td className="emptySpace"></td>
                  </tr>  
                  : null }
                  </Fragment>
                )
              }
            )}                  
          </tbody>
      </Table>        
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteShop: (id) => dispatch(deleteShop(id))
  }
}

 export default connect(null, mapDispatchToProps)(ShopList)