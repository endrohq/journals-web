import React, { useRef, useState } from 'react';
import { InputError, ValidatorInput, InputProps } from '../../typings';
import Label from 'src/components/input/Label';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import _ from 'lodash';
import Input from 'antd/es/input';
import TextArea from 'antd/lib/input/TextArea';
import InputNumber from 'antd/lib/input-number';

interface Props extends Omit<InputProps, 'name'> {
  label?: string;
  error?: InputError;
  property: string;
  input_type?: string;
  placeholder?: string;
  className?: string;
  prefix?: any;
  disabled?: boolean;
  loading?: boolean;
  suffix?: any;
  isUnique?: boolean;
  validator?(validator: ValidatorInput): Promise<boolean>;
  setValue(value: any): void;
  setError?(error: InputError): void;
  exists?(value: any): void;
  maxChars?: number;
  rows?: number;
}

export const FormInput: React.FC<Props> = ({
  setError,
  input_type,
  prefix,
  validator,
  setValue,
  exists,
  property,
  error,
  label,
  placeholder,
  disabled,
  loading,
  maxChars,
  className,
  value,
  rows,
  suffix
}) => {
  const [isUnique, setIsUnique] = useState<boolean>();
  const [query, setQuery] = useState(value);
  const delayedQuery = useRef(_.debounce(q => onChange(q), 50)).current;

  const onInputChange = (value: string) => {
    setQuery(value);
    delayedQuery(value);
  };

  async function onChange(value: any) {
    if (!validator) {
      persistValue(value);
    } else {
      validate(value);
    }
  }

  async function validate(value: any) {
    try {
      await validator({ value, exists });
      persistValue(value);
      await setIsUnique(true);
    } catch (error) {
      let err = 'Something went wrong';
      if (error?.message) {
        err = error.message;
      } else if (typeof error === 'string') {
        err = error;
      }
      setError({ field: property, message: err });
      await setIsUnique(false);
    }
  }

  function persistValue(value: any) {
    setValue(value);
    if (error) {
      setError({ field: property, message: null });
    }
  }

  const remaining =
    maxChars && maxChars - (typeof value !== 'number' ? value?.length : value);

  const icon = loading ? (
    <LoadingOutlined />
  ) : (
    isUnique && (
      <span className="fc-d-green">
        <CheckCircleOutlined
          type="check-circle"
          className="create--field-valid "
        />
      </span>
    )
  );

  return (
    <>
      <Label label={label} error={error} remainingChars={remaining} />
      {input_type === 'textarea' ? (
        <TextArea
          className={`textarea-im ${error?.message && 'border-danger'}`}
          value={query}
          placeholder={placeholder}
          maxLength={maxChars}
          onChange={ev => onInputChange(ev?.target?.value)}
          disabled={disabled}
          rows={rows}
        />
      ) : input_type === 'number' ? (
        <InputNumber
          className={`h45--fixed w100-imp ${error?.message && 'border-danger'}`}
          height={45}
          value={Number(value)}
          placeholder="0"
          onChange={value => onInputChange(value?.toString())}
          disabled={disabled}
          prefix={prefix}
        />
      ) : (
        <Input
          className={className}
          value={query}
          placeholder={placeholder}
          onChange={ev => onInputChange(ev?.target?.value)}
          suffix={suffix || icon}
          maxLength={maxChars}
          disabled={disabled}
          prefix={prefix}
          type="text"
        />
      )}
    </>
  );
};
