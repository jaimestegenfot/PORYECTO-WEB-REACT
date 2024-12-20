import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Función para cargar productos para la carta
export const cargarProductosCarta = async () => {
    try {
        const productosRef = collection(db, 'cocona/productos/fl3Rdg1Qz6k7zXTzSth4');
        const querySnapshot = await getDocs(productosRef);
        
        // Filtrar solo productos con stock > 0 y ordenar por categoría
        const productos = querySnapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            .filter(producto => producto.stock > 0)
            .sort((a, b) => {
                // Primero ordenar por categoría
                if (a.categoria < b.categoria) return -1;
                if (a.categoria > b.categoria) return 1;
                // Si la categoría es igual, ordenar por nombre
                return a.nombre.localeCompare(b.nombre);
            });

        return productos;
    } catch (error) {
        console.error("Error al cargar productos de la carta:", error);
        return [];
    }
};

// Función para contar usuarios
export const contarUsuarios = async () => {
    try {
        const usuariosRef = collection(db, "usuarios");
        const snapshot = await getDocs(usuariosRef);
        return snapshot.size;
    } catch (error) {
        console.error("Error al contar usuarios:", error);
        return 0;
    }
};

// Función para obtener productos por categoría
export const obtenerProductosPorCategoria = async (categoria) => {
    try {
        const productosRef = collection(db, 'cocona/productos/fl3Rdg1Qz6k7zXTzSth4');
        const querySnapshot = await getDocs(productosRef);
        
        return querySnapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            .filter(producto => producto.categoria === categoria && producto.stock > 0);
    } catch (error) {
        console.error(`Error al cargar productos de la categoría ${categoria}:`, error);
        return [];
    }
};


