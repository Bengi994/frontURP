import {api} from "../../utils/api";

export const useAlumnoConferencia = () => {
  const createAlumnoConferencia = async (aConferencia: any): Promise<any> => {
      const { data: { data: dataRaw } } = await api.post('/alumno-conferencas', {
          data: aConferencia,
      });

      return {
          ...dataRaw.attributes,
          id: dataRaw.id,
      };
  };
  const updateAlumnoConferencia = async (AlumnoConferenciaId: string, updatedAlumnoConferencia: any): Promise<any> => {
    const response = await api.put(`/alumno-conferencas/${AlumnoConferenciaId}`, {
      data: updatedAlumnoConferencia,
    });

    if (response.status === 200) {
      return updatedAlumnoConferencia; // Puedes devolver el catálogo actualizado si es necesario.
    } else {
      // Manejo de errores o retorno de nulo según tus necesidades.
      return null;
    }
  };

  return {
    createAlumnoConferencia,
    updateAlumnoConferencia
  };
}