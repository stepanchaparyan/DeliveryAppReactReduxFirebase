import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import '../../stylesheets/auth.scss'
import { ValidationForm, TextInput, TextInputGroup } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { FaEye } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { DebounceInput } from 'react-debounce-input';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types'; 
import messages from '../../en.messages';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    type: 'password'
  }

  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string.isRequired
    }),
    authError: PropTypes.any,
    signUp: PropTypes.func.isRequired
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }
  showhidepass = (e) => {
    this.state.type === 'password' ? this.setState({type: 'text'}) : this.setState({type: 'password'})
  }
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
    return (
      <div className="loginContainer">
      <div className="formSignUp">
         <div className="logo">
           <img src={logo} alt="Logo" />
         </div>
         <div className="title">{messages.signup}</div>
         <ValidationForm onSubmit={this.handleSubmit}>
           <div className="form-group">
               <label className="lebel" htmlFor="email">{messages.email}</label>
               <DebounceInput element={TextInput}
                   debounceTimeout={500}
                   name="email"
                   id="email"
                   type="email"
                   validator={validator.isEmail}
                   errorMessage={{ validator: "Please enter a valid email" }}
                   value={this.state.email}
                   onChange={this.handleChange}
                   autoFocus
               />
           </div>
           <div className="form-group">
               <label className="lebel" htmlFor="password">{messages.password}</label>
               <DebounceInput element={TextInputGroup}
                   debounceTimeout={500}
                   name="password"
                   id="password"
                   type={this.state.type}
                   required
                   pattern=".{6,}"
                   errorMessage={{
                       required: "Password is required",
                       pattern: "Password should be at least 6 characters long"
                   }}
                   value={this.state.password}
                   onChange={this.handleChange}
                   append={<div id="eye" onClick={this.showhidepass}><FaEye /></div>}
               />
           </div>

           <div className="form-group">
               <label className="lebel" htmlFor="firstName">{messages.firstName}</label>
               <DebounceInput element={TextInputGroup}
                   debounceTimeout={500}
                   name="firstName"
                   id="firstName"
                   type="text"
                   required
                   pattern=".{3,}"
                   errorMessage={{
                       required: "FirstName is required",
                       pattern: "FirstName should be at least 3 characters long"
                   }}
                   value={this.state.firstName}
                   onChange={this.handleChange}
               />
           </div>

           <div className="form-group">
               <label className="lebel" htmlFor="lastName">{messages.lastName}</label>
               <DebounceInput element={TextInputGroup}
                   debounceTimeout={500}
                   name="lastName"
                   id="lastName"
                   type="text"
                   required
                   pattern=".{3,}"
                   errorMessage={{
                       required: "Last Name is required",
                       pattern: "Last Name should be at least 3 characters long"
                   }}
                   value={this.state.lastName}
                   onChange={this.handleChange}
               />
           </div>
           <div id="wrongUser">
               { authError ? <p>{authError}</p> : null }
           </div>
           <div className="form-group" id="btn">
                <Button className="btnSignIn" size="lg" block color="info">{messages.submit}</Button>
           </div>
       </ValidationForm>
       </div>
     </div>  
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
