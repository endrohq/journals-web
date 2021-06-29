import { FC } from 'react';

interface Props {
  setActiveIdx(idx: number): void;
  label: string;
  isActive: boolean;
  idx: number;
}

export const NavigationItem: FC<Props> = ({
  setActiveIdx,
  label,
  isActive,
  idx
}) => {
  const active = isActive
    ? ' fc-black border-bottom border-black '
    : ' border-bottom border-transparent fc-gray-800 ';
  return (
    <div
      onClick={() => setActiveIdx(idx)}
      className={`${active} click fc-lb__hover`}>
      <div className="flex-c flex-jc-c pl25 pr25 ">
        <div className="pb10">{label}</div>
      </div>
    </div>
  );
};
