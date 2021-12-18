import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enterNameWasTouched, setEnterNameWasTouched] = useState(false);

  const enterNameIsValid = enteredName.trim() !== ''; 
  const nameInputIsInvalid = !enterNameIsValid && enterNameWasTouched;

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
    if(event.target.value !== '') setEnterNameWasTouched(true);
    else setEnterNameWasTouched(false);
    
  };

  const nameInputBlurHandler = event => {
    setEnteredName(event.target.value);
    setEnterNameWasTouched(true);
    return;
  }
  

  const formSubmitHandler = event => {
    event.preventDefault();
    setEnterNameWasTouched(true);
    if (!enterNameIsValid) return;
    console.log(enteredName);
    setEnteredName('');
    setEnterNameWasTouched(false);
  }

  const nameInputClasses = nameInputIsInvalid? "form-control invalid" : "form-control";

  return (
    <form onSubmit = {formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' 
        onChange={nameInputChangeHandler} 
        onBlur = {nameInputBlurHandler}
        value={enteredName} required/>
        {!nameInputIsInvalid && <p className="error-text">Input cannot be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
