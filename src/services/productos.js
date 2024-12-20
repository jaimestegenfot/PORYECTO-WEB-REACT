/* eslint-disable no-useless-catch */
import axios from "axios";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
//import { db } from '../config/firebase';

const URL = import.meta.env.VITE_ENDPOINT_BASE;
const getProductos = async () => {
    try{
        const respuesta = await axios.get(`${URL}`);
        console.log(respuesta);
        if(respuesta.status === 200){
            return respuesta.data;
        }
        throw new Error("Error al obtener los productos");
    }catch(error) {
        throw error;
    }
}

const postProductos = async (producto) => {
    try{
        const respuesta = await axios.post(`${URL}`, producto);

        if(respuesta.status === 201){
            return respuesta.data;
        }
        throw new Error("Error al agregar un producto");
    }catch(error) {
        throw error;
    }
}

const getProductoId = async (id) => {
    try {
      const respuesta = await axios.get(`${URL}/${id}`);
      console.log("Respuesta del API:", respuesta.data);
      if (respuesta.status === 200) {
        return respuesta.data;
      }
      throw new Error("Error al obtener el producto");
    } catch (error) {
      console.error("Error en getProductoId:", error);
      throw error;
    }
  };
  

const putProductoId = async (id, producto) => {
    try {
        const respuesta = await axios.put(`${URL}/${id}`, producto);
        console.log(respuesta);
        if(respuesta.status === 200){
            return respuesta.data;
        }
        throw new Error("Error al actualizar el producto");
        
    } catch(error) {
        throw error;
    }
}
const eliminarProducto = async(id) => {
    try {
        const respuesta = await axios.delete(`${URL}/${id}`);
        if(respuesta.status === 200){
            return respuesta.status;
        }
        throw new Error("Error al eliminar el producto");
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error;
    }
}

// Nueva función para obtener productos de Firebase para la carta
export const obtenerProductosCarta = async () => {
    try {
        const productosRef = collection(db, 'cocona/productos/fl3Rdg1Qz6k7zXTzSth4');
        const querySnapshot = await getDocs(productosRef);
        
        const productos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return productos;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
};

// Nueva función para obtener un producto específico de Firebase
export const obtenerProductoPorId = async (productoId) => {
    try {
        const productoRef = doc(db, 'cocona/productos/fl3Rdg1Qz6k7zXTzSth4', productoId);
        const docSnap = await getDoc(productoRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        }
        throw new Error("Producto no encontrado");
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        throw error;
    }
};

export { 
    getProductos,
    postProductos,
    getProductoId,
    putProductoId,
    eliminarProducto
};



/**/ 