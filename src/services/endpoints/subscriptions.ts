import { ApiMethods, ApiResponse } from '../typings';
import { LiskAccount } from '@lisk-react/types';

export class Subscriptions {
  private methods: ApiMethods;
  readonly BASE_URL: string;

  constructor(methods: ApiMethods, BASE_URI: string) {
    this.methods = methods;
    this.BASE_URL = `${BASE_URI}/api/delegates`;
  }

  async hasActiveSubscription(): Promise<ApiResponse<LiskAccount[]>> {
    const response = (await this.methods.get({
      url: this.BASE_URL
    })) as ApiResponse<LiskAccount[]>;
    if (response) return response;
    return { data: [], meta: undefined };
  }
}
