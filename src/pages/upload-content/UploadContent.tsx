import React, { useMemo, useState } from 'react';
import { useWallet } from '@lisk-react/use-lisk';
import { CreateEventHeader } from '../../components/modals/CreateEventModal/CreateEventHeader';
import Label from '../../components/input/Label';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ENV } from '../../env';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../shared/router/routes';

const UploadContent: React.FC = () => {
  const { account } = useWallet();
  const [uploadStarted, setUploadStarted] = useState<boolean>(false);
  const history = useHistory();

  const ENDPOINT = useMemo(() => {
    return `${ENV.STORAGE_API}/api/accounts/${account?.address}/files`;
  }, []);

  async function onVideoSelect(info: any) {
    if (!uploadStarted) {
      setUploadStarted(true);
    }
    if (info.file.status === 'uploading') {
    } else if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      const path = info.file.response?.data?.path?.path;
      if (path) {
        const cid = path.replace('/ipfs/', '');
        history.push(`${ROUTES.MY_EVENTS}?cid=${cid}`);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  return (
    <div className="create-event grid-xl mt50">
      <div className="w60 m-auto">
        <CreateEventHeader />
        <div className="mb25">
          <div className="mb5">
            <Label label="1. Upload File" />
            <p className="w60 fc-gray-700">
              Upload the content that showcases what happened. You are able to
              upload videos, images or PDF files.
            </p>
          </div>
          <div className="mt25 resp-container border-dashed border-gray-300 rounded-1 click">
            <Upload
              multiple={false}
              showUploadList={false}
              name="file"
              disabled={uploadStarted}
              action={ENDPOINT}
              onChange={onVideoSelect}>
              <div className=" resp-iframe bg-gray-100 flex-c flex-jc-c flex-column">
                <div className="bg-gray-200 circle flex-c flex-jc-c img--125">
                  {uploadStarted ? (
                    <div className="lds-ripple ">
                      <div />
                      <div />
                    </div>
                  ) : (
                    <UploadOutlined className="fs-xxl fc-gray-500" />
                  )}
                </div>
                <div className="mt25 mb25 flex-c flex-column">
                  {!uploadStarted ? (
                    <>
                      <div className="fw-700">Upload</div>
                      <div>Select the video or image to publish</div>
                    </>
                  ) : (
                    <div className="fw-700">Processing ...</div>
                  )}
                </div>
                <Button
                  disabled={uploadStarted}
                  type="primary"
                  className="h45--fixed w175--fixed">
                  Select File
                </Button>
              </div>
            </Upload>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadContent;
