import { TextMedium } from '@/presentation/styles/texts';
import React, { useContext } from 'react';
import { TextAreaContainer } from './TextArea.styles';
import ContextForm from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const TextArea: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(ContextForm);

  const handleChange = (
    event: React.FocusEvent<HTMLTextAreaElement, Element>,
  ): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <TextAreaContainer>
      <label htmlFor={props.name}>
        <TextMedium>{props.title}</TextMedium>
      </label>
      <textarea {...props} onChange={handleChange} value={state[props.name]} />
    </TextAreaContainer>
  );
};
