PGDMP       "    6                 z            alwaysMusic    13.6    13.6     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    41284    alwaysMusic    DATABASE     i   CREATE DATABASE "alwaysMusic" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "alwaysMusic";
                felipe    false            �            1259    41303    alumnos    TABLE     �   CREATE TABLE public.alumnos (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    rut character varying(15) NOT NULL,
    curso character varying(30) NOT NULL,
    nivel character varying(10) NOT NULL
);
    DROP TABLE public.alumnos;
       public         heap    postgres    false            �            1259    41301    alumnos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.alumnos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.alumnos_id_seq;
       public          postgres    false    201            �           0    0    alumnos_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.alumnos_id_seq OWNED BY public.alumnos.id;
          public          postgres    false    200            "           2604    41306 
   alumnos id    DEFAULT     h   ALTER TABLE ONLY public.alumnos ALTER COLUMN id SET DEFAULT nextval('public.alumnos_id_seq'::regclass);
 9   ALTER TABLE public.alumnos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            �          0    41303    alumnos 
   TABLE DATA           @   COPY public.alumnos (id, nombre, rut, curso, nivel) FROM stdin;
    public          postgres    false    201   �
       �           0    0    alumnos_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.alumnos_id_seq', 1, false);
          public          postgres    false    200            $           2606    41308    alumnos alumnos_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT alumnos_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.alumnos DROP CONSTRAINT alumnos_pkey;
       public            postgres    false    201            �      \.


     