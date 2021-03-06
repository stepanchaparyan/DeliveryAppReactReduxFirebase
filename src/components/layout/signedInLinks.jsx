import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { Nav, NavItem  } from 'reactstrap';
import '../../stylesheets/navbar.scss';
import PropTypes from 'prop-types'; 
import {FormattedMessage} from 'react-intl';
import messages from '../../en.messages';

 const SignedInLinks = (props) => {
  return (
    <div>
      <Nav pills>
        <NavLink exact to='/shops' className="text-white nav-text">
          <FormattedMessage
            id="shops"
            defaultMessage='Shops'
          />
        </NavLink>
        <NavLink exact to='/products' className="text-white nav-text">
          <FormattedMessage
            id="products"
            defaultMessage='Products'
          />
        </NavLink>
        <NavItem onClick={props.signOut} className="text-white nav-text">
          <FormattedMessage
            id="signout"
            defaultMessage='Sign Out'
          />
        </NavItem>
        <NavLink exact to='/' className="text-white nav-text profileName">{props.profile.firstName}</NavLink>
        <button id='btnLang' onClick={props.changeLanguageToHY}>{messages.arm}</button>
        <button id='btnLang' onClick={props.changeLanguageToEN}>{messages.eng}</button>  
      </Nav>
    </div>
  )
}

SignedInLinks.propTypes = {
  signOut: PropTypes.func.isRequired,
  changeLanguageToHY: PropTypes.func.isRequired,
  changeLanguageToEN: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired
  }),
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
