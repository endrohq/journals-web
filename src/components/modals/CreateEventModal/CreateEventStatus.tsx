import { FC } from 'react';

import { ContentItem, FileContext } from '../../../typings';
import {
  CheckCircleFilled,
  MinusCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';

interface Props {
  contentLoading: boolean;
  metadataLoading: boolean;
  contentItem: ContentItem;
  fileContext: FileContext;
}

const StatusIcon: FC<{ loading: boolean; propertyLoaded: boolean }> = ({
  loading,
  propertyLoaded
}) => {
  return (
    <>
      {loading ? (
        <LoadingOutlined />
      ) : propertyLoaded ? (
        <CheckCircleFilled className="fc-green" />
      ) : (
        <MinusCircleOutlined />
      )}
    </>
  );
};

export const CreateEventStatus: FC<Props> = ({
  contentItem,
  fileContext,
  contentLoading,
  metadataLoading
}) => {
  return (
    <div className="mb25">
      <div className="p15-25 border rounded-1 bg-gray-100">
        <div className="fw-700 mb10">Status</div>
        <div className="flex-c flex-jc-sb mb10 pb5 border-bottom">
          <div className="flex-c">
            <div className="mr10">
              <StatusIcon
                loading={contentLoading}
                propertyLoaded={!!contentItem}
              />
            </div>
            <div>Fetching Content</div>
          </div>
        </div>
        <div className="flex-c flex-jc-sb">
          <div className="flex-c">
            <div className="mr10">
              <StatusIcon
                loading={metadataLoading}
                propertyLoaded={!!fileContext}
              />
            </div>
            <div>Metadata extraction</div>
          </div>
        </div>
      </div>
    </div>
  );
};
