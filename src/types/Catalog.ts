import { DateSchema } from "yup";

export type Catalog = {
  id: string;
  tema_conferencia: string;
  descripcion: string;
  foto:any; 
  expositor: string;
  fecha: Date;
  hora: DateSchema;
  dirigido: string;
  disponible: boolean;
  solicitado_por:string; 
  inscripciones: Inscripcion[];
  repositorio: string;
  salon: any;
};


export type Inscripcion = {
    nombre: string;
    apellido: string;
    codigo: string;
    carrera: string;
    asistencia: string;
};