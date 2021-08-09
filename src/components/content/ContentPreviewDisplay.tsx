import { FC } from 'react';
import { getCidContentRoute } from '../../shared/router/routes';
import { LoadingOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { FileContext } from '../../typings';
import { isImage, isVideo } from '../../utils/file.utils';
import { Tag } from 'antd';

interface Props {
  cid: string;
  fileContext?: FileContext;
  loading: boolean;
}

export const ContentPreviewDisplay: FC<Props> = ({
  cid,
  fileContext,
  loading
}) => {
  function getImage() {
    return (
      <img className="w100 h100 image-contain" src={getCidContentRoute(cid)} />
    );
  }

  function getVideo() {
    return (
      <video
        autoPlay
        loop
        muted
        className="w100 h100 image-contain"
        disablePictureInPicture>
        <source src={getCidContentRoute(cid)} />
      </video>
    );
  }

  return (
    <div className="resp-container rounded bg-black-400">
      <div className="resp-iframe pos-rel ">
        <div
          style={{ top: 0, bottom: 0, left: 0, right: 0 }}
          className="pos-abs flex-c flex-jc-c">
          {loading ? (
            <LoadingOutlined className="fc-gray-500 fs-xxl" />
          ) : !fileContext ? (
            <MinusCircleOutlined className="fc-gray-500 fs-xxl" />
          ) : isImage(fileContext?.type) ? (
            getImage()
          ) : isVideo(fileContext?.type) ? (
            getVideo()
          ) : (
            <div className="fc-white">file format not recognized</div>
          )}
        </div>
        {!loading && fileContext && (
          <div className="pos-abs" style={{ top: 5, right: 0 }}>
            <Tag color="geekblue">{fileContext?.type}</Tag>
          </div>
        )}
      </div>
    </div>
  );
};
