import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './../scss/historia.scss';

import restaurantImage from './../img/img_comidas/designer.jpeg';

const Historia = () => {
    return (
        <>
            <div id="principal">

                <Container className="contenedor">
                    <section id="history" className="history">
                        <Row className="align-items-center">

                            <div className="text col-12 col-md-6 col-lg-6 col-xl-6 mb-4">
                                <p className="mb-4">
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


                            <div className="image col-12 col-md-6 col-lg-6 col-xl-6 ">
                                <img
                                    src={restaurantImage}
                                    alt="Foto del restaurante"
                                    className="img-fluid rounded shadow"
                                />
                            </div>

                        </Row>
                    </section>
                </Container>
            </div>
        </>
    );

};

export default Historia;