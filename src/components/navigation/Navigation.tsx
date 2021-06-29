import { FC } from 'react';
import { NavigationItem } from './NavigationItem';

interface Props {
  setActiveIdx(idx: number): void;
  activeIdx: number;
  menu: any[];
}

export const Navigation: FC<Props> = ({ setActiveIdx, activeIdx, menu }) => {
  return (
    <div className="border-bottom w100 mb25 flex-c">
      {menu.map((item, idx) => (
        <NavigationItem
          key={item.page}
          setActiveIdx={setActiveIdx}
          isActive={activeIdx === idx}
          idx={idx}
          label={item.label}
        />
      ))}
    </div>
  );
};
