import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductoId, putProductoId } from "../services/productos";
import FormComponent from "../components/edit";

const EditarPedidos = () => {
    const [values, setValues] = useState({
        nombre_completo: '',
        telefono: '',
        direccion: '',
        productos: '',
        subtotal: 0,
        total: 0
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const handleValues = (ev) => {
        const { name, value } = ev.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        if (!values.nombre_completo || !values.telefono || !values.direccion || 
            !values.productos || !values.subtotal || !values.total) {
            Swal.fire({
                title: 'Error de datos!',
                text: 'Todos los campos son obligatorios!',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            const loading = Swal.fire({
                title: 'Cargando...',
                text: 'Actualizando el pedido...',
                icon: 'info',
                showConfirmButton: false,
                allowOutsideClick: false
            });

            await putProductoId(id, values);
            
            loading.close();
            
            Swal.fire({
                title: 'Pedido actualizado!',
                text: `El pedido de ${values.nombre_completo} se actualizó satisfactoriamente!`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            
            navigate("/listapedidos");
        } catch (error) {
            console.error('Error al actualizar el pedido:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un error al actualizar el pedido',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    useEffect(() => {
        const obtenerPedido = async () => {
            try {
                const pedido = await getProductoId(id);
                if (pedido) {
                    setValues(pedido);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'No se encontró el pedido',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    navigate("/listapedidos");
                }
            } catch (error) {
                console.error('Error al obtener el pedido:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'No se pudo obtener el pedido',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                navigate("/listapedidos");
            }
        };
        obtenerPedido();
    }, [id, navigate]);

    return (
        <FormComponent
            values={values}
            handleValues={handleValues}
            handleSubmit={handleSubmit}
            title="Editar pedido"
        />
    );
};

export default EditarPedidos;