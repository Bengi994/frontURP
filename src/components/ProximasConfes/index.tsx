import { useResponsivePageContext } from "../ResponsivePage/context";
import React, { useState } from "react";
import { Catalog } from "../../types/Catalog";
import { useCatalogs } from "../../hooks/catalog/useCatalogs";
import ModalInscribir from "../BotonModal";
import { Inscripcion } from "../../types/Catalog";
import ModalQR from "../ModalQR";

function formatearFecha(fechaOriginal: any) {
  const fecha = new Date(fechaOriginal);
  fecha.setDate(fecha.getDate() + 1);
  const dia = fecha.getDate();
  const mes = fecha.toLocaleDateString("es-ES", { month: "long" });
  const anio = fecha.getFullYear();

  return `${dia} de ${mes}`;
}

const ProximasConfes = () => {
  const { user } = useResponsivePageContext();
  const { catalogs } = useCatalogs();

  const fechaActual = new Date();

  const [estadoModalQR, cambiarEstadoModalQR] = useState(false);

  function encontrarConferenciaMasTemprana(pc: any) {
    if (pc.length === 0) {
      return null;
    }

    let conferenciaMasTemprana = pc[0];

    for (let i = 1; i < pc.length; i++) {
      const fechaConferencia = new Date(pc[i].fecha);
      const fechaMasTemprana = new Date(pc.fecha);

      if (fechaConferencia < fechaMasTemprana) {
        conferenciaMasTemprana = pc[i];
      }
    }

    return conferenciaMasTemprana;
  }

  let proximasConferencias: Catalog[] = [];

  if (catalogs.length != 0) {
    catalogs.forEach((catalog) => {
      let flag = false;
      const fechaMasTemprana = new Date(catalog.fecha);
      if (catalog.inscripciones != null) {
        catalog.inscripciones.forEach((inscripcion) => {
          if (
            inscripcion.codigo == user?.codigo
          ) {
            flag = true;
          }
        });
      }
      {/*@ts-ignore*/}
      if (flag != true && fechaMasTemprana > fechaActual && catalog.disponible === true) {
        proximasConferencias.push(catalog);
      }
    });
  }

  // const conferenciasDisponibles = proximasConferencias.filter(
  //   (catalog) => (catalog.disponible && (convertirStringADate(catalog.fecha.toString(), catalog.hora) > fechaActual) && (convertirStringADate(catalog.fecha.toString(), catalog.hora).getTime() > fechaActual.getTime()))
  // );

  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [catalogElement, setCatalogElement] = useState<Catalog>();
  const cmt = encontrarConferenciaMasTemprana(proximasConferencias);
  const fechaFormateada = formatearFecha(Date.parse(cmt?.fecha));

  return (
    <>
      <div className="seccion-mis-conferencias">
        <img src="\icon-proxima-conferencia.png" alt="conferencias" />
        <h2>Próxima Conferencia</h2>
        <div>
          {proximasConferencias.length === 0 ? (
            <div>
              <h6 className="devolverCadena">
                No hay conferencias pendientes por ahora.
              </h6>
            </div>
          ) : (
            <div>
              <h6 className="devolverCadena">
                {cmt?.tema_conferencia}
                <br />
                {fechaFormateada}
              </h6>
              <a
                style={{
                  color: "#42B247",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={() => {
                  cambiarEstadoModal(!estadoModal);
                  setCatalogElement(cmt);
                }}
              >
                Inscribirse
              </a>
              <ModalInscribir
                estado={estadoModal}
                cambiarEstado={cambiarEstadoModal}
                catalogo={cmt}
                setCatalogo={setCatalogElement}
                //@ts-ignore
                estadoModalQR={estadoModalQR}
                cambiarEstadoQR={cambiarEstadoModalQR}
              />
              <ModalQR
                estado={estadoModalQR}
                cambiarEstado={cambiarEstadoModalQR}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProximasConfes;
