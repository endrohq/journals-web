import { FC } from 'react';
import { Button, message, Upload } from 'antd';
import { ENV } from '../../env';
import Label from '../../components/input/Label';
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  setCid(cid: string): void;
}

const ENDPOINT = `${ENV.STORAGE_API}/api/files`;

export const FileUpload: FC<Props> = ({ setCid }) => {
  async function onVideoSelect(info: any) {
    if (info.file.status === 'uploading') {
    } else if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setCid(info.file.response?.data?.cid);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  return (
    <>
      <div className="mb5">
        <Label label="1. Upload File" />
        <p className="w60 fc-gray-700">
          Upload the content that showcases what happened. You are able to
          upload videos, ima
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
              action={ENDPOINT}
              onChange={onVideoSelect}>
              <div className=" resp-iframe bg-gray-100 flex-c flex-jc-c flex-column">
                <div className="bg-gray-200 circle flex-c flex-jc-c img--125">
                  <UploadOutlined className="fs-xxl fc-gray-500" />
                </div>
                <div className="mt25 mb25 flex-c flex-column">
                  <div className="fw-700">Upload</div>
                  <div>Select the video or image to publish</div>
                </div>
                <Button type="primary" className="h45--fixed w175--fixed">
                  Select File
                </Button>
              </div>
            </Upload>
          </div>
          ges or PDF files.
        </p>
      </div>
      <div className="mt25 resp-container border-dashed border-gray-300 rounded-1 click">
        <Upload
          multiple={false}
          showUploadList={false}
          name="file"
          action={ENDPOINT}
          onChange={onVideoSelect}>
          <div className=" resp-iframe bg-gray-100 flex-c flex-jc-c flex-column">
            <div className="bg-gray-200 circle flex-c flex-jc-c img--125">
              <UploadOutlined className="fs-xxl fc-gray-500" />
            </div>
            <div className="mt25 mb25 flex-c flex-column">
              <div className="fw-700">Upload</div>
              <div>Select the video or image to publish</div>
            </div>
            <Button type="primary" className="h45--fixed w175--fixed">
              Select File
            </Button>
          </div>
        </Upload>
      </div>
    </>
  );
};
