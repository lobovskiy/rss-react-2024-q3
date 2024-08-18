import { forwardRef } from 'react';
import classNames from 'classnames';

import '../shared/styles/input.css';

interface Props {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  id: string;
  label: string;
  accept?: React.InputHTMLAttributes<HTMLInputElement>['accept'];
  errorMessage?: string;
  onInput: (event: React.FormEvent<HTMLInputElement>) => void;
}

const InputRef = forwardRef<HTMLInputElement, Props>(
  ({ className, id, label, type, accept, errorMessage, onInput }, ref) => {
    return (
      <div className={classNames('input', className)}>
        <label htmlFor={id}>{label}</label>
        <input
          className={classNames('input__input', {
            input__input_error: !!errorMessage,
          })}
          type={type}
          id={id}
          accept={accept}
          ref={ref}
          onInput={onInput}
        />
        {errorMessage && <span className="input__hint">{errorMessage}</span>}
      </div>
    );
  }
);
InputRef.displayName = 'InputRef';

export default InputRef;
