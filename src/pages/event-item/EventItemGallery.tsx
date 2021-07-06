import { FC } from 'react';
import { ENV } from '../../env';

interface Props {
  videoId: string;
}

export const EventItemGallery: FC<Props> = ({ videoId }) => {
  return (
    <div className="w100 bg-black-500 h175--fixed p5 rounded-1">
      <div className="w25 h100">
        <div className="resp-container h100">
          <div className="resp-iframe ">
            <video
              autoPlay
              loop
              muted
              className="w100 h100 rounded-1 image-contain"
              controlsList="nodownload"
              disablePictureInPicture>
              <source src={`${ENV.PREDICTION_API}/cdn/${videoId}`} />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};
