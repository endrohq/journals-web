import React from 'react';
import { ContentItem } from '../../typings';
import { LoadingOutlined } from '@ant-design/icons';
import { getEventIdByIpfsPath } from '../../utils/string.utils';

interface ContainerProps {
  item?: ContentItem;
  isRemovingCid: string;
  remove(eventId: string): void;
  publish(eventId: string): void;
}

export const MyNewsListItem: React.FC<ContainerProps> = ({
  item,
  isRemovingCid,
  remove,
  publish
}) => {
  const thumbnail = item?.items.find(pathItem =>
    pathItem.name.startsWith('thumbnail')
  );
  const eventId = getEventIdByIpfsPath(item?.path);
  return (
    <div className="w100 mb15 flex-c pb15 border-bottom">
      <div className="w35 flex-c">
        <div className="w100--fixed rounded-1 bg-gray-200 resp-container">
          <img
            className="resp-iframe image-contain"
            src={`https://ipfs.io/${thumbnail?.path}`}
          />
        </div>
        <div className="ml25">
          EventId: <span className="fw-700">{item.name}</span>
        </div>
      </div>
      <div className="w25">
        <div>Concept</div>
      </div>
      <div className="flex-c w25">
        {isRemovingCid === item.cid ? (
          <LoadingOutlined />
        ) : (
          <>
            <div
              onClick={() => remove(eventId)}
              className="flex-c fc-gray-500 fc-red__hover click mr15 pr15 border-right">
              remove
            </div>
            <div
              onClick={() => publish(eventId)}
              className="click fc-blue fw-700">
              Publish
            </div>
          </>
        )}
      </div>
    </div>
  );
};
