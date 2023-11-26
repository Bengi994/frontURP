import { Button, Card, Form
 } from "react-bootstrap";
import { Catalog } from "../../types/Catalog";

import { useCatalog } from "../../hooks/catalog/useCatalog";
import { User } from "../../types/User";
import ModalInscribir from "../BotonModal";
import { useState, useEffect } from "react";
import { useResponsivePageContext } from "../ResponsivePage/context";
import axios from "axios";
import Image from 'next/image';
const imagenPorDefecto = "https://res.cloudinary.com/dbe36qiba/image/upload/v1700542339/1_mcbxr_Q9dmg_X6v8_KA_7_Uo4nw_acc5422e6f.jpg";
import ModalQR from "../ModalQR";
function formatearFecha(fechaOriginal: any) {
  const fecha = new Date(fechaOriginal);
  fecha.setDate(fecha.getDate() + 1);
  const dia = fecha.getDate();
  const mes = fecha.toLocaleDateString("es-ES", { month: "long" });
  const anio = fecha.getFullYear();

  return `${dia} de ${mes}`;
}

export const CatalogCard = ({ catalog }: { catalog: Catalog }) => {
  const { user } = useResponsivePageContext();
  // variables para BotonModal(ModalInscribir)
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [catalogElement, setCatalogElement] = useState<Catalog>();
  // variables para ModalQR
  const [estadoModalQR, cambiarEstadoModalQR] = useState(false);

  const [fotoUrl, setFotoUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiFoto = await axios.get(`https://shrieking-web-97943-0c89be05ca8d.herokuapp.com/api/catologos/${catalog.id}?populate=foto`);
        const url = apiFoto.data.data.attributes.foto.data.attributes.url;
        setFotoUrl(`https://shrieking-web-97943-0c89be05ca8d.herokuapp.com${url}`);
        
      } catch (error) {
        console.error("Error al obtener la foto:", error);
      }
    };

    fetchData();
  }, [catalog.id]);

  let flag = false;

  if(catalog.inscripciones != null){
    catalog.inscripciones.forEach((inscripcion) => {
      if (inscripcion.codigo == user?.codigo) {
        flag = true;
      }
    });
  }

  return (
    <Card key={`catalog-${catalog.id}`}>
      <div className="cont-img">
        <Card.Img
          variant="top"
          src={catalog.foto?.data?.attributes.url || imagenPorDefecto}
        />
        <p className="expositor-card card-fecha">
          <img src="\calendario-icon.svg" alt="fecha" />
          {formatearFecha(catalog.fecha)} -{" "}
          {/*@ts-ignore*/}
          {catalog.hora === null ? "" : catalog.hora.slice(0, 5)}
        </p>
        <p className="expositor-card card-salon">
          <img src="\salon-icon.svg" alt="salon" />
          {catalog?.salon.data?.attributes?.nombre === null ? "" : catalog.salon.data?.attributes?.nombre}
        </p>
        <p className="card-dirigido">{catalog.dirigido}</p>
      </div>

      <Card.Body>
        <Card.Title>{catalog.tema_conferencia}</Card.Title>
        <p className="nombre-expositor">Dirigido por: {catalog.expositor}</p>

        <p className="descripcion-card">{catalog.descripcion}</p>
      </Card.Body>
      <div>

      

              




      {/*@ts-ignore*/}
        {flag == true ? (
          <Button
            className="btnInscribir"
            disabled={true}
            style={{ backgroundColor: "#3e8e41", border: "none" }}
          >
            Inscrito
          </Button>
        ) : (
          <Button
            className="btnInscribir"
            onClick={() => {
              cambiarEstadoModal(!estadoModal);
              setCatalogElement(catalog);
            }}
          >
            Inscribirse
          </Button>
        )}
      </div>
      <ModalInscribir
        estado={estadoModal}
        cambiarEstado={cambiarEstadoModal}
        catalogo={catalog}
        setCatalogo={setCatalogElement}
        estadoModalQR = {estadoModalQR}
        cambiarEstadoQR = {cambiarEstadoModalQR}
      />
      <ModalQR estado={estadoModalQR} cambiarEstado={cambiarEstadoModalQR} />
    </Card>
  );
};
