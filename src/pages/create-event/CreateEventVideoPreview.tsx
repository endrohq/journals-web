import { FC } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { UploadContext } from '../../typings';
import { ENV } from '../../env';

interface Props {
  uploadContext: UploadContext;
}

export const CreateEventVideoPreview: FC<Props> = ({ uploadContext }) => {
  return (
    <div className="bg-gray-200 w100 rounded-1 p10 ">
      <div className="resp-container rounded bg-white mb25">
        <div className="resp-iframe flex-c flex-jc-c">
          {uploadContext ? (
            <video
              autoPlay
              loop
              muted
              className="w100 h100 image-contain"
              controlsList="nodownload"
              disablePictureInPicture>
              <source
                src={`${ENV.PREDICTION_API}/cdn/${uploadContext.videoId}`}
              />
            </video>
          ) : (
            <>
              <PlayCircleOutlined className="fc-gray-100 fs-xxl" />
              <div className="ml15  fc-gray-100">No media found</div>
            </>
          )}
        </div>
      </div>
      <div className="">
        <div>Video labels</div>
        {uploadContext?.labels?.map(item => (
          <Tag>{item}</Tag>
        ))}
      </div>
    </div>
  );
};
