--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-02 13:35:51

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

--
-- TOC entry 4973 (class 1262 OID 21051)
-- Name: epiamigo; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE epiamigo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Chile.1252';


ALTER DATABASE epiamigo OWNER TO postgres;

\connect epiamigo

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

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 21411)
-- Name: condiciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.condiciones (
    id_condicion integer NOT NULL,
    tipo_condicion character varying(60) NOT NULL
);


ALTER TABLE public.condiciones OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 21410)
-- Name: condiciones_id_condicion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.condiciones_id_condicion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.condiciones_id_condicion_seq OWNER TO postgres;

--
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 218
-- Name: condiciones_id_condicion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.condiciones_id_condicion_seq OWNED BY public.condiciones.id_condicion;


--
-- TOC entry 228 (class 1259 OID 21480)
-- Name: contactos_emergencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contactos_emergencia (
    id_contacto integer NOT NULL,
    relacion character varying(100),
    id_usuario_condicion integer
);


ALTER TABLE public.contactos_emergencia OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 21479)
-- Name: contactos_emergencia_id_contacto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contactos_emergencia_id_contacto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contactos_emergencia_id_contacto_seq OWNER TO postgres;

--
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 227
-- Name: contactos_emergencia_id_contacto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contactos_emergencia_id_contacto_seq OWNED BY public.contactos_emergencia.id_contacto;


--
-- TOC entry 225 (class 1259 OID 21450)
-- Name: crisis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crisis (
    id_crisis integer NOT NULL,
    fecha_hora timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    descripcion character varying(250),
    id_sintoma integer,
    id_usuario_condicion integer
);


ALTER TABLE public.crisis OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 21449)
-- Name: crisis_id_crisis_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.crisis_id_crisis_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.crisis_id_crisis_seq OWNER TO postgres;

--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 224
-- Name: crisis_id_crisis_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.crisis_id_crisis_seq OWNED BY public.crisis.id_crisis;


--
-- TOC entry 232 (class 1259 OID 21501)
-- Name: invitaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invitaciones (
    id_invitacion integer NOT NULL,
    id_usuario_emisor integer,
    id_usuario_receptor integer,
    cod_invitacion integer NOT NULL,
    fecha_envio timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.invitaciones OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 21500)
-- Name: invitaciones_id_invitacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invitaciones_id_invitacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.invitaciones_id_invitacion_seq OWNER TO postgres;

--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 231
-- Name: invitaciones_id_invitacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.invitaciones_id_invitacion_seq OWNED BY public.invitaciones.id_invitacion;


--
-- TOC entry 226 (class 1259 OID 21468)
-- Name: medicamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medicamentos (
    dosis integer NOT NULL,
    nombre character varying(255) NOT NULL,
    idmedicamento integer NOT NULL,
    cantidad character varying(30) NOT NULL,
    frecuencia character varying(255) NOT NULL,
    id_usuario_condicion integer
);


ALTER TABLE public.medicamentos OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 21536)
-- Name: medicamentos_idmedicamento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medicamentos_idmedicamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medicamentos_idmedicamento_seq OWNER TO postgres;

--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 233
-- Name: medicamentos_idmedicamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medicamentos_idmedicamento_seq OWNED BY public.medicamentos.idmedicamento;


--
-- TOC entry 230 (class 1259 OID 21492)
-- Name: recursos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recursos (
    id_recurso integer NOT NULL,
    tipo_recurso character varying(30) NOT NULL,
    titulo character varying(500),
    url character varying(200)
);


ALTER TABLE public.recursos OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 21491)
-- Name: recursos_id_recurso_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recursos_id_recurso_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recursos_id_recurso_seq OWNER TO postgres;

--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 229
-- Name: recursos_id_recurso_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recursos_id_recurso_seq OWNED BY public.recursos.id_recurso;


--
-- TOC entry 217 (class 1259 OID 21404)
-- Name: sintomas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sintomas (
    id_sintoma integer NOT NULL,
    descripcion character varying(200) NOT NULL
);


ALTER TABLE public.sintomas OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 21403)
-- Name: sintomas_id_sintoma_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sintomas_id_sintoma_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sintomas_id_sintoma_seq OWNER TO postgres;

--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 216
-- Name: sintomas_id_sintoma_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sintomas_id_sintoma_seq OWNED BY public.sintomas.id_sintoma;


--
-- TOC entry 221 (class 1259 OID 21418)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    rut character varying(30) NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    correo character varying(100) NOT NULL,
    fecha_nac date,
    contrasena text NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 21431)
