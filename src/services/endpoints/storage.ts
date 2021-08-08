import { ApiMethods, ApiResponse } from '../typings';
import { ContentItem, ContentMetadata } from '../../typings';

export class Storage {
  private methods: ApiMethods;
  readonly BASE_URL: string;

  constructor(methods: ApiMethods, BASE_URI: string) {
    this.methods = methods;
    this.BASE_URL = `${BASE_URI}/api`;
  }

  async getMetadata(cid: string): Promise<ApiResponse<ContentMetadata>> {
    const response = (await this.methods.get({
      url: `${this.BASE_URL}/files/${cid}/metadata`
    })) as ApiResponse<ContentMetadata>;
    if (response) return response;
    return { data: undefined };
  }

  async findByAddress(address: string): Promise<ApiResponse<ContentItem>> {
    const response = (await this.methods.get({
      url: `${this.BASE_URL}/accounts/${address}/files`
    })) as ApiResponse<ContentItem>;
    if (response) return response;
    return { data: undefined };
  }
}
