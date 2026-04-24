import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import request from 'supertest';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
  private readonly baseUrl: string = 'https://pokeapi.co/api/v2/pokemon?limit=1';

  async executeSeed() {
    const {data} = await this.axios.get<PokeResponse>(this.baseUrl);
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no:number = +segments[ segments.length - 2 ];
      console.log({ name, no });
    });

    return data.results;
  }

}
