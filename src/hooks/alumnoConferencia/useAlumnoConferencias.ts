import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { AlumnoConferencia } from "../../types/AlumnoConferencia";

export const useAlumnoConferecnias = () => {
    const [users, setUsers] = useState<AlumnoConferencia[]>([]);

    const createAlumnoConferecnias = async (data: AlumnoConferencia): Promise<boolean> => {
         const response = await api.post('/alumno-conferencas', {
                 ...data,
                 alumnoId:data.alumnoId,
                 conferenciaId: data.conferenciaId,
                 asistencia: data.asistencia,
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


    const getUsers = async () => {
        const { data } = await api.get('/users');

        setUsers(data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return {
        users,
        createAlumnoConferecnias,
       
    };
};