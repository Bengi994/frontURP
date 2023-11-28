import { Button } from "react-bootstrap";
import { Catalog } from "../../types/Catalog";
import { useState } from "react";
import ModalInscribir from "../BotonModal";
import TablaInscritos from "../BotonModal/tablainscritos";
import Link from "next/link";

//@ts-ignore
function formatearFecha(fechaOriginal) {
  const fecha = new Date(fechaOriginal);
  const dia = fecha.getDate();
  const mes = fecha.toLocaleDateString("es-ES", { month: "long" });
  const anio = fecha.getFullYear();

  return `${dia} de ${mes} de ${anio}`;
}

export const CatalogRow = ({ catalog }: { catalog: Catalog }) => {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [catalogElement, setCatalogElement] = useState<Catalog>();

  return (
    <div className="catalog-row" key={`catalog-${catalog.id}`}>
      <div className="catalog-row-info">
      <h5>{catalog.tema_conferencia}</h5>
      <h6>{catalog.salon?.data?.attributes.nombre}</h6>
        <span>
          {formatearFecha(catalog.fecha)} -{" "}
          {/*@ts-ignore*/}
          {catalog.hora ? catalog.hora.slice(0, 5) : ""}
        </span>


      </div>
      
      <div className="catalog-row-action flex-column">
      <Link
          className="btnPasarAsistencia btnInscribir position-relative w-100"
          href={`/conferencia-curso/${catalog.id}`}
        >
          Pasar asistencia
        </Link>
        <Button
          className="btnInscribir position-relative w-100"
          onClick={() => {
            cambiarEstadoModal(!estadoModal);
            setCatalogElement(catalog);
          }}
        >
          Ver relación
        </Button>
      </div>
      <TablaInscritos
        estado={estadoModal}
        cambiarEstado={cambiarEstadoModal}
        catalogo={catalog}
        setCatalogo={setCatalogElement}
      />
    </div>
  );
};
