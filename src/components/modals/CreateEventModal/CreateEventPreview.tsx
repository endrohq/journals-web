import { FC } from 'react';
import { BulbOutlined, MinusOutlined } from '@ant-design/icons';
import { FileContext, TextAnnotations } from '../../../typings';
import { ContentPreviewDisplay } from '../../content/ContentPreviewDisplay';

interface Props {
  ipfsPath: string;
  cid: string;
  loading: boolean;
  fileContext: FileContext;
  textAnnotations: TextAnnotations;
}

export const CreateEventPreview: FC<Props> = ({
  ipfsPath,
  cid,
  loading,
  fileContext,
  textAnnotations
}) => {
  return (
    <div className="bg-black-500 w100 rounded-1 pt10 pl10 pr10 pb15">
      <div className="mb25">
        <ContentPreviewDisplay
          cid={cid}
          fileContext={fileContext}
          loading={loading}
        />
      </div>
      <div className="ml25 mr25">
        <div className="mb15">
          <div className="mb15 pb15 border-bottom border-gray-500">
            <div className="flex-c  mb5 flex-jc-sb">
              <div className="fc-gray-100">Name</div>
              <div className="fc-white fw-700">
                {fileContext?.name ? fileContext?.name : <MinusOutlined />}
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
