import React, { useRef, useState } from 'react';

import InputNumber from 'antd/es/input-number';
import _ from 'lodash';
import Label from './Label';
import { InputError } from 'src/typings/index';

interface Props {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  value?: number;
  label?: string;
  setValue(value: number): void;
  prefix?: string;
  placeholder?: string;
  error?: InputError;
}

export const NumberField: React.FC<Props> = ({
  label,
  setValue,
  placeholder,
  value,
  error,
  disabled,
  prefix,
  min,
  max,
  step
}) => {
  const [inputValue, setInputValue] = useState<number>(value || undefined);
  const delayedQuery = useRef(_.debounce(q => setValue(q), 50)).current;
  const onChange = (value: number) => {
    setInputValue(value);
    delayedQuery(value);
  };
  let clazz = 'h45--fixed w100-imp';
  if (error?.message) {
    clazz += ' border-danger';
  }
  return (
    <>
      <Label label={label} error={error} />
      <InputNumber
        className={clazz}
        value={inputValue}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        prefix={prefix}
        type="number"
        min={min}
        max={max}
        step={step}
      />
    </>
  );
};
