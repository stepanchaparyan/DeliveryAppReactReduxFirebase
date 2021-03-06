import React from 'react'
import SignedInLinks from './signedInLinks'
import SignedOutLinks from './signedOutLinks'
import { connect } from 'react-redux'
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import '../../stylesheets/navbar.scss';
import { FaTruck } from 'react-icons/fa';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types'; 

const MyNavbar = (props) => {
  const { auth, profile, changeLanguageToHY, changeLanguageToEN } = props;
  const links = auth.uid ? <SignedInLinks profile={profile} changeLanguageToHY={changeLanguageToHY} changeLanguageToEN={changeLanguageToEN}/>
                         : <SignedOutLinks changeLanguageToHY={changeLanguageToHY} changeLanguageToEN={changeLanguageToEN}/>;
    return (
      <Navbar className="p-2 bg-info text-white" light expand="md">
        <Container>
        <div className="iconAndTitle">
            <div className="FaTruck"> <FaTruck /></div>
            <NavbarBrand href="/">
                <FormattedMessage
                    id="projectTitle"
                    defaultMessage='projectTitle'
                />
            </NavbarBrand>
        </div>
        {links}
        </Container>
      </Navbar>
    )
}

MyNavbar.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }),
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired
  }),
  changeLanguageToHY: PropTypes.func.isRequired,
  changeLanguageToEN: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(MyNavbar)
