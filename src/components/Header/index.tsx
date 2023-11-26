import Link from "next/link";
import { Button, Dropdown } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { Cart } from "../Cart";
import { useRouter } from "next/router";
import {
  useResponsivePageContext,
  useResponsivePageDispatch,
} from "../ResponsivePage/context";
import Image from 'next/image';

export const Header = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { user, isLogged, isEmployee } = useResponsivePageContext();
  const { setUser } = useResponsivePageDispatch();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goToLogin = () => router.push("iniciar-sesion");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(undefined, false, false);
    router.push("/iniciar-sesion");
  };

  const goToProfile = () => router.push("/perfil");

  const goToMyOrders = () => router.push("/mis-pedidos");

  
  return (
    

    <>
        {isLogged ? (
            <nav className="navbar navbar-expand-lg cabecera--principal">




            <div className="acciones-defecto">
              <img src="\icon.svg" alt="Logo" />
              <img src="\icon.svg" alt="Logo" />
              <img src="\icon.svg" alt="Logo" />
              <img src="\icon.svg" alt="Logo" />
            </div>
            <div className="nombre-uni">
              <h1>Universidad Ricardo Palma</h1>
            </div>
            <div className="alumno-acciones">
              <img src="\icon.svg" alt="Logo" />
              <img src="\icon.svg" alt="Logo" />
              {isLogged && user ? (
                <Dropdown>
                  <Dropdown.Toggle variant="light btn--loguin" id="dropdown-basic">
                    <img src="\profile-circle.svg" alt="Logo" />
                  </Dropdown.Toggle>
      
                  <Dropdown.Menu>
                    <p>
                      {user.nombre} {user.apellido}
                    </p>
                    {/*@ts-ignore*/}
                    <p>{user.conferencia}</p>
                    <Dropdown.Item onClick={goToProfile}>Mi perfil</Dropdown.Item>
                    {!isEmployee && (
                      <Dropdown.Item onClick={goToMyOrders}>
                        Mis Pedidos
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={handleLogout}>
                      Cerrar Sesion
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  className="me-2 btn--loguin"
                  variant="light"
                  onClick={goToLogin}
                >
                  Iniciar Sesion
                </Button>
              )}
            </div>
      
      
          </nav>
        ) : null}
    </>


  );
};