-- Name: usuarios_condicion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios_condicion (
    id_usuario_condicion integer NOT NULL,
    id_usuario integer,
    id_condicion integer,
    codigo_invitacion integer NOT NULL,
    codeqr character varying(50) NOT NULL
);


ALTER TABLE public.usuarios_condicion OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 21430)
-- Name: usuarios_condicion_id_usuario_condicion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_condicion_id_usuario_condicion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_condicion_id_usuario_condicion_seq OWNER TO postgres;

--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 222
-- Name: usuarios_condicion_id_usuario_condicion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_condicion_id_usuario_condicion_seq OWNED BY public.usuarios_condicion.id_usuario_condicion;


--
-- TOC entry 220 (class 1259 OID 21417)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 220
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4758 (class 2604 OID 21414)
-- Name: condiciones id_condicion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.condiciones ALTER COLUMN id_condicion SET DEFAULT nextval('public.condiciones_id_condicion_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 21483)
-- Name: contactos_emergencia id_contacto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contactos_emergencia ALTER COLUMN id_contacto SET DEFAULT nextval('public.contactos_emergencia_id_contacto_seq'::regclass);


--
-- TOC entry 4761 (class 2604 OID 21453)
-- Name: crisis id_crisis; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crisis ALTER COLUMN id_crisis SET DEFAULT nextval('public.crisis_id_crisis_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 21504)
-- Name: invitaciones id_invitacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitaciones ALTER COLUMN id_invitacion SET DEFAULT nextval('public.invitaciones_id_invitacion_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 21537)
-- Name: medicamentos idmedicamento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamentos ALTER COLUMN idmedicamento SET DEFAULT nextval('public.medicamentos_idmedicamento_seq'::regclass);


--
-- TOC entry 4765 (class 2604 OID 21495)
-- Name: recursos id_recurso; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recursos ALTER COLUMN id_recurso SET DEFAULT nextval('public.recursos_id_recurso_seq'::regclass);


--
-- TOC entry 4757 (class 2604 OID 21407)
-- Name: sintomas id_sintoma; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sintomas ALTER COLUMN id_sintoma SET DEFAULT nextval('public.sintomas_id_sintoma_seq'::regclass);


--
-- TOC entry 4759 (class 2604 OID 21421)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 21434)
-- Name: usuarios_condicion id_usuario_condicion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_condicion ALTER COLUMN id_usuario_condicion SET DEFAULT nextval('public.usuarios_condicion_id_usuario_condicion_seq'::regclass);


--
-- TOC entry 4953 (class 0 OID 21411)
-- Dependencies: 219
-- Data for Name: condiciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.condiciones (id_condicion, tipo_condicion) FROM stdin;
4	Epilepsia idiopática
5	Epilepsia sintomática
6	Síndrome de Lennox-Gastaut
7	Epilepsia idiopática
8	Epilepsia sintomática
9	Síndrome de Lennox-Gastaut
\.


--
-- TOC entry 4962 (class 0 OID 21480)
-- Dependencies: 228
-- Data for Name: contactos_emergencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contactos_emergencia (id_contacto, relacion, id_usuario_condicion) FROM stdin;
1	madre	10
\.


--
-- TOC entry 4959 (class 0 OID 21450)
-- Dependencies: 225
-- Data for Name: crisis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.crisis (id_crisis, fecha_hora, descripcion, id_sintoma, id_usuario_condicion) FROM stdin;
\.


--
-- TOC entry 4966 (class 0 OID 21501)
-- Dependencies: 232
-- Data for Name: invitaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invitaciones (id_invitacion, id_usuario_emisor, id_usuario_receptor, cod_invitacion, fecha_envio) FROM stdin;
\.


--
-- TOC entry 4960 (class 0 OID 21468)
-- Dependencies: 226
-- Data for Name: medicamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medicamentos (dosis, nombre, idmedicamento, cantidad, frecuencia, id_usuario_condicion) FROM stdin;
10	paracetamol	9	MG	Semanal	10
\.


--
-- TOC entry 4964 (class 0 OID 21492)
-- Dependencies: 230
-- Data for Name: recursos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recursos (id_recurso, tipo_recurso, titulo, url) FROM stdin;
\.


--
-- TOC entry 4951 (class 0 OID 21404)
-- Dependencies: 217
-- Data for Name: sintomas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sintomas (id_sintoma, descripcion) FROM stdin;
1	Convulsiones tónico-clónicas
2	Ausencias
3	Convulsiones parciales
4	Dolor de cabeza después de una crisis
\.


--
-- TOC entry 4955 (class 0 OID 21418)
-- Dependencies: 221
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, rut, nombre, apellido, correo, fecha_nac, contrasena) FROM stdin;
1	11111111-1	Ana	Rodríguez	ana.rodriguez@example.com	1992-03-12	\\x6d695f636f6e7472617365c3b161
2	22222222-2	Luis	Gómez	luis.gomez@example.com	1988-09-25	\\x6d695f636f6e7472617365c3b161
3	33333333-3	Sofía	Hernández	sofia.hernandez@example.com	2001-01-01	\\x6d695f636f6e7472617365c3b161
4	12345678-9	fabian	molina	fabian.molina@example.com	1990-01-01	\\x70617373776f7264313233
5	98765432-1	Juan	Pérez	juan.perez@example.com	1990-01-01	\\x2432622431302442616f2f4b58396c5973386a2e49475234714d654f6554356254746c762e59393142797339774f7a2f484c4a6c5258654f59486775
14	14465678-9	Juan	Pérez	perez@hotmail.com	2001-10-10	\\x5041533132333435
8	207305294	FABIAN	MOLINA	molinfabian1424@gmail.com	2001-04-06	$2b$10$d07XqNvYu9qLOvXTdK.aVOepNlS7reJZ2jZi5U2xPUKe5jfDjqU36
9	123456888	Carlos	Lopez	carlos.lopez@example.com	1995-05-05	$2a$06$ICDrMkjrdzIBXewzOeGZxetVvIhWGaJN2tI1GI9/fC3wrpKzmm14a
\.


--
-- TOC entry 4957 (class 0 OID 21431)
-- Dependencies: 223
-- Data for Name: usuarios_condicion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios_condicion (id_usuario_condicion, id_usuario, id_condicion, codigo_invitacion, codeqr) FROM stdin;
10	1	4	1241	QR12345
11	5	4	12345	QR12441213
\.


--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 218
-- Name: condiciones_id_condicion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.condiciones_id_condicion_seq', 9, true);


--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 227
-- Name: contactos_emergencia_id_contacto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contactos_emergencia_id_contacto_seq', 1, false);


--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 224
-- Name: crisis_id_crisis_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.crisis_id_crisis_seq', 1, false);


--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 231
-- Name: invitaciones_id_invitacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invitaciones_id_invitacion_seq', 1, false);


--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 233
-- Name: medicamentos_idmedicamento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medicamentos_idmedicamento_seq', 9, true);


--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 229
-- Name: recursos_id_recurso_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recursos_id_recurso_seq', 1, false);


--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 216
-- Name: sintomas_id_sintoma_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sintomas_id_sintoma_seq', 4, true);


--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 222
-- Name: usuarios_condicion_id_usuario_condicion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_condicion_id_usuario_condicion_seq', 11, true);


--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 220
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 9, true);


