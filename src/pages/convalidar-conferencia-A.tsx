import { ResponsivePage } from "../components/ResponsivePage";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { useState } from 'react';
import ConvalidaModal from "../components/ConvalidaModal";
import { useForm } from "react-hook-form";
import { Convalida } from "../types/Convalida";
import { useRouter } from "next/router";
import { useConvalidas } from "../hooks/convalida/useConvalidas";


const Convalidar = () => {
  const router = useRouter();
  const { convalidan,enabledConvalida,removeConvalida} = useConvalidas();

 
  const [estadoModal, cambiarEstadoModal] = useState(false);

  const handleRemoveConvalida = async (data: string) => {
     await removeConvalida(data);
  };
 
  const handleAddConvalida = async (data: string) => {
     await enabledConvalida(data);
  };
 
  const [convalidaElement, setConvalidaElement] = useState<Convalida>();

  return (
    <ResponsivePage>
      <div className="container mt-3">
        <div className="d-flex justify-content-between">
          <h1 className="mb-2">Mis solicitudes</h1>
        </div>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tema</th>
              <th scope="col">Institución</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {convalidan.length > 0 &&
              convalidan.map((convalida) => (
                <tr key={`convalida-${convalida.id}`}>
                  <td>{convalida.id}</td>
                  <td>{convalida.tema_conferencia}</td>
                  <td>{convalida.nombre_institucion}</td>
                  <td>{convalida.ubicacion}</td>
                  <td>
                    {/* <Button className='me-2' variant='danger' onClick={() => handleRemoveCatalog(catalog.id)}>Rechazar</Button>
                              <Button variant='primary' onClick={() => handleAddCatalog(catalog.id)}>Aprobar</Button> */}
                    <Button
                      className="btn-ojo"
                      onClick={() => {
                        cambiarEstadoModal(!estadoModal);
                        setConvalidaElement(convalida);
                      }}
                    >
                      <img src="\eye-solid.svg" alt="detalles" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      <ConvalidaModal
       estado={estadoModal}
       cambiarEstado={cambiarEstadoModal}
       convalida={convalidaElement}
       setConvalidas={setConvalidaElement}
     />
      </div>
    </ResponsivePage>
  );
};

export default Convalidar;
