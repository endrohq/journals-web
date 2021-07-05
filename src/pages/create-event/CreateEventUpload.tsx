import { FC, useState } from 'react';
import { message, Upload } from 'antd';
import { ENV } from '../../env';
import imageGallery from '../../assets/images/image-gallery.svg';
import { UploadContext } from '../../typings';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  setUploadContext(context: UploadContext): void;
}

export const CreateEventUpload: FC<Props> = ({ setUploadContext }) => {
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
      <div>
        <div className="p15-25 bgc-xl-grey">Upload</div>
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
                {loading ? (
                  <LoadingOutlined className="fs-xm" />
                ) : (
                  <img src={imageGallery} className="img--50" />
                )}
              </div>
              <span className="fc-gray-500 ">
                Click to upload your news event
              </span>
            </div>
          </div>
        </Upload>
      </div>
    </div>
  );
};
