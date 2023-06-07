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

export type JsonPhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type JsonCommetType = {
  postId: number;
  id: number;
  name: string;
  email: string;
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

  async getUser(userId: number) {
    const result: AxiosResponse<JsonUserType> =
      await this.axiosClient.get<JsonUserType>("users/" + userId);
    return result.data;
  }

  async getAlbums(userId?: number, _start?: number, _limit?: number) {
    const result: AxiosResponse<JsonAlbumType[]> = await this.axiosClient.get<
      JsonAlbumType[]
    >("albums", {
      params: {
        userId: userId,
        _start: _start,
        _limit: _limit,
      },
    });
    return result.data;
  }

  async getAlbum(albumId: number) {
    const result: AxiosResponse<JsonAlbumType> =
      await this.axiosClient.get<JsonAlbumType>("albums/" + albumId);
    return result.data;
  }

  async getPosts(userId?: number, _start?: number, _limit?: number) {
    const result: AxiosResponse<JsonPostType[]> = await this.axiosClient.get<
      JsonPostType[]
    >("posts", {
      params: {
        userId: userId,
        _start: _start,
        _limit: _limit,
      },
    });
    return result.data;
  }

  async getPost(postId: number) {
    const result: AxiosResponse<JsonPostType> =
      await this.axiosClient.get<JsonPostType>("posts/" + postId);
    return result.data;
  }

  async getPhotos(albumId?: number, _start?: number, _limit?: number) {
    const result: AxiosResponse<JsonPhotoType[]> = await this.axiosClient.get<
      JsonPhotoType[]
    >("photos", {
      params: {
        albumId: albumId,
        _start: _start,
        _limit: _limit,
      },
    });

    return result.data;
  }

  async getCommets(postId?: number, _start?: number, _limit?: number) {
    const result: AxiosResponse<JsonCommetType[]> = await this.axiosClient.get<
      JsonCommetType[]
    >("comments", {
      params: {
        postId: postId,
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
