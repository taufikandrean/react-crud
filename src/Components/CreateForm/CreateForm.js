import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Button, Checkbox, Form
} from 'semantic-ui-react';

import Constants from '../../Constants';

import './CreateForm.css';

const {
  defaultValue: { emptyString }
} = Constants;

const _renderFirstNameForm = (stateSetters) => {
  const { setFirstName } = stateSetters;

  return (
    <Form.Field>
      <label>First Name</label>
      <input 
        placeholder='First Name'
        onChange={(event) => setFirstName(event.target.value)}
      />
    </Form.Field>
  );
};

const _renderLastNameForm = (stateSetters) => {
  const { setLastName } = stateSetters;

  return (
    <Form.Field>
      <label>Last Name</label>
      <input 
        placeholder='Last Name'
        onChange={(event) => setLastName(event.target.value)}
      />
    </Form.Field>
  );
};

const _renderCheckbox = (states, stateSetters) => {
  const { checkbox } = states;
  const { setCheckbox } = stateSetters;

  return (
    <Form.Field>
      <Checkbox 
        label='I agree to the Terms and Conditions'
        onChange={(event) => setCheckbox(!checkbox)}
      />
    </Form.Field>
  );
};

const _handleSubmitData = (states) => () => {
  const { firstName, lastName, checkbox } = states;

  console.log('..._handleSubmitData - states', states);

  axios.post('https://619fb26b1ac52a0017ba4a09.mockapi.io/fakeData', {
    firstName, lastName, checkbox
  });
};

const _renderSubmitButton = (states) => (
  <Button 
    type='submit'
    disabled={states.isDisabled}
    onClick={_handleSubmitData(states)}
  >
    Submit
  </Button>
)

const _renderForm = (states, stateSetters) => (
  <Form className='create-form'>
    {_renderFirstNameForm(stateSetters)}
    {_renderLastNameForm(stateSetters)}
    {_renderCheckbox(states, stateSetters)}
    {_renderSubmitButton(states)}    
  </Form>
);

const useManualValidation = (states, stateSetters) => {
  const { firstName, checkbox } = states;
  const isFirstNameEmpty = firstName === emptyString;
  const isUncheckedCheckbos = checkbox === false;

  useEffect(() => {
    if (isFirstNameEmpty || isUncheckedCheckbos) {
      stateSetters.setDisable(true)
    } else {
      stateSetters.setDisable(false)
    }
  }, [firstName, checkbox, isFirstNameEmpty, isUncheckedCheckbos, stateSetters])
};

const CreateForm = () => {
  const [firstName, setFirstName] = useState(emptyString);
  const [lastName, setLastName] = useState(emptyString);
  const [checkbox, setCheckbox] = useState(false);
  const [isDisabled, setDisable] = useState(true);

  const states = { firstName, lastName, checkbox, isDisabled };
  const stateSetters = { setFirstName, setLastName, setCheckbox, setDisable };
  
  useManualValidation(states, stateSetters);

  return _renderForm(states, stateSetters);
}

export default CreateForm;
