import { Button } from "react-bootstrap";
import { Catalog } from "../../types/Catalog";
import { useState } from "react";
import ModalInscribir from "../BotonModal";
import TablaInscritos from "../BotonModal/tablainscritos";

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
        <span>
          {formatearFecha(catalog.fecha)} -{" "}
          {/*@ts-ignore*/}
          {catalog.hora ? catalog.hora.slice(0, 5) : ""}
        </span>
        <span>{catalog.salon}</span>
        <span>{catalog.tema_conferencia}</span>
      </div>
      <div className="catalog-row-action">
        <Button
          className="btnInscribir"
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
