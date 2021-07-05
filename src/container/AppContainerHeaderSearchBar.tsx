import React, { ChangeEvent, useRef, useState } from 'react';
import { Dropdown } from 'antd/lib/index';
import { RouteComponentProps, withRouter } from 'react-router';
import Menu from 'antd/es/menu';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { AppContainerHeaderSearchBarItem } from './AppContainerHeaderSearchBarItem';

import _ from 'lodash';
import { LiskAccount } from '@lisk-react/types';
import { isArrayWithElements } from '../utils/type.utils';

interface ContainerProps extends RouteComponentProps {}

const SearchBar: React.FC<ContainerProps> = ({ history }) => {
  const delayedQuery = useRef(_.debounce(q => searchQuery(q), 100)).current;

  const [query, setQuery] = useState<string>();
  const [search_loading, setSearchLoading] = useState<boolean>();
  const [result, setResult] = useState<LiskAccount[]>([]);

  function onBlur() {
    setResult([]);
  }

  function navigate(uri: string) {
    history.push(uri);
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    delayedQuery(event.target.value);
  };

  async function searchQuery(value: string) {
    if (value.length <= 1) return;
    setResult([]);
    setSearchLoading(true);

    setResult(result);
    setSearchLoading(false);
  }

  return (
    <Dropdown
      visible={isArrayWithElements(result)}
      overlay={
        <Menu className="bg--dd-menu  p5">
          {result.map((item: any, idx: number) => (
            <Menu.Item
              key={idx}
              className="search--menu-item br5 w100 fc-lb click hover color-lb flex-c flex-jc-c">
              <AppContainerHeaderSearchBarItem
                account={item}
                navigate={navigate}
              />
            </Menu.Item>
          ))}
        </Menu>
      }>
      <div className="h70--fixed flex-c">
        <div className="menu--search bgc-white br20 bgc-xl-grey flex-c flex-jc-c w500--fixed color-lb pl25">
          <div className="mr15 mt5 fc-gray-600">
            {search_loading ? (
              <LoadingOutlined className="p0 m0 lh-none" />
            ) : (
              <SearchOutlined className="p0 m0 lh-none" />
            )}
          </div>
          <input
            className="h45--fixed"
            value={query}
            placeholder=""
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      </div>
    </Dropdown>
  );
};

export const AppContainerHeaderSearchBar = withRouter(SearchBar);
