import React, { ChangeEvent, useState } from 'react';
import keyboardCodes from '../utils/keyboard-codes';
import { getPassphraseValidationErrors, isValidPassphrase } from '../utils/passphrase';

interface ContainerProps {
  showPassphrase: boolean,
  setValidPassphrase(passphrase: string): void
}

type ErrorData = {
  validationError: string;
  partialPassphraseError: boolean[];
  passphraseIsInvalid: boolean;
}

export const PassphraseInput: React.FC<ContainerProps> = ({ showPassphrase, setValidPassphrase }) => {

  const [focus, setFocus] = useState<number>(-1);
  const [passphrase, setPassphrase] = useState<string[]>([]);
  const [errors, setErrors] = useState<ErrorData>({ validationError: '', partialPassphraseError : [], passphraseIsInvalid: false });

  function handleChange (event: ChangeEvent<HTMLInputElement>) {
    const index = parseInt(event.target.dataset.index, 10);
    const insertedValue = event.target.value.trim().replace(/\W+/g, ' ');
    if (insertedValue.split(/\s/).length > 1) return;
    const newPassphrase = [...passphrase];
    newPassphrase[index] = insertedValue;
    setPassphrase(newPassphrase);
    validatePassphrase({ passphrase: newPassphrase });
  }

  function handlePaste (event: React.ClipboardEvent<HTMLInputElement>) {
    // @ts-ignore
    const index = parseInt(event.target.dataset.index, 10);
    const pastedValue = event.clipboardData.getData('Text').trim().replace(/\W+/g, ' ').split(/\s/);
    if (pastedValue.length <= 1) {
      passphrase[index] = '';
    } else {
      setPassphrase(pastedValue);
    }
    event.preventDefault();
    validatePassphrase({ passphrase: pastedValue });
  }

  function handleBlur (event: React.FocusEvent<HTMLInputElement>) {
    // @ts-ignore
    setFocus(event.target.dataset.index)
  }


  function handleKeyEvent (event: React.KeyboardEvent<HTMLDivElement>) {
    // @ts-ignore
    const index = parseInt(event.target.dataset.index, 10);
    if (event.which === keyboardCodes.space
      || event.which === keyboardCodes.arrowRight
      || event.which === keyboardCodes.tab) {
      const newIndex = index + 1 > 12 ? index : index + 1;
      setFocus(newIndex);
      event.preventDefault();
    }
    if ((event.which === keyboardCodes.delete && !passphrase[focus])
      || event.which === keyboardCodes.arrowLeft) {
      const newIndex = index - 1 < 0 ? index : index - 1;
      setFocus(newIndex);
      event.preventDefault();
    }
  }

  function validatePassphrase ({ passphrase = [] }: { passphrase: string[] }) {

    if (isValidPassphrase(passphrase)) {
      setErrors({
        validationError: '',
        partialPassphraseError: [],
        passphraseIsInvalid: false
      })
      const normalizedPassphrase = passphrase.join(' ')
      setValidPassphrase(normalizedPassphrase);
      return;
    }

    let errorState = getPassphraseValidationErrors(passphrase);
    if (!passphrase.length) {
      errorState = {
        ...errorState,
        validationError: "required",
      };
    }
    setErrors(errorState);
    setValidPassphrase('');
  }

  function setFocusedField({ target }: { target: any }) {
    const focus = parseInt(target.dataset.index, 10);
    setFocus(focus)
  }

  return (
    <div className="w100 grid-passphrase">
      {
        [...Array(12)].map((x, i) => {
          const value = passphrase[i];
          const hasError = errors.partialPassphraseError[i];
          return (
            <div className="flex-fe flex-jc-sb">
              <span className={hasError ? 'error-input' : 'fc-lgrey'}>{i + 1}.</span>
              <div className="w80">
                <input
                  type={showPassphrase ? 'text' : 'password'}
                  ref={(reference: HTMLInputElement) => reference !== null && focus === i && reference.focus()}
                  className={`passphrase-input fs-m ${hasError ? 'error-input' : ''}`}
                  value={value || ''}
                  onFocus={setFocusedField}
                  onChange={handleChange}
                  onPaste={handlePaste}
                  onKeyDown={handleKeyEvent}
                  onBlur={handleBlur}
                  data-index={i}
                />
              </div>
            </div>
          )
        })
      }

    </div>
  )
}
