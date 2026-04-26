import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { URL_BASES } from '../common/URL/url-bases';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemoModel: Model<Pokemon> ,
    private readonly http: AxiosAdapter
  ) {
   
  }

  async executeSeed() {

    await this.pokemoModel.deleteMany({}); // delete * from pokemon collection

    const data = await this.http.get<PokeResponse>(URL_BASES.POKEAPI + `?limit=600`);

    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(async({ name, url }) => {
      const segments = url.split('/');
      const no:number = +segments[ segments.length - 2 ];

      pokemonToInsert.push({ name, no });
    });

    await this.pokemoModel.insertMany( pokemonToInsert );


    return 'Seed executed';
  }

}
