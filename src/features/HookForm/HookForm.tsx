import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import type { FormData } from '../../schemas/formSchema.ts';
import { formSchema } from '../../schemas/formSchema.ts';

import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { addTile } from '../../redux/tiles/slice.ts';

import Button from '../../components/Button/Button.tsx';
import RegistrableInput from '../../components/RegistrableInput/RegistrableInput.tsx';

import useYupValidationResolver from './useYupValidationResolver.ts';

import '../shared/styles/form.css';

const HookForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countryList = useAppSelector((state) => state.countries.list);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resolver = useYupValidationResolver(formSchema);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver,
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsSubmitting(true);

    if (data.picture) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setIsSubmitting(false);
        dispatch(addTile({ ...data, picture: reader.result as string }));
        navigate('/');
      };
      reader.onerror = () => {
        setIsSubmitting(false);
      };
      reader.onabort = () => {
        setIsSubmitting(false);
      };

      reader.readAsDataURL(data.picture[0]);
    }

    setIsSubmitting(true);

    alert('Form submitted successfully!');
    setIsSubmitting(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <RegistrableInput
        type="text"
        id="name"
        label="Name"
        registerReturn={register('name')}
        errorMessage={errors.name?.message}
      />
      <RegistrableInput
        type="number"
        id="age"
        label="Age"
        registerReturn={register('age')}
        errorMessage={errors.age?.message}
      />
      <RegistrableInput
        type="email"
        id="email"
        label="Email"
        registerReturn={register('email')}
        errorMessage={errors.email?.message}
      />
      <RegistrableInput
        type="password"
        id="password"
        label="Password"
        registerReturn={register('password')}
        errorMessage={errors.password?.message}
      />
      <RegistrableInput
        type="password"
        id="confirmPassword"
        label="Confirm password"
        registerReturn={register('confirmPassword')}
        errorMessage={errors.confirmPassword?.message}
      />

      <div className="select">
        <label htmlFor="gender">Gender</label>
        <select
          className={classNames('select__input', {
            select__input_error: !!errors.gender?.message,
          })}
          id="gender"
          {...register('gender')}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <span className="select__hint">{errors.gender.message}</span>
        )}
      </div>

      <div className="checkbox">
        <div className="checkbox__title">Terms and Conditions</div>
        <div className="checkbox__input">
          <input type="checkbox" id="terms" {...register('terms')} />
          <label className="checkbox__label" htmlFor="terms">
            I accept T&C
          </label>
        </div>
        {errors.terms && (
          <span className="checkbox__hint">{errors.terms.message}</span>
        )}
      </div>

      <RegistrableInput
        type="file"
        id="picture"
        label="Picture"
        registerReturn={register('picture')}
        errorMessage={errors.picture?.message}
      />

      <div className="datalist">
        <label htmlFor="country">Country</label>
        <input
          className={classNames('datalist__input', {
            datalist__input_error: !!errors.country,
          })}
          id="country"
          list="countries"
          {...register('country')}
        />
        <datalist id="countries">
          {countryList.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && (
          <span className="datalist__hint">{errors.country.message}</span>
        )}
      </div>

      <Button type="submit" disabled={!isValid || isSubmitting} />
    </form>
  );
};

export default HookForm;
