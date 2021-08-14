import { FC, useEffect, useState } from 'react';
import { ContentItem } from '../../typings';
import { MyNewsListItem } from './MyNewsListItem';
import { isArrayWithElements } from '../../utils/type.utils';
import { CreateEventProps, ModalType } from '../../components/modals';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useModal } from '../../hooks/useModal';
import { Modal } from 'antd';
import { useApi } from '../../services/use-api';
import { useWallet } from '@lisk-react/use-lisk';
import { PageLoading } from '../../components/loaders/PageLoading';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/router/routes';

const { confirm } = Modal;

export interface Props {
  activeEventId: string;
}

export const MyNewsList: FC<Props> = ({ activeEventId }) => {
  const { openModal } = useModal();
  const [loading, setLoading] = useState(true);
  const [isRemovingCid, setIsRemovingEvent] = useState<string>();
  const [bucketList, setBucketList] = useState<ContentItem>();
  const { api } = useApi();
  const { account } = useWallet();

  async function fetchData() {
    try {
      const { data } = await api.storage.findByAddress(account.address);
      setBucketList(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRemovingEvent(undefined);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(activeEventId);
    if (activeEventId) {
      publish(activeEventId);
    }
  }, [activeEventId]);

  function publish(eventId: string) {
    openModal<CreateEventProps>(ModalType.CREATE_EVENT_CONTEXT, {
      width: '75%',
      data: {
        eventId
      },
      onSubmit() {}
    });
  }
  function removeConfirm(eventId: string) {
    confirm({
      title: 'Do you want to delete the upload?',
      icon: <ExclamationCircleOutlined />,
      content: "Make sure you're absolutely certain about the deletion.",
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        setIsRemovingEvent(eventId);
        remove(eventId);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  async function remove(eventId: string) {
    try {
      await api.storage.remove(account?.address, eventId);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="grid-xl mt50">
      <div className="w100 flex-c pb10 border-bottom mb15 fw-700 fc-gray-700">
        <div className="w35">Content</div>
        <div className="w25">Status</div>
      </div>
      <div>
        {loading ? (
          <PageLoading />
        ) : isArrayWithElements(bucketList?.items) ? (
          bucketList?.items?.map((item, idx) => (
            <MyNewsListItem
              item={item}
              key={idx}
              isRemovingCid={isRemovingCid}
              publish={publish}
              remove={removeConfirm}
            />
          ))
        ) : (
          <div className="w100 mb15 flex-c pb15 border-bottom">
            <div className="w50 flex-c">
              <div className="w100--fixed rounded-1 bg-gray-200 resp-container">
                <div className="resp-iframe image-contain" />
              </div>
              <div className="ml25">
                Start uploading your first news events{' '}
                <Link to={ROUTES.CREATE_EVENT} className="click fc-blue">
                  here
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
