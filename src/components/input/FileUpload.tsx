import { FC, useState } from 'react';
import { message, Upload } from 'antd';
import { ENV } from '../../env';
import { NewsEventMedia } from '../../typings';
import { FileAddOutlined, LoadingOutlined } from '@ant-design/icons';
import Label from '../../components/input/Label';

interface Props {
  uploadContext: NewsEventMedia;
  removeUploadContext(): void;
  setUploadContext(context: NewsEventMedia): void;
}

export const FileUpload: FC<Props> = ({
  setUploadContext,
  uploadContext,
  removeUploadContext
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  async function onVideoSelect(info: any) {
    console.log(info.file);
    if (info.file.status === 'uploading') {
      setLoading(true);
    } else if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setUploadContext(info.file.response);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  return (
    <>
      <div className="mb15">
        <Label label="File Upload" />
      </div>
      <div>
        <Upload
          className=" "
          name="file"
          action={`${ENV.PREDICTION_API}/process`}
          onChange={onVideoSelect}>
          <div className=" create-event--upload bg-white rounded-1 br-c-blue__hover border-dashed flex-c flex-jc-c click ">
            <div className="flex-c mt25 mb25 lh-none">
              <div className=" mr15">
                <div className="fs-xl fc-gray-300">
                  {loading && !uploadContext?.mediaId ? (
                    <LoadingOutlined />
                  ) : (
                    <FileAddOutlined />
                  )}
                </div>
              </div>
              <span className="fc-gray-500 ">
                {!uploadContext?.mediaId ? (
                  <span className="fc-gray-500 ">
                    Click to upload your news event
                  </span>
                ) : loading && !uploadContext?.mediaId ? (
                  <span className=" click">Uploading ..</span>
                ) : (
                  <span
                    onClick={() => removeUploadContext()}
                    className="fc-gray-500 click">
                    Remove
                  </span>
                )}
              </span>
            </div>
          </div>
        </Upload>
      </div>
    </>
  );
};
