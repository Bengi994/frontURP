import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import {Convalida} from "../../types/Convalida";
import {useConvalidas} from "../../hooks/convalida/useConvalidas";
import ModalConfirmaConvalida from "../../components/ConvalidaModal/confirmaModalConvalida";

const ConvalidaModal = ({ convalida , setConvalidas, cambiarEstado, estado}) => {
  const { users, enabledConvalida , removeConvalida} = useConvalidas();
 
  const handleAddConvalida = async (data: string) => {
    await enabledConvalida(data);
  };

  const handleRemoveConvalida = async (data: string) => {
    await removeConvalida(data);
  };
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [tipo, cambiartipo] = useState(false);

  return (
    <>
      {convalida && (
        <div className="overlay">
          <div className="contenido-modal">
            <div className="encabezado-modal">
              <h3>Solicitud de conferencia</h3>
            </div>
            <button
               className="boton-cerrar"
                onClick={() => cambiarEstado(false)}
                  >
                  <img src="\close-solid.svg" alt="close" />
                </button>
            <div className="contenido">
              <div className="seccion">
                <h5>Tema de conferencia: </h5>
                <p>{convalida?.tema_conferencia}</p>
              </div>
              <div className="seccion">
                <h5>Nombre de Institución: </h5>
                <p>{convalida?.nombre_institucion}</p>
              </div>
              <div className="seccion-tema-descripcion">
                <h5>Ubicación: </h5>
                <p>{convalida?.ubicacion }</p>

              </div>
              <div className="seccion-botones">
                <div className="botones-modal">
                  <Button
                    variant="primary"
                    onClick={() => {
                      // handleAddCatalog(catalogo.id);
                      // window.location.reload();
                      // tipo = aprobar;
                      cambiartipo(true);
                      cambiarEstadoModal(!estadoModal);
                    }}
                  >
                    Aprobar
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <ModalConfirmaConvalida
          estado={estadoModal}
          cambiarEstado={cambiarEstadoModal}
          convalida={convalida}
          setConvalida={setConvalidas}
          tipo={tipo}
        />
        </div>
      )}
    </>
  );
};

export default ConvalidaModal;
