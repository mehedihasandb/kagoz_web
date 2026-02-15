'use client';

import React, { ReactElement, ReactNode, useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type FormProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
  handleReset?: () => void;
  restore?: boolean;
} & FormConfig;

const Form = ({
  children,
  submitHandler,
  defaultValues,
  resolver,
  handleReset,
  restore,
}: FormProps) => {
  const formConfig: FormConfig = {};
  if (!!defaultValues) formConfig['defaultValues'] = defaultValues;
  if (!!resolver) formConfig['resolver'] = resolver;

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);
  
  };

  useEffect(() => {
    if (defaultValues || restore) {
      reset(defaultValues);
    }
  }, [defaultValues, restore, reset, methods, handleReset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
