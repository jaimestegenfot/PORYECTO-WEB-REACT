import React from 'react';
import './../css/principal.css';

import restaurantImage from './../img/img_comidas/designer.jpeg';

const Historia = () => {
    return (
        <>

            <div id="principal">
                <div className="contenedor">
                    <section id="history" className="history">
                        <div className="content">

                            <div className="text">
                                <p>
                                    Fundado en 2023, nuestro restaurante ha sido el lugar de encuentro
                                    para familias y amigos que buscan disfrutar de una experiencia
                                    gastronómica única. Comenzamos como un pequeño negocio familiar y,
                                    con el tiempo, hemos crecido gracias a nuestra dedicación a la
                                    cocina tradicional y el servicio excepcional. Nuestra misión es
                                    ofrecer platos deliciosos, preparados con ingredientes frescos y
                                    locales, en un ambiente acogedor.
                                </p>
                                <p>
                                    A lo largo de los años, hemos evolucionado, pero nuestros valores
                                    siguen siendo los mismos: calidad, sabor, y satisfacción. Gracias al
                                    apoyo de nuestros clientes leales, seguimos siendo un pilar de la
                                    comunidad.
                                </p>
                            </div>


                            <div className="image">
                                <img src={restaurantImage} alt="Foto del restaurante" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Historia;