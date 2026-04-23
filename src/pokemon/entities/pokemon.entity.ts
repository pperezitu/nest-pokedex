import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    // id: string;  //  MongoDB genera un ID automáticamente, no es necesario definirlo aquí
    @Prop({
        unique: true,
        index: true
    })
    name: string;
    
    @Prop({
        unique: true,
        index: true
    })
    no: number; 
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
