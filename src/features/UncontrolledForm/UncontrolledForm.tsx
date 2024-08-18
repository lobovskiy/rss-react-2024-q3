import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import type { FormData } from '../../schemas/formSchema';
import { formSchema } from '../../schemas/formSchema';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addTile, clearLastAddedTile } from '../../redux/tiles/slice';

import InputRef from '../../components/InputRef/InputRef';
import Button from '../../components/Button/Button';

import { validateData } from '../../utils';

import '../shared/styles/form.css';

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countryList = useAppSelector((state) => state.countries.list);

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const genderRef = useRef<HTMLSelectElement | null>(null);
  const termsRef = useRef<HTMLInputElement | null>(null);
  const pictureRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);

  const clearError = (error: keyof typeof errors) => {
    if (!Object.keys(errors).includes(error)) {
      return;
    }

    const restErrors = Object.fromEntries(
      Object.entries(errors).filter(([errorKey]) => errorKey !== error)
    );

    setErrors(restErrors);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData: FormData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      picture: pictureRef.current?.files || new FileList(),
      country: countryRef.current?.value || '',
    };

    const validationResult = validateData<FormData>(formData, formSchema);

    if (validationResult.valid) {
      if (formData.picture) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setIsSubmitting(false);
          dispatch(addTile({ ...formData, picture: reader.result as string }));
          setTimeout(() => dispatch(clearLastAddedTile()), 5000);
          navigate('/');
        };
        reader.onerror = () => {
          setIsSubmitting(false);
        };
        reader.onabort = () => {
          setIsSubmitting(false);
        };

        reader.readAsDataURL(formData.picture[0]);
      }

      setErrors({});
      setIsSubmitting(false);
    } else {
      setErrors(validationResult.errors);
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <InputRef
        type="text"
        id="name"
        label="Name"
        ref={nameRef}
        errorMessage={errors.name}
        onInput={() => {
          clearError('name');
        }}
      />
      <InputRef
        type="number"
        id="age"
        label="Age"
        ref={ageRef}
        errorMessage={errors.age}
        onInput={() => {
          clearError('age');
        }}
      />
      <InputRef
        type="email"
        id="email"
        label="Email"
        ref={emailRef}
        errorMessage={errors.email}
        onInput={() => {
          clearError('email');
        }}
      />
      <InputRef
        type="password"
        id="password"
        label="Password"
        ref={passwordRef}
        errorMessage={errors.password}
        onInput={() => {
          clearError('password');
        }}
      />
      <InputRef
        type="password"
        id="confirmPassword"
        label="Confirm password"
        ref={confirmPasswordRef}
        errorMessage={errors.confirmPassword}
        onInput={() => {
          clearError('confirmPassword');
        }}
      />

      <div className="select">
        <label htmlFor="gender">Gender</label>
        <select
          className={classNames('select__input', {
            select__input_error: !!errors.gender,
          })}
          id="gender"
          ref={genderRef}
          onChange={() => {
            clearError('gender');
          }}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <span className="select__hint">{errors.gender}</span>}
      </div>

      <div className="checkbox">
        <div className="checkbox__title">Terms and Conditions</div>
        <div className="checkbox__input">
          <input
            type="checkbox"
            id="terms"
            ref={termsRef}
            onInput={() => {
              clearError('terms');
            }}
          />
          <label className="checkbox__label" htmlFor="terms">
            I accept T&C
          </label>
        </div>
        {errors.terms && <span className="checkbox__hint">{errors.terms}</span>}
      </div>

      <InputRef
        type="file"
        id="picture"
        label="Picture"
        accept=".jpeg, .png"
        ref={pictureRef}
        errorMessage={errors.picture}
        onInput={() => {
          clearError('picture');
        }}
      />

      <div className="datalist">
        <label htmlFor="country">Country</label>
        <input
          className={classNames('datalist__input', {
            datalist__input_error: !!errors.country,
          })}
          id="country"
          list="countries"
          ref={countryRef}
          onInput={() => {
            clearError('country');
          }}
        />
        <datalist id="countries">
          {countryList.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && (
          <span className="datalist__hint">{errors.country}</span>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !!Object.keys(errors).length}
      />
    </form>
  );
};

export default UncontrolledForm;
