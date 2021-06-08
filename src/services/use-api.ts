import { useLisk } from '@lisk-react/use-lisk';

import { Delegates } from './endpoints/delegates';

import { ApiMethods, RequestOptions, ApiResponse } from './typings';

export const apiStates = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

export function useApi() {
  const { network } = useLisk();
  const BASE_URI = network?.endpoint?.nodeUrl;

  console.log(network);

  const methods: ApiMethods = {
    get,
    post
  };

  const delegates = new Delegates(methods, BASE_URI);

  async function get<T>(options: RequestOptions): Promise<ApiResponse<T>> {
    const { url } = options;

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const res = await fetch(url, {
      method: 'GET',
      headers
    });

    if (res.ok) {
      const response = await res.json();
      return {
        data: response?.data as T
      };
    }
    const error = await res.json();
    throw new Error(error?.message || 'Something went wrong');
  }

  async function post<T>(options: RequestOptions) {
    const { url, ...fetchOptions } = options;

    if (fetchOptions.body) {
      fetchOptions.body = JSON.stringify(fetchOptions.body);
    }
    const res = await fetch(url, {
      ...fetchOptions,
      method: 'POST',
      headers: {
        ...fetchOptions.headers,
        'Content-Type': 'application/json'
      }
    });
    if (res.ok) {
      const data = await res.json();
      return {
        state: apiStates.SUCCESS,
        data
      };
    }
    const error = await res.json();
    throw new Error(error?.message || 'Something went wrong');
  }

  return {
    api: {
      delegates
    }
  };
}
