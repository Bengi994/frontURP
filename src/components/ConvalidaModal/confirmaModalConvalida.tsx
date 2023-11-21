import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Catalog } from "../../types/Catalog";
import { useCatalogs } from "../../hooks/catalog/useCatalogs";
import { useConvalidas } from "../../hooks/convalida/useConvalidas";

const CatalogModalConfirm = ({estado, cambiarEstado, convalida, setConvalidas, tipo}) => {
    const { convalidan, removeConvalida, enabledConvalida } = useConvalidas();
    const handleRemoveCatalog = async (catalogId: string) => {
        await removeConvalida(catalogId);
      };
      const handleAddCatalog = async (catalogId: string) => {
        await enabledConvalida(catalogId);
      };

    return (
        <>
            {estado && (
                <div className="overlay">
                    <div className="contenido-modal contenido-modal-confirm">
                        <h1>¿Está seguro que desea {tipo == true ? "aprobar" : "rechazar"} esta solicitud?</h1>
                    <div className="contenido-modal-confirm-btns">
                        <Button className="me-2" variant="secondary" onClick={() => {cambiarEstado(false);}}>Cancelar</Button>
                        <Button className="me-2" variant="success" onClick={tipo == true ? () => {handleAddCatalog(convalida.id); window.location.reload(); tipo = ""} : () => {handleRemoveCatalog(convalida.id); window.location.reload(); tipo = ""}}>Aceptar</Button>
                    </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CatalogModalConfirm;