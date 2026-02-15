"use client";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { DatePicker, DatePickerProps } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";

type UMDatePickerProps = {
  name: string;
  label?: string;
  size?: "large" | "small";
  required?: boolean;
  isRequired?: boolean;
  disable?: boolean;
  placeholder?: string;
  showTime?: boolean;
  format?: string;
  disabledDate?: (current: Dayjs) => boolean;
  resetToCurrentDate?: boolean;
  style?: any;
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
};

const FormEditDatePicker = ({
  name,
  label,
  size,
  required,
  isRequired,
  disable,
  placeholder,
  showTime = false,
  format = "DD-MM-YYYY",
  disabledDate,
  resetToCurrentDate = false,
  style,
  onChange,
}: UMDatePickerProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const fieldValue = watch(name);
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  useEffect(() => {
    if (resetToCurrentDate && !fieldValue) {
      const now = dayjs();
      setValue(name, now.format(format));
    }
  }, [resetToCurrentDate, fieldValue, name, setValue, format]);

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString:any) => {
    setValue(name, dateString, { shouldValidate: true, shouldDirty: true });
    if (onChange) onChange(date, dateString);
  };

  return (
    <div>

        <div style={{ display: "flex", marginBottom: label ? "5px" : "-5px", }}>
        <p>{label ? label : null}</p>
        <p style={{ color: 'red' }}>{`${required || isRequired ? '*' : ''}`}</p>
        </div>


      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            value={field.value ? dayjs(field.value, format) : null}
            onChange={handleOnChange}
            placeholder={placeholder}
            size={size}
            disabled={disable}
            showTime={showTime}
            format={format}
            style={{ width: "100%", textAlign: "left", ...style }}
            disabledDate={disabledDate}
          />
        )}
      />

      <small
        style={{
          color: "red",
        }}
      >
        {errorMessage}
      </small>
    </div>
  );
};

export default FormEditDatePicker;
