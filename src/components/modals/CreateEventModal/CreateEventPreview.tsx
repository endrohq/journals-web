import { FC } from 'react';
import { BulbOutlined, MinusOutlined } from '@ant-design/icons';
import { ContentItem, FileContext, TextAnnotations } from '../../../typings';
import { ContentPreviewDisplay } from '../../content/ContentPreviewDisplay';
import moment from 'moment';
import { Tag } from 'antd';

interface Props {
  contentItem: ContentItem;
  loading: boolean;
  thumbnailCid: string;
  fileContext: FileContext;
  textAnnotations: TextAnnotations;
}

export const CreateEventPreview: FC<Props> = ({
  thumbnailCid,
  loading,
  fileContext,
  textAnnotations
}) => {
  return (
    <div className="bg-gray-100 w100 rounded-1 border pt10 pl10 pr10 pb15">
      <div className="mb15">
        <ContentPreviewDisplay
          cid={thumbnailCid}
          fileContext={fileContext}
          loading={loading}
        />
      </div>
      <div className="ml15 mr15">
        <div className="mb10 border-bottom pb10 fs-s">
          <div className="flex-c flex-jc-sb">
            <div className="fc-black ">Name</div>
            <div className="">
              {fileContext?.name ? fileContext?.name : <MinusOutlined />}
            </div>
          </div>
          <div className="flex-c flex-jc-sb">
            <div className="fc-black ">Date Created</div>
            <div className="">
              {fileContext?.dateCreated ? (
                moment(fileContext?.dateCreated).format('DD/MM/YYYY')
              ) : (
                <MinusOutlined />
              )}
            </div>
          </div>
          <div className="flex-c flex-jc-sb">
            <div className="fc-black ">GPS</div>
            <div className="">
              {fileContext?.gps ? (
                `${fileContext?.gps?.longitude}, ${fileContext?.gps?.latitude}`
              ) : (
                <MinusOutlined />
              )}
            </div>
          </div>
        </div>
        <div className="fw-700 fc-black flex-c mb10">
          <BulbOutlined />
          <div className="ml5">Insights</div>
        </div>
        {fileContext || textAnnotations ? (
          <div className="flex-c flex-ww">
            {fileContext?.labels?.map(item => (
              <Tag color="geekblue" className="mb5 nowrap">
                {item}
              </Tag>
            ))}
            {textAnnotations?.entities?.map(item => (
              <Tag color="geekblue" className="mb5 nowrap">
                {item.entity}
              </Tag>
            ))}
            {textAnnotations?.verbs?.map(item => (
              <Tag color="geekblue" className="mb5 nowrap">
                {item}
              </Tag>
            ))}
          </div>
        ) : (
          <div className="fc-gray-500">No labels found</div>
        )}
      </div>
    </div>
  );
};
