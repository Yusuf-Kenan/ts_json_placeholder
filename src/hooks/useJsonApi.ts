/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { Axios, AxiosResponse } from "axios";

export type JsonUserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export class JsonPlaceholderApi {
  private readonly axiosClient: Axios;

  constructor(private readonly baseUrl: string) {
    this.axiosClient = axios;
    this.axiosClient.defaults.baseURL = baseUrl;
  }

  async users(_start?: number, _limit?: number) {
    const result: AxiosResponse<JsonUserType[]> = await this.axiosClient.get<
      JsonUserType[]
    >("users", {
      params: {
        _start: _start,
        _limit: _limit,
      },
    });
    return result;
  }
}

export default function useJsonApi(): JsonPlaceholderApi {
  return new JsonPlaceholderApi(import.meta.env.VITE_API_BASE_URL);
}
