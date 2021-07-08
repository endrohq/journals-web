import { FC } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Entity, NewsEventMedia } from '../../typings';
import { ENV } from '../../env';

interface Props {
  uploadContext: NewsEventMedia;
  entities: Entity[];
  verbs: string[];
}

export const CreateEventDataPreview: FC<Props> = ({
  uploadContext,
  entities,
  verbs
}) => {
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
              <source src={`${ENV.VIDEOS_CDN}/${uploadContext.mediaId}`} />
            </video>
          ) : (
            <>
              <PlayCircleOutlined className="fc-gray-100 fs-xxl" />
              <div className="ml15  fc-gray-100">No media found</div>
            </>
          )}
        </div>
      </div>
      <div className="ml15">
        <div className="mb25">
          <div className="fw-700">Video labels</div>
          {uploadContext ? (
            uploadContext?.labels?.map(item => <Tag>{item}</Tag>)
          ) : (
            <div className="fc-gray-500">No labels found</div>
          )}
        </div>
        <div className="mb25">
          <div className="fw-700">Entities</div>
          {entities ? (
            entities?.map(item => <Tag>{item.entity}</Tag>)
          ) : (
            <div className="fc-gray-500">No entities found</div>
          )}
        </div>
        <div className="mb25">
          <div className="fw-700">Verbs</div>
          {verbs ? (
            verbs?.map(item => <Tag>{item}</Tag>)
          ) : (
            <div className="fc-gray-500">No verbs found</div>
          )}
        </div>
      </div>
    </div>
  );
};
