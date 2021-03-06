import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import '../../stylesheets/navbar.scss';
import PropTypes from 'prop-types'; 
import {FormattedMessage} from 'react-intl';
import messages from '../../en.messages';

const SignedOutLinks = (props) => {
  return (
    <div>
      <Nav pills>
        <NavItem>
            <NavLink to='/signup/' className="text-white nav-text">
              <FormattedMessage
                  id="signup"
                  defaultMessage='Sign Up'
              />
            </NavLink>
            <NavLink to='/signin/' className="text-white nav-text">
              <FormattedMessage
                  id="login"
                  defaultMessage='Log In'
              />
            </NavLink>
            <button id='btnLang' onClick={props.changeLanguageToHY}>{messages.arm}</button>
            <button id='btnLang' onClick={props.changeLanguageToEN}>{messages.eng}</button> 
        </NavItem>
      </Nav>
    </div>
  )
}

SignedOutLinks.propTypes = {
  changeLanguageToHY: PropTypes.func.isRequired,
  changeLanguageToEN: PropTypes.func.isRequired,
};

export default SignedOutLinks;