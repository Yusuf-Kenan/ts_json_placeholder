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

export type JsonAlbumType = {
  userId: number;
  id: number;
  title: string;
};

export type JsonPostType = JsonAlbumType & {
  body: string;
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

  async getUser(userID: number) {
    const result: AxiosResponse<JsonUserType> =
      await this.axiosClient.get<JsonUserType>("users/" + userID);
    return result.data;
  }

  async getAlbums(userID?: number, _start?: number, _limit?: number) {
    const result: AxiosResponse<JsonAlbumType[]> = await this.axiosClient.get<
      JsonAlbumType[]
    >("albums", {
      params: {
        userID: userID,
        _start: _start,
        _limit: _limit,
      },
    });
    return result.data;
  }

  async getPosts(userID?: number, _start?: number, _limit?: number) {
    const result: AxiosResponse<JsonPostType[]> = await this.axiosClient.get<
      JsonPostType[]
    >("posts", {
      params: {
        userID: userID,
        _start: _start,
        _limit: _limit,
      },
    });
    return result.data;
  }
}

export default function useJsonApi(): JsonPlaceholderApi {
  return new JsonPlaceholderApi(import.meta.env.VITE_API_BASE_URL);
}
