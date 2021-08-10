import { FC } from 'react';

import { FileContext } from '../../../typings';
import { CheckCircleFilled, MinusCircleOutlined } from '@ant-design/icons';

interface Props {
  ipfsPath: string;
  loading: boolean;
  fileContext: FileContext;
}

export const CreateEventStatus: FC<Props> = ({ fileContext, loading }) => {
  return (
    <div className="mb25">
      <div className="p15-25 border rounded-1 bg-gray-100">
        <div className="flex-c flex-jc-sb mb10 pb5 border-bottom">
          <div className="flex-c">
            <div className="mr10">
              {fileContext ? (
                <CheckCircleFilled className="fc-green" />
              ) : (
                <MinusCircleOutlined />
              )}
            </div>
            <div>Metadata extraction</div
          </div>
        </div>
        <div className="flex-c flex-jc-sb mb5 pb5 border-bottom">
          <div className="flex-c">
            <div className="mr10">
              {fileContext ? (
                <CheckCircleFilled className="fc-green" />
              ) : (
                <MinusCircleOutlined />
              )}
            </div>
            <div>Content Insights</div>
          </div>
        </div>
        {JSON.stringify(fileContext, null, 2)}
      </div>
    </div>
  );
};
