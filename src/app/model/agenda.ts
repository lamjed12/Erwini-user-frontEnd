import { Pompe } from "./pompe"
import { puit } from "./puit"

export class Agenda {
    
    _id : Number | undefined
    date_debut : string | undefined
    date_fin : string | undefined
    type : String | undefined
    puit: puit | undefined
    pompe: Pompe | undefined
}