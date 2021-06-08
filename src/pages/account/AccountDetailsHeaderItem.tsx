import React from 'react';

interface ContainerProps {
  item: any;
  isLastChild: boolean;
}

export const AccountDetailsHeaderItem: React.FC<ContainerProps> = ({
  item,
  isLastChild
}) => {
  const clazz = isLastChild ? '' : 'mr15';
  return (
    <div
      className={`flex-column flex-fs br50 fc-primary p5-15 border primary-tag ${clazz}`}>
      <div className="fw-bold fs-n lh-normal p0 m0">{item.value}</div>
      <div className="fs-s lh-normal fc-grey p0 m0">{item.label}</div>
    </div>
  );
};
