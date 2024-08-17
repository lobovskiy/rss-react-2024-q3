import { forwardRef } from 'react';
import classNames from 'classnames';

import './UncontrolledInput.css';

interface Props {
  className?: string;
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  onInput: (event: React.FormEvent<HTMLInputElement>) => void;
}

const UncontrolledInput = forwardRef<HTMLInputElement, Props>(
  ({ className, id, label, type, errorMessage, onInput }, ref) => {
    return (
      <div className={classNames('uncontrolled-input', className)}>
        <label htmlFor={id}>{label}</label>
        <input
          className={classNames('uncontrolled-input__input', {
            'uncontrolled-input__input_error': !!errorMessage,
          })}
          type={type}
          id={id}
          ref={ref}
          onInput={onInput}
        />
        {errorMessage && (
          <span className="uncontrolled-input__hint">{errorMessage}</span>
        )}
      </div>
    );
  }
);
UncontrolledInput.displayName = 'UncontrolledInput';

export default UncontrolledInput;
