import { LiskAccount } from '../typings';
import { get } from './request';
import { isObjectWithFields } from '../../utils/type-checking';
import { fromRawLsk } from '../../utils/currency-converters';
import { LiskNetwork } from '../providers/LiskClientProvider';

export class AccountService {
  network: LiskNetwork;
  BASE_URI = '/accounts';

  constructor(network: LiskNetwork) {
    this.network = network;
  }

  get = async (address: string) => {
    const BASE_URL = `${this.network.nodeUrl}${this.BASE_URI}`;
    const { data }: { data: LiskAccount } = await get({
      url: `${BASE_URL}/${address}`
    });
    if (isObjectWithFields(data)) {
      data.token.balance = fromRawLsk(Number(data.token.balance));
      return data;
    }
    return undefined;
  };
}