--
-- TOC entry 4789 (class 2606 OID 21542)
-- Name: medicamentos PK_ed582e7d327bdb312552b33721c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT "PK_ed582e7d327bdb312552b33721c" PRIMARY KEY (idmedicamento);


--
-- TOC entry 4771 (class 2606 OID 21416)
-- Name: condiciones condiciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.condiciones
    ADD CONSTRAINT condiciones_pkey PRIMARY KEY (id_condicion);


--
-- TOC entry 4791 (class 2606 OID 21485)
-- Name: contactos_emergencia contactos_emergencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contactos_emergencia
    ADD CONSTRAINT contactos_emergencia_pkey PRIMARY KEY (id_contacto);


--
-- TOC entry 4787 (class 2606 OID 21456)
-- Name: crisis crisis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crisis
    ADD CONSTRAINT crisis_pkey PRIMARY KEY (id_crisis);


--
-- TOC entry 4795 (class 2606 OID 21509)
-- Name: invitaciones invitaciones_cod_invitacion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitaciones
    ADD CONSTRAINT invitaciones_cod_invitacion_key UNIQUE (cod_invitacion);


--
-- TOC entry 4797 (class 2606 OID 21507)
-- Name: invitaciones invitaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitaciones
    ADD CONSTRAINT invitaciones_pkey PRIMARY KEY (id_invitacion);


