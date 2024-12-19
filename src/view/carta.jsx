import React from 'react';
import './../css/principal.css';
import sudado from './../img/img_comidas/sudado-servido (1).jpg';
import inchicapi from './../img/img_comidas/inchicapi.png';
import sopaCarachama from './../img/img_comidas/sopa-carachama.png';
import juane from './../img/img_comidas/juane.png';
import patarashca from './../img/img_comidas/patarashca.png';
import tacacho from './../img/img_comidas/tacacho con cecina.png';
import masato from './../img/img_comidas/masato.png';

const Carta = () => {
    return (
        <div id="principal">
            <div className="contenedor">
                <div id="title" className="title">
                    <section className="titulo">
                        <h3>Platos típicos</h3>
                    </section>
                </div>


                <section className="menu">
                    <article className="dish">
                        <img src={sudado} alt="Plato 1" />
                        <h2>Sudado de pescado</h2>
                        <p>
                            Es un guiso típico preparado con pescado fresco, cocido en su jugo
                            con hierbas, especias y vegetales, ofreciendo un sabor suave y
                            aromático.
                        </p>
                        <span className="price">s/ 25</span>
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-cart-plus"></i> Añadir al carrito
                        </button>
                    </article>

                    <article className="dish">
                        <img src={inchicapi} alt="Plato 2" />
                        <h2>Inchicapi</h2>
                        <p>
                            Sopa espesa de gallina, con maní, maíz y yuca, perfumada con hojas
                            de sacha culantro.
                        </p>
                        <span className="price">s/ 10</span>
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-cart-plus"></i> Añadir al carrito
                        </button>
                    </article>

                    <article className="dish">
                        <img src={sopaCarachama} alt="Plato 3" />
                        <h2>Sopa de Carachama</h2>
                        <p>
                            Es un plato típico de la selva peruana, preparado con carachama, un
                            pez de río con caparazón duro. Se cocina en un caldo con yuca,
                            plátano verde y especias locales, resultando en una sopa nutritiva,
                            de sabor suave y muy apreciada por sus propiedades revitalizantes.
                        </p>
                        <span className="price">s/ 20</span>
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-cart-plus"></i> Añadir al carrito
                        </button>
                    </article>

                    <article className="dish">
                        <img src={juane} alt="Plato 4" />
                        <h2>Juane Amazónico</h2>
                        <p>
                            Un tradicional juane hecho con arroz, especias y pollo envuelto en
                            hojas de bijao.
                        </p>
                        <span className="price">s/ 20</span>
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-cart-plus"></i> Añadir al carrito
                        </button>
                    </article>

                    <article className="dish">
                        <img src={patarashca} alt="Plato 5" />
                        <h2>Patarashca</h2>
                        <p>
                            Es un pescado amazónico envuelto en hojas de bijao y asado, con
                            sabores frescos y naturales de la selva.
                        </p>
                        <span className="price">s/ 30</span>
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-cart-plus"></i> Añadir al carrito
                        </button>
                    </article>

                    <article className="dish">
                        <img src={tacacho} alt="Plato 6" />
                        <h2>Tacacho con cecina</h2>
                        <p>
                            Plato típico de la selva peruana que combina plátano verde asado y
                            triturado con manteca (tacacho), acompañado de carne de cerdo
                            ahumada (cecina).
                        </p>
                        <span className="price">s/ 20</span>
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-cart-plus"></i> Añadir al carrito
                        </button>
                    </article>
                </section>


                <div className="title">
                    <section className="titulo">
                        <h3>Bebidas</h3>
                    </section>
                </div>


                <section className="menu">
                    <article className="dish">
                        <img src={masato} alt="Masato" />
                        <h2>Masato</h2>
                        <p>
                            El masato es una bebida fermentada de yuca o arroz, dulce y
                            refrescante, tradicional de la Amazonía.
                        </p>
                        <span className="price">s/ 20</span>
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-cart-plus"></i> Añadir al carrito
                        </button>
                    </article>
                </section>


                <div id="whatsapp">
                    <a className="clit" href="https://wa.link/jxwasb" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-whatsapp"></i>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Carta;