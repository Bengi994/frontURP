import Link from "next/link";
import { useResponsivePageContext } from "../ResponsivePage/context";
import { Button, Dropdown, Accordion } from "react-bootstrap";
export const SideBar = () => {
  const { user } = useResponsivePageContext();
  return (
    <div className="sidebar--admin">
      <div>
        <img src="\logo-urp.png" alt="" className="logo-urp" />
        <hr />
      </div>
      <ul>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            INFORMACIÓN PERSONAL
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            ACÁDEMICO
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            SERVICIOS
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            GUIAS Y REGLAMENTOS
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            CATÁLOGO ABSYNET
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            BASES DE DATOS
          </Link>
        </li>
        {
          // ROLE 4 ADMINISTRADOR
          user?.role.id === 4 && (
            <>
              <li className="nav-item">
                <Link className="nav-link" href="/administracion-salones">
                  Administración de salones
                </Link>
              </li>
            </>
          )
        }
        {
          // ROLE 7 DOCENTE
          user?.role.id === 7 && (
            <>
            <Accordion defaultActiveKey="0" className="acordeon-confes">
              <Accordion.Item eventKey="0">
                <Accordion.Header>CONFERENCIAS</Accordion.Header>
                <Accordion.Body>
                  <Link className="nav-link" href="/solicitudes/">
                    Solicitudes pendientes
                  </Link>
                  <Link className="nav-link" href="/solicitudes/solicitar-conferencia">
                    Nueva solicitud
                  </Link>
                  <Link className="nav-link" href="/relacion-conferencias">
                    Relación de conferencias
                  </Link>
                  <Link className="nav-link" href="/conferencia-curso/">
                    Conferencias en curso
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
          )
        }
        {
          // ROLE 6 CENTRO DE EXTENSION
          user?.role.id === 6 && (
            <li className="nav-item">
              <Link className="nav-link" href="/administrar-solicitudes">
                Administrar solicitudes de conferencias
              </Link>
            </li>
          )
        }
        {
          // ROLE 5 SECRETARIA
          user?.role.id === 5 && (
            <>
              <li className="nav-item">
                <Link className="nav-link" href="/relacion-conferencias">
                  VER RELACIÓN DE CONFERENCIAS
                </Link>
                <Link className="nav-link" href="/convalidar-conferencia-A">
                Convalidar Conferencias
              </Link>
              </li>
            </>
          )
        }
        {
          // ROLE 3 ALUMNO
          user?.role.id === 3 && (
            <>
              <Accordion defaultActiveKey="0" className="acordeon-confes">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>CONFERENCIAS</Accordion.Header>
                  <Accordion.Body>
                    <Link className="nav-link" href="/proximas-conferencias">
                      Próximas conferencias
                    </Link>
                    <Link className="nav-link" href="/conferencias-pasadas">
                      Conferencias pasadas
                    </Link>
                    <Link className="nav-link" href="/sugiere-conferencia">
                      Sugiere una conferencia
                    </Link>
                    <Link className="nav-link" href="/mis-conferencias">
                      Mis conferencias
                    </Link>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </>
          )
        }
      </ul>
    </div>
  );
};
