import { FC } from 'react';
import { BulbOutlined, MinusOutlined } from '@ant-design/icons';
import { ContentItem, FileContext, TextAnnotations } from '../../../typings';
import { ContentPreviewDisplay } from '../../content/ContentPreviewDisplay';
import moment from 'moment';

interface Props {
  contentItem: ContentItem;
  loading: boolean;
  fileContext: FileContext;
  textAnnotations: TextAnnotations;
}

export const CreateEventPreview: FC<Props> = ({
  contentItem,
  loading,
  fileContext,
  textAnnotations
}) => {
  const thumbnailItem = contentItem?.items?.find(item =>
    item?.name?.startsWith('thumbnail')
  );
  return (
    <div className="bg-black-500 w100 rounded-1 pt10 pl10 pr10 pb15">
      <div className="mb15">
        <ContentPreviewDisplay
          cid={thumbnailItem?.cid}
          fileContext={fileContext}
          loading={loading}
        />
      </div>
      <div className="ml15 mr15">
        <div className="mb15">
          <div className="mb15 pb15 fs-s border-bottom border-gray-500">
            <div className="flex-c flex-jc-sb">
              <div className="fc-white fw-700">Name</div>
              <div className="fc-gray-100">
                {fileContext?.name ? fileContext?.name : <MinusOutlined />}
              </div>
            </div>
            <div className="flex-c fc-gray-100 flex-jc-sb">
              <div className="fc-white fw-700">Date Created</div>
              <div className="">
                {fileContext?.dateCreated ? (
                  moment(fileContext?.dateCreated).format('DD/MM/YYYY')
                ) : (
                  <MinusOutlined />
                )}
              </div>
            </div>
            <div className="flex-c fc-gray-100 flex-jc-sb">
              <div className="fc-white fw-700">GPS</div>
              <div className="">
                {fileContext?.gps ? (
                  `${fileContext?.gps?.longitude}, ${fileContext?.gps?.latitude}`
                ) : (
                  <MinusOutlined />
                )}
              </div>
            </div>
          </div>
          <div className="fw-700 fc-gray-100 flex-c mb5">
            <BulbOutlined />
            <div className="ml5">Insights</div>
          </div>
          {fileContext || textAnnotations ? (
            <>
              {fileContext?.labels?.map(item => (
                <span className="mr10">{item}</span>
              ))}
              {textAnnotations?.entities?.map(item => (
                <span>{item.entity}</span>
              ))}
              {textAnnotations?.verbs?.map(item => (
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
