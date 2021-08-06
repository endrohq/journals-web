import { ApiMethods, ApiResponse } from '../typings';
import { ContentMetadata } from '../../typings';

export class Storage {
  private methods: ApiMethods;
  readonly BASE_URL: string;

  constructor(methods: ApiMethods, BASE_URI: string) {
    this.methods = methods;
    this.BASE_URL = `${BASE_URI}/api/files`;
  }

  async getMetadata(cid: string): Promise<ApiResponse<ContentMetadata>> {
    const response = (await this.methods.get({
      url: `${this.BASE_URL}/${cid}/metadata`
    })) as ApiResponse<ContentMetadata>;
    if (response) return response;
    return { data: undefined };
  }
}
