import { ResponsivePage } from "../components/ResponsivePage";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useValids } from "../hooks/convalidar/validando";
import { convalidar } from "../types/valido";
import { useForm } from "react-hook-form";
import router, { useRouter } from "next/router";
import Image from 'next/image';

const VerValidacion = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<convalidar>();
  const { createValidacion } = useValids();
  
  const router = useRouter();

  const handleOnSubmit = async (data: any) => {
    const convalidar = {
        ...data,
    };

    const response = await createValidacion(convalidar);

    if (response) {
        await router.push('/convalidar');
    }
};

  return (
    <ResponsivePage>
      <div className="operacion">
        <div className="contenedor">
          <h2 className="titulo">Convalida tus conferencias</h2>
          <img src="return.png" alt="imagentitulo" width={35} height={35}></img>
        </div>
      
      <Form className="ingresando-convalidacion" onSubmit={handleSubmit(handleOnSubmit)}>
        <Form.Group className="mb-1">
          <Form.Label>Conferencia:</Form.Label>
          <Form.Control type="text" {...register("nombre")} placeholder="Ingrese nombre la conferencia" />
          {errors.nombre && (
            <Form.Text className='text-danger'>
              {errors.nombre.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Nombre de la institución o entidad organizadora</Form.Label>
          <Form.Control type="text" {...register("institucion")} placeholder="Ingrese nombre de la institución" />
          {errors.institucion && (
            <Form.Text className='text-danger'>
              {errors.institucion.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ubicación</Form.Label>
          <Form.Control type="text" {...register("ubicacion")} placeholder="Lugar donde se realizó la conferencia" />
          {errors.ubicacion && (
            <Form.Text className='text-danger'>
              {errors.ubicacion.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Subir tu certificado</Form.Label>
          <Form.Control type="file" size="sm" />
        </Form.Group>
        <Button type='submit' variant="success">ENVIAR</Button>{' '}
      </Form>
      </div>
    </ResponsivePage>
  );
};

export default VerValidacion;