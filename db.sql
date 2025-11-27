-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.
CREATE TABLE public.agency_profiles (
  id uuid NOT NULL,
  full_name text,
  nit text,
  phone text,
  email text,
  verified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT agency_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT agency_profiles_id_fkey FOREIGN KEY (id) REFERENCES public.users_extended(id)
);
CREATE TABLE public.chats (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL,
  buyer_id uuid NOT NULL,
  seller_id uuid NOT NULL,
  topic text NOT NULL,
  last_message_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT chats_pkey PRIMARY KEY (id),
  CONSTRAINT chats_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id),
  CONSTRAINT chats_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.users_extended(id),
  CONSTRAINT chats_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.users_extended(id)
);
CREATE TABLE public.favorites (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  property_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT favorites_pkey PRIMARY KEY (id),
  CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users_extended(id),
  CONSTRAINT favorites_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id)
);
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  chat_id uuid NOT NULL,
  sender_id uuid NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users_extended(id)
);
CREATE TABLE public.operation_type (
  id integer NOT NULL DEFAULT nextval('operation_type_id_seq'::regclass),
  name text NOT NULL UNIQUE,
  CONSTRAINT operation_type_pkey PRIMARY KEY (id)
);
CREATE TABLE public.owner_profiles (
  id uuid NOT NULL,
  full_name text,
  phone text,
  email text,
  document_number text,
  verified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT owner_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT owner_profiles_id_fkey FOREIGN KEY (id) REFERENCES public.users_extended(id)
);
CREATE TABLE public.properties (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  property_type_id integer,
  operation_type_id integer,
  price numeric,
  currency text DEFAULT 'COP'::text,
  area_m2 numeric,
  bedrooms integer,
  bathrooms integer,
  garages integer,
  floors integer,
  stratum integer,
  amenities ARRAY,
  images ARRAY,
  videos ARRAY,
  address text,
  neighborhood text,
  city text,
  department text,
  country text DEFAULT 'Colombia'::text,
  latitude numeric,
  longitude numeric,
  is_active boolean DEFAULT true,
  verified boolean DEFAULT false,
  featured boolean DEFAULT false,
  user_id uuid,
  user_type integer,
  contact_phone text,
  contact_email text,
  views_count integer DEFAULT 0,
  favorites_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT properties_pkey PRIMARY KEY (id),
  CONSTRAINT properties_property_type_id_fkey FOREIGN KEY (property_type_id) REFERENCES public.property_type(id),
  CONSTRAINT properties_operation_type_id_fkey FOREIGN KEY (operation_type_id) REFERENCES public.operation_type(id),
  CONSTRAINT properties_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users_extended(id),
  CONSTRAINT properties_user_type_fkey FOREIGN KEY (user_type) REFERENCES public.user_type(id)
);
CREATE TABLE public.property_type (
  id integer NOT NULL DEFAULT nextval('property_type_id_seq'::regclass),
  name text NOT NULL UNIQUE,
  CONSTRAINT property_type_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user_profiles (
  id uuid NOT NULL,
  full_name text,
  phone text,
  email text,
  preferences jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT user_profiles_id_fkey FOREIGN KEY (id) REFERENCES public.users_extended(id)
);
CREATE TABLE public.user_type (
  id integer NOT NULL DEFAULT nextval('user_type_id_seq'::regclass),
  name text NOT NULL UNIQUE,
  CONSTRAINT user_type_pkey PRIMARY KEY (id)
);
CREATE TABLE public.users_extended (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  auth_provider text NOT NULL DEFAULT 'email'::text,
  user_type_id integer,
  profile_completed boolean DEFAULT false,
  profile_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_extended_pkey PRIMARY KEY (id),
  CONSTRAINT users_extended_user_type_id_fkey FOREIGN KEY (user_type_id) REFERENCES public.user_type(id)
);