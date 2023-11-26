import { ResponsivePage } from "../components/ResponsivePage";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useCatalogs } from "../hooks/catalog/useCatalogs";
import { useState } from "react";
import CatalogModal from "../components/CatalogModal";
import { Catalog } from "../types/Catalog";
import Image from 'next/image';

const Catalogo = () => {
  const router = useRouter();
  const { catalogs, removeCatalog, enabledCatalog } = useCatalogs();

  const handleRemoveCatalog = async (catalogId: string) => {
    await removeCatalog(catalogId);
  };

  const handleAddCatalog = async (catalogId: string) => {
    await enabledCatalog(catalogId);
  };

  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [catalogElement, setCatalogElement] = useState<Catalog>();

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
              <th scope="col">Dirigido a</th>
              <th scope="col">Salón</th>
              <th scope="col">Solicitado por</th>
              <th scope="col">Estado de solicitud</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {catalogs.length > 0 &&
              catalogs.map((catalog) => (
                <tr key={`catalog-${catalog.id}`}>
                  <td>{catalog.id}</td>
                  <td>{catalog.tema_conferencia}</td>
                  <td>{catalog.dirigido}</td>
                  <td>{catalog?.salon.data?.attributes?.nombre === null ? "" : catalog.salon.data?.attributes?.nombre}</td>
                  <td>{catalog.solicitado_por}</td>
                  <td>{catalog.disponible === null
                      ? "En Espera"
                      : catalog.disponible == false
                      ? "Rechazado"
                      : "Aprobado"}
                  </td>
                  <td>
                    {/* <Button className='me-2' variant='danger' onClick={() => handleRemoveCatalog(catalog.id)}>Rechazar</Button>
                              <Button variant='primary' onClick={() => handleAddCatalog(catalog.id)}>Aprobar</Button> */}
                    <Button
                      className="btn-ojo"
                      onClick={() => {
                        cambiarEstadoModal(!estadoModal);
                        setCatalogElement(catalog);
                      }}
                    >
                      <img src="\eye-solid.svg" alt="detalles" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <CatalogModal
          estado={estadoModal}
          cambiarEstado={cambiarEstadoModal}
          catalog={catalogElement}
          setCatalogo={setCatalogElement}
        />
      </div>
    </ResponsivePage>
  );
};

export default Catalogo;
