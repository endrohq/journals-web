import { FC } from 'react';

import { FileContext } from '../../../typings';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  ipfsPath: string;
  loading: boolean;
  fileContext: FileContext;
}

export const CreateEventFileMetadata: FC<Props> = ({
  fileContext,
  loading
}) => {
  return (
    <div className="mb25">
      <div className="p15-25 border rounded-1 bg-gray-100">
        <div className="flex-c flex-jc-sb pb5 mb5 border-bottom">
          {!loading ? (
            <>
              <div>
                Name: <span className="fw-700">{fileContext?.name}</span>
              </div>
              <div className="fw-700">{fileContext?.type}</div>
            </>
          ) : (
            <div className="flex-c">
              <LoadingOutlined />
              <div className="ml15 flex-c">
                <div className="fw-700">Fetching metadata ..</div>
                <div>
                  This can take a few minutes depending on your file size
                </div>
              </div>
            </div>
          )}
        </div>
        {JSON.stringify(fileContext, null, 2)}
      </div>
    </div>
  );
};
