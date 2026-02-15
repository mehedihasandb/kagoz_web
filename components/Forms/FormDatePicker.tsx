'use client';

import { DatePicker, DatePickerProps } from 'antd';
import { useFormContext, Controller } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';

type UMDatePickerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  style?: any;
  value?: Dayjs| string| any;
  label?: string;
  size?: 'large' | 'small';
  required?: boolean;
  isRequired?: boolean;
  disable?: boolean;
  placeholder?: string;
  showTime?: boolean;
  format?: string;
  picker?:string | any;
  disabledDate?: (current: Dayjs) => boolean;
};

const FormDatePicker = ({
  name,
  label,
  onChange,
  size,
  style,
  required,
  isRequired,
  disable,
  placeholder,
  showTime = false,
  format = 'DD-MM-YYYY',
  picker,
  disabledDate,
}: UMDatePickerProps) => {
  const { control, setValue } = useFormContext();

  const handleOnChange: DatePickerProps['onChange'] = (date, dateString:any) => {
    if (onChange) {
      onChange(date, dateString);
    }
    setValue(name, dateString);
  };

  // Set the initial date to the current date only if the field is empty
  const currentDate = dayjs();
  const initialDateValue = currentDate.format(format);

  return (
    <>
      <div
        style={{
          display: 'flex',
          marginBottom: '5px',
        }}
      >
        <p>{label ? label : null}</p>
        <p style={{ color: 'red' }}>{`${required || isRequired ? '*' : ''}`}</p>
      </div>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            // value={field.value ? dayjs(field.value) : null}
            className="border px-3 py-2 mt-1 rounded-md"
            defaultValue={
              field.value
                ? dayjs(field.value, format)
                : dayjs(initialDateValue, format)
            }
            size={size}
            onChange={handleOnChange}
            placeholder={placeholder}
            style={{
              textAlign: 'left',
              width: '100%',
              ...(style ? style : ''),
            }}
            disabled={disable}
            showTime={showTime} 
            format={format} 
            picker={picker}
            disabledDate={(current) =>
              disabledDate ? disabledDate(current) : false
            }
          />
        )}
      />
    </>
  );
};

export default FormDatePicker;
