import { ApiMethods, ApiResponse } from '../typings';
import { TextAnnotations } from '../../typings';

export class Analisis {
  private methods: ApiMethods;
  readonly BASE_URL: string;

  constructor(methods: ApiMethods, BASE_URI: string) {
    this.methods = methods;
    this.BASE_URL = `${BASE_URI}/api/files`;
  }

  async annotateText(text: string): Promise<ApiResponse<TextAnnotations>> {
    const response = (await this.methods.get({
      url: this.BASE_URL
    })) as ApiResponse<TextAnnotations>;
    if (response) return response;
    return { data: undefined };
  }
}
