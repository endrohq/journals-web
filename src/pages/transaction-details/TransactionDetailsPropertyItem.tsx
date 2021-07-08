import React from 'react';

interface ContainerProps {
  label: string;
  value: string;
  isLastChild?: boolean;
}

export const TransactionDetailsPropertyItem: React.FC<ContainerProps> = ({ label, value, isLastChild = false }) => {
  const clazz = isLastChild ? 'br-b br-t' : 'br-t'
  return (
    <div className={`w100 flex-c flex-jc-sb pt10 pb10 ${clazz}`}>
      <div className="">{label}</div>
      <div className="">{value}</div>
    </div>
  )
}

