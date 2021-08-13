import { FC } from 'react';
import { ContentItem, FileContext } from '../../../typings';
import { isImage } from '../../../utils/file.utils';

export interface Props {
  fileContext: FileContext;
  contentItem: ContentItem;
  thumbnailCid: string;
  setThumbnailCid(cid: string): void;
}

export const CreateEventThumbnails: FC<Props> = ({
  contentItem,
  setThumbnailCid,
  thumbnailCid,
  fileContext
}) => {
  const thumbnails = contentItem?.items?.filter(item =>
    item?.name.startsWith('thumbnail')
  );

  if (fileContext && isImage(fileContext?.type)) {
    return <></>;
  }
  return (
    <div>
      <div className="mb15">
        <div className="fw-700">Thumbnail</div>
        <div className="fc-gray-700 w60">
          Select an image that provides the best overview on what's happening.{' '}
        </div>
      </div>
      <div className="grid-col4">
        {!fileContext ? (
          <>
            <div className="resp-container">
              <div className="w100 h100 resp-iframe border-primary rounded-1 bg-gray-100" />
            </div>
            <div className="resp-container">
              <div className="w100 h100 border-primary rounded-1 bg-gray-100" />
            </div>
            <div className="resp-container">
              <div className="w100 h100 border-primary rounded-1 bg-gray-100" />
            </div>
            <div className="resp-container">
              <div className="w100 h100 border-primary rounded-1 bg-gray-100" />
            </div>
          </>
        ) : (
          thumbnails?.map(item => (
            <div
              onClick={() => setThumbnailCid(item?.cid)}
              className={`click ${
                thumbnailCid === item?.cid &&
                'border rounded-1 border-blue border-width-2'
              }`}>
              <img
                className="w100 h100 border-primary rounded image-contain"
                src={`https://ipfs.io/ipfs/${item.cid}`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
