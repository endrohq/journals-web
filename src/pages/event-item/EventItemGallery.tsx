import { FC } from 'react';
import { ENV } from '../../env';
import { NewsEventActivity } from '../../typings';

interface Props {
  activity: NewsEventActivity[];
}

export const EventItemGallery: FC<Props> = ({ activity }) => {
  const media = activity.map(activity => activity.media).flat();
  return (
    <div className="w100 bg-black-500 h175--fixed p5 rounded-1 flex-c">
      {media?.map(mediaItem => (
        <div className=" resp-container h100 mr5">
          <div className="resp-iframe ">
            <video
              autoPlay
              loop
              muted
              className="w100 h100 image-contain"
              controlsList="nodownload"
              disablePictureInPicture>
              <source src={`${ENV.VIDEOS_CDN}/${mediaItem.mediaId}`} />
            </video>
          </div>
        </div>
      ))}
    </div>
  );
};
