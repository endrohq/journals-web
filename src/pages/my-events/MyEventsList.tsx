import { FC } from 'react';
import { ContentItem } from '../../typings';
import { MyEventsListItem } from './MyEventsListItem';
import { isArrayWithElements } from '../../utils/type.utils';
import { CreateEventProps, ModalType } from '../../components/modals';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useModal } from '../../hooks/useModal';
import { Modal } from 'antd';

const { confirm } = Modal;

export interface Props {
  items: ContentItem[];
}

export const MyEventsList: FC<Props> = ({ items }) => {
  const { openModal } = useModal();

  function publish(ipfsPath: string, cid: string) {
    openModal<CreateEventProps>(ModalType.CREATE_EVENT_CONTEXT, {
      width: '60%',
      data: {
        ipfsPath,
        cid
      },
      onSubmit() {}
    });
  }
  function remove() {
    confirm({
      title: 'Do you want to delete the upload?',
      icon: <ExclamationCircleOutlined />,
      content: "Make sure you're absolutely certain about the deletion.",
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  return (
    <div className="grid-xl mt50">
      <div className="w100 flex-c pb10 border-bottom mb15 fw-700 fc-gray-700">
        <div className="w35">Content</div>
        <div className="w25">Status</div>
        <div className="w25">Date</div>
      </div>
      <div>
        {isArrayWithElements(items) ? (
          items?.map(item => (
            <MyEventsListItem item={item} publish={publish} remove={remove} />
          ))
        ) : (
          <div>Nothing found!</div>
        )}
      </div>
    </div>
  );
};
