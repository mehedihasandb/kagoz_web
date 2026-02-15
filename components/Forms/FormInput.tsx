'use client';

// import { getErrorMessageByPropertyName } from '@/utils/schema-validator';
import { getErrorMessageByPropertyName } from '@/utils/schema-validator';
import { Input } from 'antd';
// import { Input, Upload, Button } from 'antd';
import { useFormContext, Controller } from 'react-hook-form';
// import { UploadOutlined } from '@ant-design/icons';
interface IInput {
  name: string;
  type?: 'text' | 'password' | 'file' | 'number';
  size?: 'large' | 'small';
  value?: any;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: any;
  required?: boolean;
  isRequired?: boolean;
  disable?: boolean;
  style?: any;
  autoFocus?:any;
  defaultValue?: any;
  readOnly?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  name,
  type = 'text',
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  required,
  isRequired,
  disable,
  autoFocus,
  style,
  defaultValue,
  readOnly,
  onChange,
  onBlur,
}: IInput) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      <div
        style={{
          display: 'flex',
          marginBottom: label ? "5px" : "-5px",
        }}
      >
        <p>{label ? label : null}</p>
        <p style={{ color: 'red' }}>{`${required || isRequired ? '*' : ''}`}</p>
      </div>
    
        <Controller
          control={control}
          name={name}
          render={({ field }) =>

            type === 'password' ? (
              <Input.Password
              style={{
                ...style,
              }}
              className="border px-3 py-2 rounded-md"
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
              onBlur={(event) => {
                field.onBlur();
                if (onBlur) {
                  onBlur(event);
                }
              }}
              onChange={(event) => {
                const newValue: any = event.target.value;
                field.onChange(newValue);
                if (onChange) {
                  onChange(newValue);
                }
              }}
            />
            ): (
              <input
                style={{
                  ...style,
                }}
                // defaultValue={defaultValue || ''}
                type={type}
                className="border px-3 py-2 rounded-md"
                // title={value || field.value}
                placeholder={placeholder}
                {...field}
                value={value !== undefined ? value : field.value || ''}
                onChange={(event) => {
                  const newValue: any = event.target.value;
                  field.onChange(newValue);
                  if (onChange) {
                    onChange(newValue);
                  }
                }}
                onBlur={(event) => {
                  field.onBlur();
                  if (onBlur) {
                    onBlur(event);
                  }
                }}
                // onChange={onChange}
                disabled={disable}
                autoFocus={autoFocus}
                readOnly={readOnly ? readOnly : ''}
              />
            )
          }
        />

      <small
        style={{
          color: 'red',
        }}
      >
        {errorMessage}
      </small>
    </>
  );
};

export default FormInput;
