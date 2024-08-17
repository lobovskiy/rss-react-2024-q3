import classNames from 'classnames';

import './Button.css';

interface Props {
  className?: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled: React.ButtonHTMLAttributes<HTMLButtonElement>['disabled'];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ className, type, disabled }) => {
  return (
    <button
      className={classNames('button', className)}
      type={type}
      disabled={disabled}
    >
      Submit
    </button>
  );
};

export default Button;
