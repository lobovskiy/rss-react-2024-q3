import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';

interface Props {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  id: string;
  label: string;
  accept?: React.InputHTMLAttributes<HTMLInputElement>['accept'];
  registerReturn: UseFormRegisterReturn;
  errorMessage?: string;
}

const RegistrableInput: React.FC<Props> = ({
  className,
  type,
  id,
  label,
  accept,
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
        accept={accept}
        {...registerReturn}
      />
      {!!errorMessage && <span className="input__hint">{errorMessage}</span>}
    </div>
  );
};

export default RegistrableInput;
