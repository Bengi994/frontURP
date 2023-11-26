export type AlumnoConferencia = {
    alumnoId: number;
    conferenciaId: number;
    asistencia: boolean;
    catalog: {
        id: string;
        nombre: string;
    },
    user: {
        id: string;
        nombre: string;
    }
  };