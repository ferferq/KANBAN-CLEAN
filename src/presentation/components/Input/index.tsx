import { TextMedium } from '@/presentation/styles/texts';
import React, { useContext } from 'react';
import { InputContainer } from './Input.styles';
import ContextForm from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(ContextForm);

  const handleChange = (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <InputContainer>
      <label htmlFor={props.name}>
        <TextMedium>{props.title}</TextMedium>
      </label>
      <input {...props} onChange={handleChange} value={state[props.name]} />
    </InputContainer>
  );
};
