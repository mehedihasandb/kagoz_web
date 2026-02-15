"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined |any;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  required?: boolean;
  onSearch?: (value: string) => void;
  filterOption?: (
    input: string,
    option: { label: string; value: string }
  ) => boolean;
  disable?: boolean;
  style?: any;
  validation?: object;
  setSelected?: any;
  onChange?: any;
  allowClear?: boolean;
};

const SelectField = ({
  name,
  size,
  value,
  placeholder,
  label,
  options,
  defaultValue,
  required,
  onSearch,
  filterOption,
  disable,
  style,
  validation,
  setSelected,
  onChange,
  allowClear
}: SelectFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      <div
        style={{
          display: "flex",
          marginBottom: "5px",
        }}
      >
        <p>{label ? label : null}</p>
        <p style={{ color: "red" }}>{`${required ? "*" : ""}`}</p>
      </div>
      <Controller
        control={control}
        name={name}
        render={({
          field: { value: controllerValue, onChange: onControllerChange },
        }) => (
          <Select
            size={size}
            showSearch
            placeholder={placeholder !== undefined ? placeholder : undefined}
            optionFilterProp="children"
            onChange={(selectedValue) => {
              onControllerChange(selectedValue);
              if (onChange) {
                onChange(selectedValue);
              }
            }}
            onSearch={onSearch}
            filterOption={filterOption}
            options={options}
            value={value || controllerValue} 
            // className="border px-3 py-2 mt-1 rounded-md"
            style={{
              textAlign: "left",
              ...(style ? style : ""),
            }}
            disabled={disable}
            allowClear={allowClear}
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
    </>
  );
};

export default SelectField;
