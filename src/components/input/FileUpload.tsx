import { FC, useState } from 'react';
import { Button, message, Upload } from 'antd';
import { ENV } from '../../env';
import { NewsEventMedia } from '../../typings';
import Label from '../../components/input/Label';

interface Props {
  uploadContext: NewsEventMedia;
  files: File[];
  setFile(file: File): void;
  setUploadContext(context: NewsEventMedia): void;
}

export const FileUpload: FC<Props> = ({
  setUploadContext,
  uploadContext,
  files,
  setFile
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  async function onVideoSelect(info: any) {
    console.log(info);
    if (info.file.status === 'uploading') {
      setLoading(true);
    } else if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setUploadContext(info.file.response);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  console.log(loading);

  return (
    <>
      <div className="mb5">
        <Label label="File" />
        <p className="w60 fc-gray-700">
          Upload the content that showcases what happened. You are able to
          upload videos, images or PDF files.
        </p>
      </div>
      <div className="flex-c p7-10 fc-black">
        <div className="w40">Name</div>
        <div className="w25">Size</div>
      </div>
      <div className="border-bottom border-top">
        {uploadContext ? (
          files.map(item => (
            <div className="flex-c p7-10 lh-none">
              <div className="w40 p0 m0">{item.name}</div>
            </div>
          ))
        ) : (
          <div className="flex-c p5-10  bg-gray-100 fc-gray-500">
            No files found
          </div>
        )}
      </div>
      <div className="mt15 flex-c flex-jc-fe">
        <Upload
          className=" "
          name="file"
          action={`${ENV.PREDICTION_API}/process`}
          onChange={onVideoSelect}>
          <Button type="primary" className=" w100--fixed" shape="round">
            Upload
          </Button>
        </Upload>
      </div>
    </>
  );
};
