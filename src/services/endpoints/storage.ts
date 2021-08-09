import { ApiMethods, ApiResponse } from '../typings';
import { ContentItem, FileContext } from '../../typings';

export class Storage {
  private methods: ApiMethods;
  readonly BASE_URL: string;

  constructor(methods: ApiMethods, BASE_URI: string) {
    this.methods = methods;
    this.BASE_URL = `${BASE_URI}/api`;
  }

  async getMetadataByIpfsPath(
    ipfsPath: string
  ): Promise<ApiResponse<FileContext>> {
    const response = (await this.methods.get({
      url: `${this.BASE_URL}/files/metadata?ipfsPath=${ipfsPath}`
    })) as ApiResponse<FileContext>;
    if (response) return response;
    return { data: undefined };
  }

  async getMetadata(
    address: string,
    cid: string
  ): Promise<ApiResponse<FileContext>> {
    const response = (await this.methods.get({
      url: `${this.BASE_URL}/accounts/${address}/files/${cid}/metadata`
    })) as ApiResponse<FileContext>;
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
