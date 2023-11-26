import { ResponsivePage } from "../components/ResponsivePage";
import { TotalConferencia } from "../components/TotalConferencia";
import Link from "next/link";
import ProximasConfes from "../components/ProximasConfes";
import Image from 'next/image';

const VerCatalogo = () => {
  return (
    <ResponsivePage>
      <div className="container mt-3 mb-4 header-mis-conferencias">
        <h2>Mis conferencias</h2>
      </div>

      <div className="container contenido-mis-conferencias">
        <TotalConferencia />
        <ProximasConfes/>
        <div className="seccion-mis-conferencias">
          <img src="\icon-convalida-conferencia.png" alt="conferencias" />
          <h2>Convalida tus conferencia</h2>
          <Link href="/convalida-conferencia">Convalida conferencia</Link>
        </div>
        <div className="seccion-mis-conferencias">
          <img src="\icon-repositorio.png" alt="conferencias" />
          <h2>Repositorio de conferencias</h2>
          <Link href="/repositorio">Mostrar</Link>
        </div>
      </div>
    </ResponsivePage>
  );
};
/*<script src="sweetalert2.min.js"></script>;
<link rel="stylesheet" href="sweetalert2.min.css"></link>;
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>;*/

export default VerCatalogo;
