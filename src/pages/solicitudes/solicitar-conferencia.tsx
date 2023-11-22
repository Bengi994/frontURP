import { ResponsivePage } from "../../components/ResponsivePage";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Catalog } from "../../types/Catalog";
import { useEffect,useMemo,useState } from "react";
import { useCatalog } from "../../hooks/catalog/useCatalog";
import { useCatalogs } from "../../hooks/catalog/useCatalogs";
import { useRouter } from 'next/router';

//de aqui pa bajo es otro
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
{/*@ts-ignore*/}
import DatePicker from 'react-datepicker';
//import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';

//import 'react-time-picker/dist/TimePicker.css';
import axios from 'axios';
import { useSalonConferencia } from "../../hooks/salonConferencia/useSalonConferencia";
import { Salon } from "../../types/Salon";
import { number } from "yup";

const NewCatalog = () => {
    const { register, handleSubmit, formState: { errors },setValue } = useForm<Catalog>();
    
    
    const [isAvailable, setIsAvailable] = useState(false); // Cambiamos el valor por defecto a "no disponible"
    const [showModal, setShowModal] = useState(false);
    const { createCatalog } = useCatalog();
    const { catalogs } = useCatalogs();
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(new Date());
    //const [salonConferencia, setSalonConferencias] = useState<{ nombre: string; }[]>([]);
    //const { getSalonConferencias } = useSalonConferencia();
    const [salonId, setSalonId] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    

    const { SalonConferencia, getSalonConferencia } = useSalonConferencia();

    const handleSwitch = () => setIsAvailable(!isAvailable);

    const handleOnSubmit = async (data: any) => {
        try {
        const catalog = {
            ...data,
            fecha: selectedDate,
        };
{/*@ts-ignore*/}
        const response = await createCatalog(catalog);

        if (response) {
            await router.push('/solicitudes');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setErrorMessage(error.response.data.message);
            console.log('Mensaje de error:', error.response.data.message);
        } else {
            console.error('Error desconocido:', error);
        }
    }
    };

    const diasNoHabiles = useMemo(() => {

        const dias = catalogs.reduce((acc: Record<number,Date[]>, catalogs) => {
            const salonId = catalogs.salon.data.id;
            const fecha = new Date(new Date (catalogs.fecha).toLocaleString('en', {timeZone: 'UTC'}))
            if(acc[salonId]){
            acc[salonId] = acc[salonId].concat(fecha);
            return acc;
            }
            acc[salonId] = [fecha]
            return acc
        },{})
        console.log(dias);
        return dias

    }, [catalogs]) 
    

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => setShowModal(false);

    // const [selectedTime, setSelectedTime] = useState('');
/*
    useEffect(() => {
        const getSalonConferencia = async () => {
            const salones = await getSalonConferencia()
            console.log(salones)
        }
        getSalonConferencia()
    }, [])
    */
    useEffect(() => {
        const fetchData = async () => {
          try {
            await getSalonConferencia();
          } catch (error) {
            console.error('Error al obtener los datos:', error);
          }
        };
    
        fetchData();
      }, []);
    
      console.log(SalonConferencia); // Imprime los datos en la consola

      if (Array.isArray(SalonConferencia) && SalonConferencia.length > 0) {
        console.log('Primer elemento:', SalonConferencia[0]);
      }

    const horasDelDia = [
        {
            horaLabel: "2:00 PM",
            horaValue: "02:00:00.000",
        },
        {
            horaLabel: "3:00 PM",
            horaValue: "03:00:00.000",
        },
        {
            horaLabel: "4:00 PM",
            horaValue: "04:00:00.000",
        },
        {
            horaLabel: "5:00 PM",
            horaValue: "05:00:00.000",
        },
        {
            horaLabel: "6:00 PM",
            horaValue: "06:00:00.000",
        },
        {
            horaLabel: "7:00 PM",
            horaValue: "07:00:00.000",
        },
        {
            horaLabel: "8:00 PM",
            horaValue: "08:00:00.000",
        },
        {
            horaLabel: "9:00 PM",
            horaValue: "09:00:00.000",
        },
    ];

    return (
        <ResponsivePage>
            <div className='container mt-3'>
                <div className='d-flex justify-content-between'>
                    <h1 className='mb-2'>Nueva solicitud</h1>
                </div>
                <hr />
                
                <div className=''>
                
                {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}


                    <Form className="envio-solicitud-form" onSubmit={handleSubmit(handleOnSubmit)}>
                        <Form.Group className="form-group mb-3">
                            <Form.Label>Tema de la conferencia</Form.Label>
                            <Form.Control type="text" {...register("tema_conferencia",{required: 'Estecampo es requerido'})} />
                            {errors.tema_conferencia && (
                                <Form.Text className='text-danger'>
                                    {errors.tema_conferencia.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="form-group mb-3">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" {...register("descripcion",{required: 'Estecampo es requerido'})} />
                            {errors.descripcion && (
                                <Form.Text className='text-danger'>
                                    {errors.descripcion.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="form-group mb-3">
                            <Form.Label>Expositor</Form.Label>
                            <Form.Control type="text" {...register("expositor",{required: 'Estecampo es requerido'})} />
                            {errors.expositor && (
                                <Form.Text className='text-danger'>
                                    {errors.expositor.message}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="form-group mb-3">
                        <Form.Label style={{ fontWeight: 'bold' }}>Salón</Form.Label>
                        <Form.Select 
                        {...register('salon', { required: 'Este campo es requerido' })}
                        onChange={event => {
                            setValue('salon', event.target.value)
                            setSalonId(Number(event.target.value));
                            console.log('Salón seleccionado:', event.target.value);
                        }}>
                        <option>Seleccionar</option>
                        {SalonConferencia.map((salon) => {
                        console.log(salon); // Mueve el console.log aquí para que se ejecute correctamente
                        return (
                        <option key={salon.id} value={salon.id}>
                        {salon.attributes.nombre}
                        </option>
                        );
                        })}
                        </Form.Select>
                        </Form.Group>

                        <Form.Group className="form-group mb-3">
                            <Form.Label style={{ fontWeight: 'bold' }} >Fecha</Form.Label>
                            <DatePicker 
                            
                                minDate={new Date()}
                                excludeDates={diasNoHabiles[salonId] || []}
                                className="date-picker"
                                selected={selectedDate} 
                                onChange={(date: Date) => {
                                    console.log(date);
                                    setSelectedDate(date)} }
                                dateFormat="dd/MM/yyyy" 
                                />
                                
                            {errors.fecha && (
                                <Form.Text className='text-danger'>
                                    {errors.fecha.message}
                                </Form.Text>
                            )}
                        </Form.Group>



                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 'bold' }}>Hora</Form.Label>
                            <select style={{ borderColor: 'green' }} {...register("hora",{ required: 'Este campo es requerido' })}>
                                <option value="" disabled>
                                    Seleccionar
                                </option>
                                {horasDelDia.map((hora, index) => (
                                    <option key={index} value={hora.horaValue}>
                                        {hora.horaLabel}
                                    </option>
                                ))}
                            </select>
                            {errors.hora && (
                                <Form.Text className='text-danger'>
                                    {errors.hora.message}
                                </Form.Text>
                            )}
                        </Form.Group>

                        
                        <>
                       
      
                        </>

                        
                        <Button type='submit' variant='success'>ENVIAR</Button>
                    </Form>
                </div>
            </div>
        </ResponsivePage>
    );
};

export default NewCatalog;
