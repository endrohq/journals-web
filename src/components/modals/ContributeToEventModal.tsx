import React, { useState } from 'react';

import { ModalProps } from './';
import { FileUpload } from '../input/FileUpload';
import { UploadContext } from '../../typings';

export const ContributeToEventModal: React.FC<ModalProps> = () => {
  const [uploadContext, setUploadContext] = useState<UploadContext>();
  return (
    <div className="pb25">
      <div className="pt25 pl25 pr25 ">
        <h2 className="fw-700 fs-xm p0 m0">Contribute</h2>
        <p>Uploading a new video</p>
      </div>
      <div className="flex-c mb15 bg-gray-200 p15-25 ml25 mr25 rounded-1">
        <FileUpload
          uploadContext={uploadContext}
          setUploadContext={context => setUploadContext(context)}
          removeUploadContext={() => setUploadContext(undefined)}
        />
      </div>
    </div>
  );
};
