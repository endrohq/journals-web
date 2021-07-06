import React, { useState } from 'react';

import { ModalProps } from './';
import { FileUpload } from '../input/FileUpload';
import { UploadContext } from '../../typings';

export const PublishToEventModal: React.FC<ModalProps> = () => {
  const [uploadContext, setUploadContext] = useState<UploadContext>();

  return (
    <div className="pb25 w100-imp">
      <div className="pt25 pl25 pr25 mb25">
        <h2 className="fw-700 fs-xm p0 m0">Contribute</h2>
        <p>Uploading a new video</p>
      </div>
      <div className="w100 mb15 pl25 pr25 create-event">
        <FileUpload
          uploadContext={uploadContext}
          setUploadContext={context => setUploadContext(context)}
          removeUploadContext={() => setUploadContext(undefined)}
        />
        <div className="flex-c flex-jc-sb mt10 fc-gray-500">
          <div>Files Supported: MP4, MOV</div>
          <div>Max. 20MB</div>
        </div>
      </div>
    </div>
  );
};
