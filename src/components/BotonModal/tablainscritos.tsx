import React, { useState } from 'react';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Catalog } from '../../types/Catalog';
import { useCatalog } from '../../hooks/catalog/useCatalog';
import ModalQR from '../ModalQR';
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useResponsivePageContext} from "../ResponsivePage/context";
import { useCatalogs } from '../../hooks/catalog/useCatalogs';
import { url } from 'inspector';
//@ts-ignore
function formatearFecha(fechaOriginal) {
    const fecha = new Date(fechaOriginal);
    const dia = fecha.getDate();
    const mes = fecha.toLocaleDateString('es-ES', { month: 'long' });
    const anio = fecha.getFullYear();
  
    return `${dia} de ${mes}`;
  }


  const handleDescargarCSV = (): void => {
    // Obtén la tabla de la vista
    const tabla = document.querySelector("table");
  
    // Comprueba que la tabla exista para evitar errores de ejecución
    if (!tabla) {
      console.error("No se encontró ninguna tabla en el documento.");
      return;
    }
  
    // Crea un objeto CSV con los datos de la tabla
    const csv: string[] = [];
    tabla.querySelectorAll("tr").forEach((fila) => {
      const filaCSV: string[] = [];
      fila.querySelectorAll("td, th").forEach((celda) => {
        filaCSV.push(`"${celda.textContent?.replace(/"/g, '""')}"`); // Encerrar el contenido de la celda en comillas y escapar comillas internas
      });
      csv.push(filaCSV.join(","));
    });
  
    // Descarga el objeto CSV como un archivo
    const blob = new Blob([csv.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "inscritos.csv";
    document.body.appendChild(link); // Necesario para que el link funcione en Firefox
    link.click();
    document.body.removeChild(link); // Limpiar el DOM
  };

//@ts-ignore
const TablaInscritos = ({ estado, cambiarEstado, catalogo, setCatalogo}) => {
  const { user } = useResponsivePageContext();
  const { register, handleSubmit, formState: { errors } } = useForm<Catalog>();

  const { updateCatalog } = useCatalog(); // Asegúrate de importar la función updateCatalog correctamente.

  const { catalogs, myCatalog } = useCatalogs();

  const [estadoModal, cambiarEstadoModal] = useState(false);

  //al darle click al boton
  const handleOnSubmit = async (data: any) => {

  //pone el miconf de la conferencia en true
    const handleMyCatalog = async (catalogId: string) => {
      await myCatalog(catalogId);
      catalogo.miconf = true;
   };

    catalogo.miconf = true;

    // Obtén la lista de objetos actual del campo JSON
    const listaDeAlumnos = catalogo.inscripciones || [];

    // Agrega el nuevo alumno a la lista de objetos
    //@ts-ignore
    listaDeAlumnos.push(nuevoAlumno);

    // Actualiza el campo JSON del catálogo con la lista actualizada
    const updatedCatalog = {
      ...catalogo,
      inscripciones: listaDeAlumnos,
    };

    // Llama a la función updateCatalog para actualizar el catálogo con la nueva lista de objetos.
    const response = await updateCatalog(catalogo.id, updatedCatalog);


    if (response) {
      console.log("Nuevo alumno registrado con éxito:", response);
      // Realiza cualquier otra acción necesaria después de la actualización.
    } else {
      console.error("Error al registrar al nuevo alumno.");
    }
    cambiarEstadoModal(!estadoModal);
  };

  const fechaFormateada = formatearFecha(Date.parse(catalogo?.fecha));


  
  return (
    <>
      {estado && (
        <div className="overlay">
          <div className="contenido-modal">
            <div className="encabezado-modal">
              <h3>Relación de inscritos:</h3>
            </div>
            <button className="boton-cerrar" onClick={() => cambiarEstado(false)}>
              <img src="\close-solid.svg" alt="close" />
            </button>
            <div className="contenido-tabla-relaciones">
              <div className="seccion-tabla-relaciones">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Código</th>
                      <th>Carrera</th>
                      <th>Asistencia</th>
                    </tr>
                  </thead>
                  <tbody>
                  {/*@ts-ignore*/}
                    {catalogo.inscripciones && catalogo.inscripciones.map((inscripcion, index) => (
                      <tr key={index}>
                        <td>{inscripcion.nombre}</td>
                        <td>{inscripcion.apellido}</td>
                        <td>{inscripcion.codigo}</td>
                        <td>{inscripcion.carrera}</td>
                        <td>{inscripcion.asistencia}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="botones-tabla">
                  <Button
                    variant="primary"
                    onClick={handleDescargarCSV}
                  >
                    Descargar CSV
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TablaInscritos;