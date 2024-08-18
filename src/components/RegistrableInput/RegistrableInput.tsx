import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  id: string;
  label: string;
  registerReturn: UseFormRegisterReturn;
  errorMessage?: string;
}

const RegistrableInput: React.FC<Props> = ({
  className,
  type,
  id,
  label,
  registerReturn,
  errorMessage,
}) => {
  return (
    <div className={classNames('input', className)}>
      <label htmlFor={id}>{label}</label>
      <input
        className={classNames('input__input', {
          input__input_error: !!errorMessage,
        })}
        type={type}
        id={id}
        {...registerReturn}
      />
      {errorMessage && <span className="input__hint">{errorMessage}</span>}
    </div>
  );
};

export default RegistrableInput;
