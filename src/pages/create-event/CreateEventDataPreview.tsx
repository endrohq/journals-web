import { FC } from 'react';
import {
  BulbOutlined,
  MinusOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
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
    <div className="bg-black-500 w100 rounded-1 pt10 pl10 pr10 pb15">
      <div className="resp-container rounded bg-black-400 mb25">
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
              <PlayCircleOutlined className="fc-gray-500 fs-xxl" />
              <div className="ml15 fc-gray-500">No media found</div>
            </>
          )}
        </div>
      </div>
      <div className="ml25 mr25">
        <div className="mb15">
          <div className="mb15 pb15 border-bottom border-gray-500">
            <div className="flex-c fc-gray-100 mb5 flex-jc-sb">
              <div className="  ">Filecoin Upload</div>
              <div>
                <MinusOutlined />
              </div>
            </div>
            <div className="flex-c mb5 fc-gray-100 flex-jc-sb">
              <div className="">Uniqueness</div>
              <div>
                <MinusOutlined />
              </div>
            </div>
          </div>
          <div className="fw-700 fc-gray-100 flex-c mb5">
            <BulbOutlined />
            <div className="ml5">Insights</div>
          </div>
          {uploadContext ? (
            <>
              {uploadContext?.labels?.map(item => (
                <span className="mr10">{item}</span>
              ))}
              {entities?.map(item => (
                <span>{item.entity}</span>
              ))}
              {verbs?.map(item => (
                <span className="mr10">{item}</span>
              ))}
            </>
          ) : (
            <div className="fc-gray-500">No labels found</div>
          )}
        </div>
      </div>
    </div>
  );
};
