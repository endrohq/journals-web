import React, { useRef } from 'react';

import { InputError } from '../../typings';
import { SlateEditor } from './SlateEditor/SlateEditor';
import { Descendant } from 'slate';
import Label from './Label';
import _ from 'lodash';

interface Props {
  label: string;
  setValue(value: Descendant[]): void;
  placeholder: string;
  value: Descendant[];
  error: InputError;
}

export const RichTextField: React.FC<Props> = ({
  setValue,
  placeholder,
  label,
  value,
  error
}) => {
  const [query, setQuery] = React.useState<Descendant[]>(
    value || [{ text: '' }]
  );
  const delayedQuery = useRef(_.debounce(q => setValue(q), 750)).current;
  const onChange = (value: Descendant[]) => {
    setQuery(value);
    delayedQuery(value);
  };
  return (
    <>
      <div className="mb10">
        <Label label={label} error={error} />
      </div>
      <div className="">
        <SlateEditor
          placeholder={placeholder}
          value={query}
          onChange={onChange}
        />
      </div>
    </>
  );
};
