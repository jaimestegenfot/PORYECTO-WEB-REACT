import React from 'react';
import { Link } from 'react-router-dom';

import './../css/principal.css';


const HomePage = () => {
    return (
        <div id="principal" >
            <div className="contenedor">
                <div id="cuerpo" className="cuerpo">
                    <h1>
                        Bienvenidos a Restaurante, <span>La Cocona</span>
                    </h1>
                    <p>
                        En el corazón de la selva amazónica, te ofrecemos una experiencia
                        culinaria única, donde los sabores de la naturaleza se mezclan con
                        la tradición ancestral.
                    </p>
                    <p>
                        Descubre nuestra carta llena de platos exóticos, como el pescado
                        envuelto en hojas de bijao, el ají de cocona, y nuestra selección de
                        bebidas refrescantes hechas con frutas tropicales.
                    </p>
                    <p>
                        Vive una experiencia auténtica en medio de la selva, rodeado de la
                        exuberante naturaleza, con un ambiente acogedor que te hará sentir
                        en plena conexión con la tierra.
                    </p>
                    <Link to="/carta" className='btn btn-primary'>
                        Ir a la Carta
                    </Link>
                </div>

            </div>

        </div>

    );
}

export default HomePage;
