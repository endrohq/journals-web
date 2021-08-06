import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { ContextMetadata, UploadContext } from '../../typings';
import { CreateEventPreview } from './CreateEventPreview';
import { ENV } from '../../env';
import { RichTextField } from '../../components/input/RichTextField';
import { Descendant } from 'slate';
import { CreateEventHeader } from './CreateEventHeader';

interface Props {
  uploadContext: UploadContext;
  create(): void;
}

export const CreateEventContext: React.FC<Props> = ({ uploadContext }) => {
  const [description, setDescription] = React.useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }]
    }
  ]);
  const [contextMetadata, setContextMetadata] = useState<ContextMetadata>();
  const [updatingContext, shouldUpdateContext] = useState<boolean>(false);

  useEffect(() => {
    if (updatingContext) {
      renderInsights();
    }
  }, [updatingContext]);

  useEffect(() => {
    shouldUpdateContext(true);
  }, [description]);

  async function renderInsights() {
    try {
      const response = await fetch(`${ENV.ANALISIS_API}/annotate`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: '' })
      });
      if (response.ok) {
        const content = await response.json();
        setContextMetadata(content);
      }
    } catch (e) {
    } finally {
      shouldUpdateContext(false);
    }
  }

  useEffect(() => {
    renderInsights();
  }, [description]);

  return (
    <div className="w100 flex-fs flex-jc-sb">
      <div className="w60">
        <CreateEventHeader />
        <div className=" mb25">
          <RichTextField
            label="Context"
            value={description}
            setValue={setDescription}
            placeholder="Provide some context on what happened"
            error={undefined}
          />
        </div>

        <div className="border-top pt15 pb15 flex-c flex-jc-fe">
          <Button
            onClick={() => ''}
            className="h45--fixed w175--fixed"
            type="primary">
            Create
          </Button>
        </div>
      </div>
      <div className="w35">
        <CreateEventPreview
          contextMetadata={contextMetadata}
          uploadContext={uploadContext}
        />
      </div>
    </div>
  );
};
