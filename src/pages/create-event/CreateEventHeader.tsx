import { FC } from 'react';
import { BookOutlined } from '@ant-design/icons';

export const CreateEventHeader: FC = () => {
  return (
    <div className="flex-c lh-none pb25 border-bottom mb25">
      <div className="mr25">
        <BookOutlined className="fs-xxl" />
      </div>
      <div className=" ">
        <h1 className="fw-700 fs-l p0 m0">Publish News</h1>
      </div>
    </div>
  );
};
