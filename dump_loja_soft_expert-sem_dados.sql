PGDMP       	        
        |            loja_soft_expert    16.3 (Debian 16.3-1.pgdg120+1)    16.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                        0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            !           1262    57344    loja_soft_expert    DATABASE     {   CREATE DATABASE loja_soft_expert WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
     DROP DATABASE loja_soft_expert;
                postgres    false                        2615    82017    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            "           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            #           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   pg_database_owner    false    5            �            1259    82018    orders    TABLE     s   CREATE TABLE public.orders (
    id bigint NOT NULL,
    total numeric NOT NULL,
    total_tax numeric NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false    5            �            1259    82065    orders_id_seq    SEQUENCE     �   ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215    5            �            1259    82023    product_order    TABLE     �   CREATE TABLE public.product_order (
    product_id bigint NOT NULL,
    order_id bigint NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    total numeric NOT NULL,
    total_tax numeric NOT NULL
);
 !   DROP TABLE public.product_order;
       public         heap    postgres    false    5            �            1259    82029    product_types    TABLE     }   CREATE TABLE public.product_types (
    id bigint NOT NULL,
    name character varying NOT NULL,
    tax integer NOT NULL
);
 !   DROP TABLE public.product_types;
       public         heap    postgres    false    5            �            1259    82034    product_types_id_seq    SEQUENCE     �   ALTER TABLE public.product_types ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    217            �            1259    82035    products    TABLE     �   CREATE TABLE public.products (
    id bigint NOT NULL,
    type_id bigint NOT NULL,
    name character varying NOT NULL,
    description text,
    price numeric NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false    5            �            1259    82040    products_id_seq    SEQUENCE     �   ALTER TABLE public.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    219                      0    82018    orders 
   TABLE DATA           6   COPY public.orders (id, total, total_tax) FROM stdin;
    public          postgres    false    215   &                 0    82023    product_order 
   TABLE DATA           Y   COPY public.product_order (product_id, order_id, quantity, total, total_tax) FROM stdin;
    public          postgres    false    216   ;                 0    82029    product_types 
   TABLE DATA           6   COPY public.product_types (id, name, tax) FROM stdin;
    public          postgres    false    217   P                 0    82035    products 
   TABLE DATA           I   COPY public.products (id, type_id, name, description, price) FROM stdin;
    public          postgres    false    219   e       $           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 1, false);
          public          postgres    false    221            %           0    0    product_types_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.product_types_id_seq', 6, true);
          public          postgres    false    218            &           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 15, true);
          public          postgres    false    220            |           2606    82049    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    215            ~           2606    82043     product_order product_order_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.product_order
    ADD CONSTRAINT product_order_pkey PRIMARY KEY (product_id, order_id);
 J   ALTER TABLE ONLY public.product_order DROP CONSTRAINT product_order_pkey;
       public            postgres    false    216    216            �           2606    82045    product_types product_type_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.product_types
    ADD CONSTRAINT product_type_pkey PRIMARY KEY (id);
 I   ALTER TABLE ONLY public.product_types DROP CONSTRAINT product_type_pkey;
       public            postgres    false    217            �           2606    82047    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    219            �           2606    82050    product_order fk_order_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_order
    ADD CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES public.orders(id) NOT VALID;
 C   ALTER TABLE ONLY public.product_order DROP CONSTRAINT fk_order_id;
       public          postgres    false    216    215    3196            �           2606    82055    product_order fk_product_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_order
    ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES public.products(id) NOT VALID;
 E   ALTER TABLE ONLY public.product_order DROP CONSTRAINT fk_product_id;
       public          postgres    false    219    3202    216            �           2606    82060    products fk_product_type_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_product_type_id FOREIGN KEY (type_id) REFERENCES public.product_types(id) NOT VALID;
 E   ALTER TABLE ONLY public.products DROP CONSTRAINT fk_product_type_id;
       public          postgres    false    219    3200    217                  \.


            \.


            \.


            \.


     