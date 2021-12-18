import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state,action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6}
  };

  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }

  return {value: '', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] =  useReducer(emailReducer,{
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchpassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  })

  const authCtx = useContext(AuthContext)

  useEffect(() => {

    const indentifier = setTimeout(() => {
      console.log("Checking validity")
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 1000)

    return () => {
      console.log("Clean Up")
      clearTimeout(indentifier)
    }
  }, [emailState.isValid, passwordState.isValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
    
  };

  const passwordChangeHandler = (event) => {
    dispatchpassword({type: 'USER_INPUT', val: event.target.value})

  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchpassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {

    } else if (!passwordState.isValid) {

    };
    
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        < Input id = "email"
        label = "E-Mail"
        type = "email"
        isValid = {
          emailState.isValid
        }
        value = {
          emailState.value
        }
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />
      
      <Input  
        id="password"
        label="password"
        type="password"
        isValid={passwordState.isValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
      />
       
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
