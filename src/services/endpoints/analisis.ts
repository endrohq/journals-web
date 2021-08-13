import { ApiMethods, ApiResponse } from '../typings';
import { TextAnnotations } from '../../typings';

export class Analisis {
  private methods: ApiMethods;
  readonly BASE_URL: string;

  constructor(methods: ApiMethods, BASE_URI: string) {
    this.methods = methods;
    this.BASE_URL = `${BASE_URI}/api`;
  }

  async annotateText(
    description: string
  ): Promise<ApiResponse<TextAnnotations>> {
    const response = (await this.methods.post({
      url: `${this.BASE_URL}/annotate`,
      body: {
        description
      }
    })) as ApiResponse<TextAnnotations>;
    if (response) return response;
    return { data: undefined };
  }

  async getContentContext(
    cid: string,
    ipfsPath: string
  ): Promise<ApiResponse<TextAnnotations>> {
    const response = (await this.methods.post({
      url: `${this.BASE_URL}/files/${cid}/context`,
      body: {
        ipfsPath
      }
    })) as ApiResponse<TextAnnotations>;
    if (response) return response;
    return { data: undefined };
  }
}
