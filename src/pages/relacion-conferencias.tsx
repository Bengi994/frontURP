import {ResponsivePage} from "../components/ResponsivePage";
import {useCatalogs} from "../hooks/catalog/useCatalogs";
import {CatalogRow} from "../components/CatalogCard/tablecatalog";

const VerCatalogo = () => {
    const { catalogs } = useCatalogs(); // Usar "catalogs" en lugar de "catalogsClient"
    console.log(catalogs);
  
    // Filtrar las conferencias disponibles
    const conferenciasDisponibles = catalogs.filter(
      (catalog) => catalog.disponible
    );
    return (
        <ResponsivePage>
            <div className="container mt-3 mb-4">
                <h2>Ver relación de conferencias</h2>
            </div>
            


            {conferenciasDisponibles.map((catalog) => (
            <CatalogRow key={catalog.id} catalog={catalog} /> // Usar "catalog.id" como clave
          ))}

        </ResponsivePage>
    );
}


export default VerCatalogo;
