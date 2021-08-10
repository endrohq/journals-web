import { ApiMethods, ApiResponse } from '../typings';
import { ContentItem, FileContext } from '../../typings';

export class Storage {
  private methods: ApiMethods;
  readonly BASE_URL: string;

  constructor(methods: ApiMethods, BASE_URI: string) {
    this.methods = methods;
    this.BASE_URL = `${BASE_URI}/api`;
  }

  async getEvent(
    address: string,
    eventId: string
  ): Promise<ApiResponse<ContentItem>> {
    const response = (await this.methods.get({
      url: `${this.BASE_URL}/accounts/${address}/events/${eventId}`
    })) as ApiResponse<ContentItem>;
    if (response) return response;
    return { data: undefined };
  }

  async getMetadata(
    address: string,
    eventId: string
  ): Promise<ApiResponse<FileContext>> {
    const response = (await this.methods.get({
      url: `${this.BASE_URL}/accounts/${address}/events/${eventId}/metadata`
    })) as ApiResponse<FileContext>;
    if (response) return response;
    return { data: undefined };
  }

  async remove(
    address: string,
    eventId: string
  ): Promise<ApiResponse<FileContext>> {
    const response = (await this.methods.remove({
      url: `${this.BASE_URL}/accounts/${address}/events/${eventId}`
    })) as ApiResponse<FileContext>;
    if (response) return response;
    return { data: undefined };
  }

  async findByAddress(address: string): Promise<ApiResponse<ContentItem>> {
    const response = (await this.methods.get({
      url: `${this.BASE_URL}/accounts/${address}/events`
    })) as ApiResponse<ContentItem>;
    if (response) return response;
    return { data: undefined };
  }
}
