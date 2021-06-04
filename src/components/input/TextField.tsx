import React, { ChangeEvent, useRef, useState } from 'react';

import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import Input from 'antd/es/input';
import _ from 'lodash';
import { InputError } from '../../typings';

interface Props {
  label: string;
  setValue(value: string): void;
  placeholder: string;
  max_chars?: number;
  value: string;
  error: InputError;
  loading?: boolean;
  isValid?: boolean;
  disabled?: boolean;
  prefix?: string;
  delay?: number;
  htmlType?: string;
}

export const TextField: React.FC<Props> = ({
  setValue,
  placeholder,
  max_chars,
  value = '',
  error,
  loading,
  isValid,
  disabled,
  prefix,
  delay = 750,
  htmlType
}) => {
  const icon = loading ? (
    <LoadingOutlined />
  ) : (
    isValid && (
      <span className="fc-d-green">
        <CheckCircleOutlined
          type="check-circle"
          className="create--field-valid "
        />
      </span>
    )
  );

  const [query, setQuery] = useState(value || '');
  const delayedQuery = useRef(_.debounce(q => setValue(q), delay)).current;
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    delayedQuery(event.target.value);
  };
  let clazz = 'h45--fixed';
  if (error?.message) {
    clazz += ' border-danger';
  }
  return (
    <>
      <Input
        className={clazz}
        value={query}
        placeholder={placeholder}
        onChange={onChange}
        suffix={icon}
        maxLength={max_chars}
        disabled={disabled}
        prefix={prefix}
        type={htmlType}
      />
    </>
  );
};
