import { FC } from 'react';
import { ContentItem } from '../../typings';
import { MyEventsListItem } from './MyEventsListItem';
import { isArrayWithElements } from '../../utils/type.utils';

export interface Props {
  items: ContentItem[];
}

export const MyEventsList: FC<Props> = ({ items }) => {
  return (
    <div className="grid-xl mt50">
      <div className="w100 flex-c pb10 border-bottom mb10 fw-700 fc-gray-700">
        <div className="w35">Content</div>
        <div className="w25">Status</div>
        <div className="w25">Date</div>
      </div>
      <div>
        {isArrayWithElements(items) ? (
          items?.map(item => <MyEventsListItem item={item} />)
        ) : (
          <div>Nothing found!</div>
        )}
      </div>
    </div>
  );
};
