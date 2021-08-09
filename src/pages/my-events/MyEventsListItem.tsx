import React from 'react';
import { ContentItem } from '../../typings';
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';

interface ContainerProps {
  item?: ContentItem;
  remove(): void;
  publish(ipfsPath: string, cid: string): void;
}

export const MyEventsListItem: React.FC<ContainerProps> = ({
  item,
  remove,
  publish
}) => {
  return (
    <div className="w100 mb15 flex-c pb15 border-bottom">
      <div className="w35 flex-c">
        <div className="w100--fixed rounded-1 bg-gray-200 resp-container">
          <img
            className="resp-iframe image-contain"
            src={`https://ipfs.io/${item.path}`}
          />
        </div>
        <div className="ml25 fw-700 ">{item.name}</div>
      </div>
      <div className="w25">
        <div>Concept</div>
      </div>
      <div className="w25">
        <div>{moment.unix(item.metadata?.updatedAt).toString()}</div>
      </div>
      <div className="flex-c ml-auto">
        <div
          onClick={remove}
          className="flex-c fc-gray-500 fc-red__hover click mr15 pr15 border-right">
          <DeleteOutlined />
          <div className="ml10">remove</div>
        </div>
        <div
          onClick={() => publish(item.path, item.cid)}
          className="click fc-blue fw-700">
          Publish
        </div>
      </div>
    </div>
  );
};
