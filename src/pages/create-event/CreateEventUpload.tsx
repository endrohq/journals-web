import React, { useEffect, useState } from 'react';
import { CreateEventHeader } from './CreateEventHeader';
import { UploadContext } from '../../typings';
import { useApi } from '../../services/use-api';
import { Button, message, Upload } from 'antd';
import { ENV } from '../../env';
import Label from '../../components/input/Label';
import {
  CheckCircleOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  UploadOutlined
} from '@ant-design/icons';

const ENDPOINT = `${ENV.STORAGE_API}/api/files`;

interface Props {
  setUploadContext(uploadContext: UploadContext): void;
}

export const CreateEventUpload: React.FC<Props> = ({ setUploadContext }) => {
  const { api } = useApi();
  const [uploadStarted, setUploadStarted] = useState<boolean>(false);
  const [fetchingMetadata, shouldFetchMetadata] = useState<boolean>(false);
  const [cid, setCid] = useState<string>();

  useEffect(() => {
    if (cid) {
      shouldFetchMetadata(true);
    }
  }, [cid]);

  useEffect(() => {
    if (fetchingMetadata) {
      createContext();
    }
  }, [fetchingMetadata, cid]);

  async function createContext() {
    const context: UploadContext = {
      cid
    };
    console.log(cid);
    try {
      const { data } = await api.storage.getMetadata(cid);
      console.log(data);
      if (data) {
        setUploadContext(context);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onVideoSelect(info: any) {
    if (!uploadStarted) {
      setUploadStarted(true);
    }
    console.log(info);
    if (info.file.status === 'uploading') {
    } else if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log(info.file.response?.data?.cid);
      setCid(info.file.response?.data?.cid);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  return (
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
              {uploadStarted ? (
                <div className="w100 flex-c flex-column">
                  <div className="w40">
                    <div className="mt15 w100 border-bottom pb10 mb10 flex-c flex-column">
                      Processing ...
                    </div>
                    <div className="flex-c flex-jc-sb">
                      <div className="fc-gray-700">Upload</div>
                      <div>
                        {!cid ? (
                          <MinusCircleOutlined className="fc-gray-500" />
                        ) : (
                          <CheckCircleOutlined className="fc-green" />
                        )}
                      </div>
                    </div>
                    <div className="flex-c flex-jc-sb">
                      <div className="fc-gray-700">Fetching metadata</div>
                      <div className="fc-gray-500">
                        {!fetchingMetadata ? (
                          <MinusCircleOutlined />
                        ) : (
                          <LoadingOutlined />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt25 mb25 flex-c flex-column">
                    <div className="fw-700">Upload</div>
                    <div>Select the video or image to publish</div>
                  </div>
                  <Button type="primary" className="h45--fixed w175--fixed">
                    Select File
                  </Button>
                </>
              )}
            </div>
          </Upload>
        </div>
      </div>
    </div>
  );
};
