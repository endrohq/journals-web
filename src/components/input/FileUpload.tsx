import { FC, useState } from 'react';
import { message, Upload } from 'antd';
import { ENV } from '../../env';
import imageGallery from '../../assets/images/image-gallery.svg';
import { UploadContext } from '../../typings';
import { LoadingOutlined } from '@ant-design/icons';
import Label from '../../components/input/Label';

interface Props {
  uploadContext: UploadContext;
  removeUploadContext(): void;
  setUploadContext(context: UploadContext): void;
}

export const FileUpload: FC<Props> = ({
  setUploadContext,
  uploadContext,
  removeUploadContext
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  async function onVideoSelect(info: any) {
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
    <div>
      <div className="mb15">
        <Label label="Upload" />
      </div>
      <div>
        <Upload
          showUploadList={false}
          className="w100-imp display-block"
          name="file"
          action={`${ENV.PREDICTION_API}/cdn`}
          onChange={onVideoSelect}>
          <div className="w100-imp create-event--upload bg-white rounded-1 br-c-blue__hover border-dashed flex-c flex-jc-c mb25 click ">
            <div className="flex-c flex-column mt25 mb25">
              <div className=" mb10">
                {loading && !uploadContext?.videoId ? (
                  <div className="img--50 flex-c flex-jc-c">
                    <LoadingOutlined className="fs-xm" />
                  </div>
                ) : (
                  <img src={imageGallery} className="img--50" />
                )}
              </div>
              <span className="fc-gray-500 ">
                {!uploadContext?.videoId ? (
                  <span className="fc-gray-500 ">
                    Click to upload your news event
                  </span>
                ) : loading && !uploadContext?.videoId ? (
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
    </div>
  );
};
