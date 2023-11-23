import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Catalog } from "../../types/Catalog";
import { useCatalogs } from "../../hooks/catalog/useCatalogs";
import CatalogModalConfirm from "../../components/CatalogModalConfirmation";
import Image from 'next/image';
//@ts-ignore
function formatearFecha(fechaOriginal) {
  const fecha = new Date(fechaOriginal);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();

  // Asegurarnos de que el día y el mes tengan dos dígitos
  const diaFormateado = dia < 10 ? `0${dia}` : dia;
  const mesFormateado = mes < 10 ? `0${mes}` : mes;

  return `${diaFormateado}/${mesFormateado}/${anio}`;
}
//@ts-ignore
<<<<<<< HEAD
const CatalogModal = ({ estado, cambiarEstado, catalogo, setCatalogo }) => {
=======
const CatalogModal = ({ estado, cambiarEstado, catalog, setCatalogo }) => {
>>>>>>> 1be5c294a980d49383fb3658c2dfbd8e763789c6
  const { catalogs, removeCatalog, enabledCatalog } = useCatalogs();
  const handleRemoveCatalog = async (catalogId: string) => {
    await removeCatalog(catalogId);
  };
  const handleAddCatalog = async (catalogId: string) => {
    await enabledCatalog(catalogId);
  };

  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [tipo, cambiartipo] = useState(false);


  const aprobar = "Aprobar";
  const rechazar = "Rechazar";

  const fechaFormateada = formatearFecha(Date.parse(catalog?.fecha));
  return (
    <>
      {estado && (
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
              <div className="seccion-tema-descripcion">
                <h5>Tema de conferencia: </h5>
                <p>{catalog.tema_conferencia}</p>
              </div>
              <div className="seccion-tema-descripcion">
                <h5>Descripción: </h5>
                <p>{catalog.descripcion === null ? "No establecida" : catalog.descripcion}</p>
              </div>
              <div className="seccion">
                <h5>Expositor: </h5>
                <p>{catalog.expositor === null ? "No establecido" : catalog.expositor}</p>
              </div>
              <div className="seccion">
                <h5>Dirigido a: </h5>
                <p>{catalog.dirigido === null ? "No establecido" : catalog.dirigido}</p>
              </div>
              <div className="seccion">
                <h5>Solicitado por: </h5>
                <p>{catalog.solicitado_por === null ? "No establecido" : catalog.solicitado_por}</p>
              </div>
              <div className="seccion">
                <h5>Salón: </h5>
<<<<<<< HEAD
                <p>{catalogo?.salons.data[0].attributes.nombre === null ? "No establecido" : catalogo?.salons.data[0].attributes.nombre}</p>
=======
                <p>{catalog?.salon.data?.attributes?.nombre === null ? "" : catalog.salon.data?.attributes?.nombre}</p>
>>>>>>> 1be5c294a980d49383fb3658c2dfbd8e763789c6
              </div>
              <div className="seccion">
                <h5>Fecha: </h5>
                <p>{fechaFormateada === null ? "No establecida" : fechaFormateada}</p>
              </div>
              <div className="seccion">
                <h5>Hora: </h5>
                <p>{catalog.hora === null ? "No establecida" : catalog.hora.slice(0, 5)}</p>
              </div>

              <div className="seccion-botones">
                <div className="botones-modal">
                  <Button
                    className="me-2"
                    variant="danger"
                    onClick={() => {
                      // handleRemoveCatalog(catalogo.id);
                      // window.location.reload();
                      cambiartipo(false);
                      cambiarEstadoModal(!estadoModal);
                    }}
                  >
                    Rechazar
                  </Button>
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
          <CatalogModalConfirm
          estado={estadoModal}
          cambiarEstado={cambiarEstadoModal}
          catalogo={catalog}
          setCatalogo={setCatalogo}
          tipo={tipo}
        />
        </div>
      )}
    </>
  );
};

export default CatalogModal;
