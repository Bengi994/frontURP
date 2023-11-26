import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Catalog } from "../../types/Catalog";
import { useCatalogs } from "../../hooks/catalog/useCatalogs";
import Alert from "react-bootstrap/Alert";

interface CatalogModalConfirmProps {
    estado: boolean;
    cambiarEstado: (estado: boolean) => void;
    catalogo: Catalog;
    setCatalogo: React.Dispatch<React.SetStateAction<Catalog>>;
    tipo: boolean;
}

const CatalogModalConfirm: React.FC<CatalogModalConfirmProps> = ({ estado, cambiarEstado, catalogo, tipo }) => {
    const { removeCatalog, enabledCatalog } = useCatalogs();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleAction = async () => {
        try {
            if (tipo) {
                await enabledCatalog(catalogo.id);
                setAlertMessage("La solicitud ha sido aprobada.");
            } else {
                await removeCatalog(catalogo.id);
                setAlertMessage("La solicitud ha sido rechazada.");
            }
            setShowAlert(true);
            // Actualiza el estado aquí según sea necesario
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        } finally {
            cambiarEstado(false);
        }
    };

    return (
        <>
            {estado && (
                <div className="overlay">
                    <div className="contenido-modal contenido-modal-confirm">
                        <h1>¿Está seguro que desea {tipo ? "aprobar" : "rechazar"} esta solicitud?</h1>
                        <div className="contenido-modal-confirm-btns">
                            <Button className="me-2" variant="secondary" onClick={() => cambiarEstado(false)}>Cancelar</Button>
                            <Button className="me-2" variant="success" onClick={handleAction}>Aceptar</Button>
                        </div>
                    </div>
                </div>
            )}
            {showAlert && (
                <Alert variant={tipo ? "success" : "danger"} onClose={() => setShowAlert(false)} dismissible style={{ position: 'absolute'}}>
                    {alertMessage}
                </Alert>
            )}
        </>
    );
};

export default CatalogModalConfirm;
