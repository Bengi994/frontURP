import { useCatalogs } from "../../hooks/catalog/useCatalogs";
import { Catalog } from "../../types/Catalog";
import { ResponsivePage } from "../../components/ResponsivePage";
import { QrReader } from 'react-qr-reader';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from "next/router";
import { useCatalog } from "../../hooks/catalog/useCatalog";


const VerCatalogo = () => {
  const router = useRouter();
  const {getCatalogId, updateCatalog} = useCatalog();
  const [showQr,setshowQr] = useState(true);
//@ts-ignore
  const catalog = useMemo<Catalog | null>(async ( ) => {

    const catalogId = router.query.id;
    if(catalogId && typeof catalogId === "string"){
    const catalogo = await getCatalogId(catalogId);
    console.log(catalogo);
    return catalogo;
    }
   return null;
  },[router])

  const actualizar = useCallback(async(inscripciones:any, catalogId:string) => {

    await updateCatalog(catalogId, {inscripciones});
    setshowQr(true);

  },[updateCatalog])

  const handleScan = useCallback((codigo:string) => {
    alert(codigo)
    alert ("Catalogo Id:"+catalog?.id)
    if (catalog && catalog.inscripciones ){
      setshowQr(false)
      const inscripciones = catalog.inscripciones.map(catalogo => {

      if(catalogo.codigo === codigo){
          
       catalogo.asistencia = "Si";
       return catalogo;

      }
      return catalogo

 })
alert ("Catalogo Id:"+catalog.id)
 
         actualizar(inscripciones,catalog!.id)
     }
  },[catalog]);

  const handleError = (error:any) => {
    console.error(error);
  }


  return (

    <ResponsivePage>
      {
        showQr && (
          <QrReader
          constraints={{ facingMode: 'environment' }}
            onResult={(result:any, error:any) => {
              if (!!result) {
                handleScan(result?.text);
              }
    
              if (!!error) {
                console.info(error);
              }
            }}
            
          />
        )
      }
     
        
    </ResponsivePage>

   
  );
};

export default VerCatalogo;
