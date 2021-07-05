import React from 'react';
import { Button } from 'antd';

interface Props {
  disabled?: boolean;
  action(): void;
  close?(): void;
  confirmLabel: string;
}

export const NavigationFooter: React.FC<Props> = ({
  disabled = false,
  action,
  close,
  confirmLabel
}) => (
  <div className="border-top pt15 flex-c flex-jc-fe">
    {close && (
      <div onClick={close} className="mr25 fc-gray-600 click">
        <span>Cancel</span>
      </div>
    )}
    <Button
      className=""
      type="primary"
      disabled={disabled}
      onClick={() => action()}>
      {confirmLabel}
    </Button>
  </div>
);
