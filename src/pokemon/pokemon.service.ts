import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemoModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemoModel.create(createPokemonDto);
      return pokemon;
    } catch (error: any) {
      this.handleExceptions( error );
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;

    if( !isNaN(+term) ) {
      pokemon = await this.pokemoModel.findOne({ no: +term });
    } else {
      pokemon = await this.pokemoModel.findOne({ name: term.toLowerCase() });
    }

    // MongoID
    if ( !pokemon && isValidObjectId( term)) {
      pokemon = await this.pokemoModel.findById( term );
    }

    // Name
    if( !pokemon ) {
      pokemon = await this.pokemoModel.findOne({ name: term.toLowerCase().trim() });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon not found with term: ${ term }`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if( !updatePokemonDto || Object.keys(updatePokemonDto).length === 0 ) {
      throw new BadRequestException('Update data is required');
    }

    if ( updatePokemonDto.name ) 
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      const updatedPokemon = await this.pokemoModel.findByIdAndUpdate(
        pokemon._id,
        updatePokemonDto,
        { new: true }
      );

      return updatedPokemon;

    } catch (error: any) {
      this.handleExceptions( error );
    }
 
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    // return {id};
    // const result = await this.pokemoModel.findByIdAndDelete( id );
    const { deletedCount } = await this.pokemoModel.deleteOne({ _id: id });
    if ( deletedCount === 0 ) {
      throw new BadRequestException(`Pokemon with id ${ id } not found`);
    }
    return;
  }

  private handleExceptions( error: any ) {
    if (error.code === 11000) {
        throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue ) }`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);    
  }

}
