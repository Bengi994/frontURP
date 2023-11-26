import {api} from "../../utils/api";

export const useCatalog = () => {
  const createCatalog = async (catalog: any, foto: any): Promise<any> => {
      const { data: { data: dataRaw } } = await api.post('/catologos', {
          data: catalog,
      });


      // Llamar a una función para manejar el envío de la imagen
      await enviarImagen(catalog.id, foto);

      return {
          ...dataRaw.attributes,
          id: dataRaw.id,
      };
  };
  const getCatalogId = async (catalogId: string) => {
    const response = await api.get(`/catologos/${catalogId}`);
    const catalogData = response.data.data.attributes;
    return catalogData;
  }
  const updateCatalog = async (catalogId: string, updatedCatalog: any): Promise<any> => {
    const response = await api.put(`/catologos/${catalogId}`, {
      data: updatedCatalog,
    });

    if (response.status === 200) {
      return updatedCatalog; // Puedes devolver el catálogo actualizado si es necesario.
    } else {
      // Manejo de errores o retorno de nulo según tus necesidades.
      return null;
    }
  };
  // const uploadPhoto = async (files: any, refId: string): Promise<boolean> => {
  //     const formData = new FormData();

  //     formData.append('files',files);
  //     formData.append('ref','api::catologo.catologo');
  //     formData.append('refId',refId);
  //     formData.append('field','foto');

  //     const response = await api.post('/upload', formData, {
  //         headers: {
  //             'content-type': 'multipart/form-data'
  //         }
  //     });

  //     return response.status === 200;
  // }

  const enviarImagen = async (catalogoId: string, foto: any) => {
    try {
      // Crear un objeto FormData para enviar la imagen
      const formData = new FormData();
      formData.append('files', foto);
  
      // Hacer una solicitud para enviar la imagen
      const response = await api.post(`/catologos/${catalogoId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Verificar que la imagen se haya enviado correctamente
      if (response.status === 200) {
        console.log('Imagen enviada exitosamente');
      } else {
        console.error('Error al enviar la imagen:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar la imagen:', error);
    }
  };

  return {
      createCatalog,
      uploadPhoto,
      updateCatalog,
      getCatalogId
  };
}
