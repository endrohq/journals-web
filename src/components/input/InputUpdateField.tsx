import React, { useEffect, useState } from 'react';
import Button from 'antd/es/button'
import { TextField } from './TextField'
import { Placeholder } from './Placeholder'

interface Props {
  maxChars?: number
  loading: boolean
  original: string
  label: string
  value: string
  error: string
  inputType?: string
  property?: string
  placeholder?: string
  activeInput?: string
  setActiveInputField(label: string): void
  update(val: any): void
}

export const InputUpdateField: React.FC<Props> = ({ maxChars, update, property, loading, placeholder, activeInput, original, label, value, setActiveInputField, error, inputType }) => {

  const [inputValue, setInputValue] = useState<string>(value);
  const [inputError, setInputError] = useState<string>(error);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
    if (error !== inputError) {
      setInputError(error)
    }
  }, [value, error])

  async function onChange (value: string) {
    try {
      if (maxChars && value.length > maxChars) {
        return
      }
      setInputValue(value)
      setInputError(error)
    } catch (error) {
      setInputError(error.message)
    }
  }

  function toggleEdit() {
    setActiveInputField(label)
  }

  function cancel () {
    setActiveInputField(null)
  }

  function getPlaceholder(label: string, value: string) {
    if (['boolean', 'select'].includes(inputType)) {
      const { options, option_key, option_label } = this.props
      const default_value = options.find((item: object) => item[option_key] === value) || {}
      value = default_value[option_label]
    }
    return (
      <Placeholder
        label={label}
        value={value}
        edit={toggleEdit}
      />
    )
  }

  function getTextField() {
    return (
      <TextField
        label={label}
        value={inputValue}
        placeholder={placeholder}
        setValue={onChange}
        loading={loading}
        error={error}
        max_chars={maxChars}
      />
    )
  }

  function getInput () {
    return (
      <>
        <div className="mt25 mb15">
          {getTextField()}
        </div>
        <div className="w100 flex-c flex-jc-fe mb50">
          <div
            onClick={cancel}
            className="mr15 click fc-grey">
            <span className="">Cancel</span>
          </div>
          <Button
            disabled={original === inputValue || !!inputError}
            onClick={onUpdate}
            type="primary">
            <span>Update</span>
          </Button>
        </div>
      </>
    )
  }

  async function onUpdate () {
    const update_obj = {}
    try {
      /*if (validator) {
        await validator({ inputValue, external_validator: isUnique })
      }*/
      update_obj[property] = inputValue
      update(update_obj)
    } catch (error) {
      let err = 'Something went wrong'
      if (error.message) {
        err = error.message
      } else if (typeof error === 'string') {
        err = error
      }
      setInputError(err)
    }
  }

  if (activeInput === label) {
    return getInput()
  }
  return getPlaceholder(label, value)

}
