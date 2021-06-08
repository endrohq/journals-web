import React from 'react';
import { Loading } from './Loading';

interface Props {
  message?: string;
}

export const PageLoading: React.FC<Props> = ({ message }) => (
  <div className="grid-xl mt50 mb50">
    <Loading message={message} />
  </div>
);
