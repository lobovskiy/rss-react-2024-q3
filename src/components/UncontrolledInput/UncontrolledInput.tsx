import { forwardRef } from 'react';
import classNames from 'classnames';

import '../shared/styles/input.css';

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
      <div className={classNames('input', className)}>
        <label htmlFor={id}>{label}</label>
        <input
          className={classNames('input__input', {
            input__input_error: !!errorMessage,
          })}
          type={type}
          id={id}
          ref={ref}
          onInput={onInput}
        />
        {errorMessage && <span className="input__hint">{errorMessage}</span>}
      </div>
    );
  }
);
UncontrolledInput.displayName = 'UncontrolledInput';

export default UncontrolledInput;
