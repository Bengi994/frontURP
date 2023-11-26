import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useResponsivePageContext } from "../ResponsivePage/context";
import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import Image from 'next/image';
//npm i react-qr-code
//npm i react-native-svg
{/*@ts-ignore*/}
const ModalQR = ({ estado, cambiarEstado }) => {
  const { user } = useResponsivePageContext();

  return (
    <>
      {estado && (
        <div className="overlay">
          <div className="contenido-modal">
            <div className="encabezado-modal">
              <h3>INSCRIPCIÓN CORRECTA</h3>
            </div>
            <button
              className="boton-cerrar"
              onClick={() => {cambiarEstado(false)}}
            >
              <img src="\close-solid.svg" alt="close" />
            </button>
            <div className="contenedorQR">
              <br />
              <br />
              <QRCode
                className="codigoQR"
                
                value={user?.codigo||""}
                viewBox={`0 0 256 256`}
                fgColor="black"
              />
              <br />
              <br />
              <br />
            </div>
            <p className="textoQR">
              Se ha registrado correctamente a la conferencia, por favor, guarde
              su pase QR con el botón de abajo o con una captura de pantalla,
              será necesario para el ingreso a la conferencia.
            </p>
            <button className="inscribirme-ahora" style={{display: "flex", justifyContent: "center"}}>
            Descargar QR
          </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ModalQR;
