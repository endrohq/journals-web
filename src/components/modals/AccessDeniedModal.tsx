import React from 'react';

import { ModalProps } from './';

export const AccessDeniedModal: React.FC<ModalProps> = ({ onSubmit }) => {
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    await onSubmit();
  }

  return (
    <div onClick={handleSubmit}>transfer {submitting && 'submitting'}</div>
  );
};
