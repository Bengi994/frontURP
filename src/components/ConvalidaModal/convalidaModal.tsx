import {Button, Form, Modal, Table} from "react-bootstrap";
import {Convalida} from "../../types/Convalida";
import {useConvalidas} from "../../hooks/convalida/useConvalidas";
import {useState} from "react";


export const ConvalidaModal = ({ onClose, show, onAddProduct }: {show: boolean; onClose: () => void; onAddProduct: (convalida: any) => void;}) => {
    const { users } = useConvalidas();
    const [convalida, setConvalidas] = useState<Convalida | null>(null);
    

    const handleSelectProduct = (selectedCatalog: Convalida) => setConvalidas(selectedCatalog);

    const handleAddProduct = () => onAddProduct({ ...convalida });

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Seleccione Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Tema</th>
                        <th>Institución</th>
                        <th>Ubicación</th>
                       
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 && users.map(convalida => (
                            <tr key={`convalida-id-${convalida.id}`}>
                                <td>{convalida.tema_conferencia}</td>
                                <td>{convalida.nombre_institucion}</td>
                                <td>{convalida.ubicacion}</td>
                                <td>
                                    <Button variant='primary' onClick={() => handleSelectProduct(convalida)}>Seleccionar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <p>Producto Seleccionado: {convalida?.tema_conferencia}</p>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
                <Button variant="success" type='button' onClick={handleAddProduct}>
                    Agregar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
