import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Convalida } from "../../types/Convalida";

export const useConvalidas = () => {
    const [users, setUsers] = useState<Convalida[]>([]);
    const [convalidan, setConvalida] = useState<Convalida[]>([]);

    const createConvalida = async (data: Convalida): Promise<boolean> => {
         const response = await api.post('/convalidars', {
                 ...data,
                 tema_conferencia:data.tema_conferencia,
                 nombre_institucion: data.nombre_institucion,
                 ubicacion: data.ubicacion,
         }).catch(response => {
             return response.response;
         });

        if (response.data?.error) {
            const { details: { errors } } = response.data.error;


            return false;
        }

         await getUsers();

         return response.status === 200;
    };

    const removeConvalida = async (data: string) => {
        await api.put(`/convalidas/${data}`, {
          data: {
            disponible: false,
            miconf: false
          }
        });
    
        await getConvalida();
      };
    
      const enabledConvalida = async (data: string) => {
        await api.put(`/convalidas/${data}`, {
          data: {
            disponible: true,
            miconf: false
          }
        });
    
        await getConvalida();
      };
    const getConvalida= async () => {
        const { data: { data: dataRaw } } = await api.get('/convalidas');
    
        const convalidaMapping = dataRaw.map(({ id, attributes }: { id: number; attributes: any }) => ({
          ...attributes,
          id,
        }));
    
        setConvalida(convalidaMapping);
      };


    const getUsers = async () => {
        const { data } = await api.get('/users');

        setUsers(data);
    };

    useEffect(() => {
        getConvalida();
    }, []);

    return {
        users,
        convalidan,
        enabledConvalida,
        removeConvalida,
        createConvalida,
        getConvalida,
       
    };
};
