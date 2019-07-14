import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { Nav, NavItem  } from 'reactstrap';
import '../../stylesheets/navbar.scss';
import PropTypes from 'prop-types'; 

 const SignedInLinks = (props) => {
  return (
    <div>
      <Nav pills>
        <NavLink exact to='/shops' className="text-white nav-text">Shops</NavLink>
        <NavLink exact to='/products' className="text-white nav-text">Products</NavLink>
        <NavItem onClick={props.signOut} className="text-white nav-text">Sign Out</NavItem>
        <NavLink exact to='/' className="text-white nav-text profileName">{props.profile.firstName}</NavLink>
        <button id='btnLang' onClick={props.changeLanguageToHY}>Arm</button>
        <button id='btnLang' onClick={props.changeLanguageToEN}>Eng</button>  
      </Nav>
    </div>
  )
}

SignedInLinks.propTypes = {
  signOut: PropTypes.func,
  changeLanguageToHY: PropTypes.func,
  changeLanguageToEN: PropTypes.func,
  profile: PropTypes.shape({
    firstName: PropTypes.string
  }),
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
