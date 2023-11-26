import {ResponsivePage} from "../components/ResponsivePage";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { Component, useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import { useConvalida } from "../hooks/convalida/useConvalida";
import { Convalida } from "../types/Convalida";
import Image from 'next/image';

const VerConvalida = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Convalida>();
    const { createConvalida } = useConvalida();
    const router = useRouter();
    
    const handleOnSubmit = async (data: any) => {
        const convalida = {
            ...data,
        };
{/*@ts-ignore*/}
        const response = await createConvalida(convalida);

        if(response){
            await router.push('/mis-conferencias');
        }
    };

    return (
        <ResponsivePage>
            <div className="container mt-3 mb-4 header-mis-conferencias">
                <h2>Convalida conferencia</h2>
                <Link href="/mis-conferencias"><img src="\icon-forward.svg" alt="search" /></Link>
            </div>
            <div className='container contenido-convalida-conferencias'>
            <Form className="envio-solicitud-form" onSubmit={handleSubmit(handleOnSubmit)}>
                <Form.Group className="inputs">
                    <Form.Label>Conferencia</Form.Label>
                    <Form.Control type="text" {...register("tema_conferencia")}/>
                    {errors.tema_conferencia && (
                                <Form.Text className='text-danger'>
                                    {errors.tema_conferencia.message}
                                </Form.Text>
                            )}
                </Form.Group>
                <Form.Group className="inputs">
                    <Form.Label>Nombre de la institución o entidad organizadora</Form.Label>
                    <Form.Control type="text" {...register("nombre_institucion")}/>
                    {errors.nombre_institucion && (
                                <Form.Text className='text-danger'>
                                    {errors.nombre_institucion.message}
                                </Form.Text>
                            )}
                </Form.Group>
                <Form.Group className="inputs">
                    <Form.Label>Ubicación</Form.Label>
                    <Form.Control type="text" {...register("ubicacion")}/>
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
}

export default VerConvalida;

