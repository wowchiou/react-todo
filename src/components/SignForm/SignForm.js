import React from 'react';
import Input from '../../UI/Input/Input';

const SignForm = props => {
  return Object.keys(props.data).map((itm, idx) => {
    return (
      <Input
        key={itm + idx}
        type={props.data[itm].type}
        inputType={props.data[itm].inputType}
        name={itm}
        config={props.data[itm].config}
        changed={e => props.changed(e, itm)}
        value={props.data[itm].value}
        valid={props.data[itm].valid}
        touch={props.data[itm].touch}
      />
    );
  });
};

export default SignForm;