--
-- TOC entry 4793 (class 2606 OID 21499)
-- Name: recursos recursos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recursos
    ADD CONSTRAINT recursos_pkey PRIMARY KEY (id_recurso);


--
-- TOC entry 4769 (class 2606 OID 21409)
-- Name: sintomas sintomas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sintomas
    ADD CONSTRAINT sintomas_pkey PRIMARY KEY (id_sintoma);


--
-- TOC entry 4779 (class 2606 OID 21933)
-- Name: usuarios_condicion usuarios_condicion_codeqr_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_condicion
    ADD CONSTRAINT usuarios_condicion_codeqr_key UNIQUE (codeqr);


--
-- TOC entry 4781 (class 2606 OID 21915)
-- Name: usuarios_condicion usuarios_condicion_codigo_invitacion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_condicion
    ADD CONSTRAINT usuarios_condicion_codigo_invitacion_key UNIQUE (codigo_invitacion);


--
-- TOC entry 4783 (class 2606 OID 21438)
-- Name: usuarios_condicion usuarios_condicion_id_usuario_id_condicion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_condicion
    ADD CONSTRAINT usuarios_condicion_id_usuario_id_condicion_key UNIQUE (id_usuario, id_condicion);


--
-- TOC entry 4785 (class 2606 OID 21436)
-- Name: usuarios_condicion usuarios_condicion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_condicion
    ADD CONSTRAINT usuarios_condicion_pkey PRIMARY KEY (id_usuario_condicion);


--
-- TOC entry 4773 (class 2606 OID 21429)
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- TOC entry 4775 (class 2606 OID 21425)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4777 (class 2606 OID 21427)
-- Name: usuarios usuarios_rut_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_rut_key UNIQUE (rut);


--
-- TOC entry 4806 (class 2620 OID 21925)
-- Name: usuarios encrypt_password_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER encrypt_password_trigger BEFORE INSERT OR UPDATE ON public.usuarios FOR EACH ROW EXECUTE FUNCTION public.hash_password();


--
-- TOC entry 4803 (class 2606 OID 21486)
-- Name: contactos_emergencia contactos_emergencia_id_usuario_condicion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contactos_emergencia
    ADD CONSTRAINT contactos_emergencia_id_usuario_condicion_fkey FOREIGN KEY (id_usuario_condicion) REFERENCES public.usuarios_condicion(id_usuario_condicion) ON DELETE CASCADE;


--
-- TOC entry 4800 (class 2606 OID 21457)
-- Name: crisis crisis_id_sintoma_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crisis
    ADD CONSTRAINT crisis_id_sintoma_fkey FOREIGN KEY (id_sintoma) REFERENCES public.sintomas(id_sintoma) ON DELETE SET NULL;


--
-- TOC entry 4801 (class 2606 OID 21462)
-- Name: crisis crisis_id_usuario_condicion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crisis
    ADD CONSTRAINT crisis_id_usuario_condicion_fkey FOREIGN KEY (id_usuario_condicion) REFERENCES public.usuarios_condicion(id_usuario_condicion) ON DELETE CASCADE;


--
-- TOC entry 4802 (class 2606 OID 21587)
-- Name: medicamentos fk_id_usuario_condicion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT fk_id_usuario_condicion FOREIGN KEY (id_usuario_condicion) REFERENCES public.usuarios_condicion(id_usuario_condicion);


--
-- TOC entry 4804 (class 2606 OID 21510)
-- Name: invitaciones invitaciones_id_usuario_emisor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitaciones
    ADD CONSTRAINT invitaciones_id_usuario_emisor_fkey FOREIGN KEY (id_usuario_emisor) REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 4805 (class 2606 OID 21515)
-- Name: invitaciones invitaciones_id_usuario_receptor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitaciones
    ADD CONSTRAINT invitaciones_id_usuario_receptor_fkey FOREIGN KEY (id_usuario_receptor) REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 4798 (class 2606 OID 21444)
-- Name: usuarios_condicion usuarios_condicion_id_condicion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_condicion
    ADD CONSTRAINT usuarios_condicion_id_condicion_fkey FOREIGN KEY (id_condicion) REFERENCES public.condiciones(id_condicion) ON DELETE SET NULL;


--
-- TOC entry 4799 (class 2606 OID 21439)
-- Name: usuarios_condicion usuarios_condicion_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_condicion
    ADD CONSTRAINT usuarios_condicion_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE;


-- Completed on 2024-11-02 13:35:52

--
-- PostgreSQL database dump complete
--

