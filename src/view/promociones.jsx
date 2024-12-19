import React from 'react';
import './../css/principal.css';
import promo1 from './../img/promos/promo1.jpeg';
import promo2 from './../img/promos/promo2.jpeg';
import promo3 from './../img/promos/promo3.jpeg';
import bebida1 from './../img/promos/bebida1.jpeg';


const Promociones = () => {
    return (
        <div id="principal">
            <div className="contenedor">
                <div id="promociones" className="title">
                    <section className="titulo">
                        <h3>Platos típicos</h3>
                    </section>
                </div>



                <section className="menu">
                    <article className="dish">
                        <img src={promo1} alt="Plato 1" />
                        <h2>2 Juane amazónico</h2>
                        <p>
                            Es un guiso típico preparado con pescado fresco, cocido en su jugo
                            con hierbas, especias y vegetales, ofreciendo un sabor suave y
                            aromático.
                        </p>
                        <span className="price">s/ 36</span>
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-cart-plus"></i> Añadir al carrito
                        </button>
                    </article>

                    <article className="dish">
                        <img src={promo2} alt="Plato 2" />
                        <h2>3 Sudado de pescado</h2>
                        <p>
                            Es un guiso típico preparado con pescado fresco, cocido en su jugo
                            con hierbas, especias y vegetales, ofreciendo un sabor suave y
                            aromático.
                        </p>
                        <span className="price">s/ 52.50</span>
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-cart-plus"></i> Añadir al carrito
                        </button>
                    </article>

                    <article className="dish">
                        <img src={promo3} alt="Plato 3" />
                        <h2>4 Tacacho con cecina</h2>
                        <p>
                            Plato típico de la selva peruana que combina plátano verde asado y
                            triturado con manteca (tacacho), acompañado de carne de cerdo
                            ahumada (cecina).
                        </p>
                        <span className="price">s/ 64</span>
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
                        <img src={bebida1} alt="Bebida 1" />
                        <h2>5 Masato</h2>
                        <p>
                            El masato es una bebida fermentada de yuca o arroz, dulce y
                            refrescante, tradicional de la Amazonía.
                        </p>
                        <span className="price">s/ 85</span>
                        <button type="button" class="btn btn-success">
                            <i class="bi bi-cart-plus"></i> Añadir al carrito
                        </button>
                    </article>
                </section>


            </div>
        </div>
    );
};

export default Promociones;
