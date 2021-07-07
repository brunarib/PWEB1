--
-- PostgreSQL database dump
--

-- Dumped from database version 11.11
-- Dumped by pg_dump version 13.1

-- Started on 2021-07-07 12:06:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 198 (class 1259 OID 75584)
-- Name: administrador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administrador (
    adm_id bigint NOT NULL,
    usuario_id bigint NOT NULL
);


ALTER TABLE public.administrador OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 75594)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    categoria_id bigint NOT NULL,
    descricao character varying NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 75571)
-- Name: cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliente (
    cliente_id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    endereco character varying NOT NULL
);


ALTER TABLE public.cliente OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 75610)
-- Name: compra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compra (
    compra_id bigint NOT NULL,
    cliente_id bigint NOT NULL,
    compra_efetuada timestamp(0) without time zone NOT NULL,
    valor_total double precision NOT NULL,
    status character varying NOT NULL
);


ALTER TABLE public.compra OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 75602)
-- Name: produto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produto (
    produto_id bigint NOT NULL,
    descricao character varying NOT NULL,
    preco double precision NOT NULL,
    foto bytea,
    quantidade_estoque bigint NOT NULL
);


ALTER TABLE public.produto OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 75636)
-- Name: produto_categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produto_categoria (
    categoria_id bigint NOT NULL,
    produto_id bigint NOT NULL
);


ALTER TABLE public.produto_categoria OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 75623)
-- Name: produto_compra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produto_compra (
    compra_id bigint NOT NULL,
    produto_id bigint NOT NULL,
    quantidade_produto bigint NOT NULL,
    valor_total_produto double precision NOT NULL
);


ALTER TABLE public.produto_compra OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 75560)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    usuario_id bigint NOT NULL,
    nome character varying(50) NOT NULL,
    login character varying(50) NOT NULL,
    senha character varying NOT NULL,
    email character varying NOT NULL,
    is_adm boolean DEFAULT false NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 2724 (class 2606 OID 75588)
-- Name: administrador administrador_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_pk PRIMARY KEY (adm_id);


--
-- TOC entry 2726 (class 2606 OID 75601)
-- Name: categoria categoria_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pk PRIMARY KEY (categoria_id);


--
-- TOC entry 2722 (class 2606 OID 75578)
-- Name: cliente cliente_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pk PRIMARY KEY (cliente_id);


--
-- TOC entry 2730 (class 2606 OID 75617)
-- Name: compra compra_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pk PRIMARY KEY (compra_id);


--
-- TOC entry 2728 (class 2606 OID 75609)
-- Name: produto produto_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_pk PRIMARY KEY (produto_id);


--
-- TOC entry 2718 (class 2606 OID 75568)
-- Name: usuarios usuario_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuario_pk PRIMARY KEY (usuario_id);


--
-- TOC entry 2720 (class 2606 OID 75570)
-- Name: usuarios usuario_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuario_un UNIQUE (login);


--
-- TOC entry 2732 (class 2606 OID 75589)
-- Name: administrador administrador_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_fk FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id);


--
-- TOC entry 2731 (class 2606 OID 75579)
-- Name: cliente cliente_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_fk FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id);


--
-- TOC entry 2733 (class 2606 OID 75618)
-- Name: compra compra_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_fk FOREIGN KEY (cliente_id) REFERENCES public.cliente(cliente_id);


--
-- TOC entry 2736 (class 2606 OID 75639)
-- Name: produto_categoria produto_categoria_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria
    ADD CONSTRAINT produto_categoria_fk FOREIGN KEY (categoria_id) REFERENCES public.categoria(categoria_id);


--
-- TOC entry 2737 (class 2606 OID 75644)
-- Name: produto_categoria produto_categoria_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria
    ADD CONSTRAINT produto_categoria_fk_1 FOREIGN KEY (produto_id) REFERENCES public.produto(produto_id);


--
-- TOC entry 2734 (class 2606 OID 75626)
-- Name: produto_compra produto_compra_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_compra
    ADD CONSTRAINT produto_compra_fk FOREIGN KEY (produto_id) REFERENCES public.produto(produto_id);


--
-- TOC entry 2735 (class 2606 OID 75631)
-- Name: produto_compra produto_compra_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_compra
    ADD CONSTRAINT produto_compra_fk_1 FOREIGN KEY (compra_id) REFERENCES public.compra(compra_id);


-- Completed on 2021-07-07 12:06:34

--
-- PostgreSQL database dump complete
--

