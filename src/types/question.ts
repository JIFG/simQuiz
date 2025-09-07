export interface Question {
    id:string;
    tema: string;
    pregunta: string;
    opciones:string[];
    respuestasCorrectas:string[];
    explicacion?: string;
    imagen?: string; //URI o URL
}