import React from 'react';

interface ContainerProps {}

export const AccountTransactionsNotFound: React.FC<ContainerProps> = () => (
  <div className="flex-c fs-s flex-c pb15 pt15 fc-gray-300">
    <span className="w40">No transactions found</span>
  </div>
);
