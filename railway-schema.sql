-- ============================================================
-- EpiAmigo — Schema SQL para Railway (PostgreSQL 16)
-- Ejecutar en orden. No usar con synchronize:true activo.
-- ============================================================

-- 1. Tipos / enums auxiliares (ninguno en este proyecto)

-- 2. Tabla condiciones (sin dependencias)
CREATE TABLE IF NOT EXISTS condiciones (
  id_condicion    INTEGER      PRIMARY KEY,
  tipo_condicion  VARCHAR(100) NOT NULL
);

-- 3. Tabla sintomas (sin dependencias, módulo existente pero sin uso activo)
CREATE TABLE IF NOT EXISTS sintomas (
  id_sintoma  SERIAL       PRIMARY KEY,
  descripcion VARCHAR(200) NOT NULL
);

-- 4. Tabla usuarios (sin dependencias)
--    NOTA: bcrypt genera hashes de 60 caracteres.
--    La entidad declara length:50 (bug), pero la BD necesita al menos 60.
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario        SERIAL       PRIMARY KEY,
  rut               VARCHAR(30)  NOT NULL UNIQUE,
  nombre            VARCHAR(100) NOT NULL,
  apellido          VARCHAR(100) NOT NULL,
  correo            VARCHAR(100) NOT NULL UNIQUE,
  fecha_nac         DATE         NOT NULL,
  sexo              VARCHAR(50)  NOT NULL,
  contrasena        VARCHAR(60)  NOT NULL,
  token_dispositivo VARCHAR(300) NULL,
  tipo_perfil       VARCHAR(50)  NOT NULL
);

-- 5. Tabla usuarios_condicion (depende de usuarios)
--    La relación a condiciones vía JoinColumn está mal definida en la entidad
--    (el JoinColumn apunta al PK propio). Se omite esa FK; la relación real
--    usuario <-> tipos de epilepsia se gestiona en usuarios_tipos_condiciones.
CREATE TABLE IF NOT EXISTS usuarios_condicion (
  id_usuario_condicion SERIAL      PRIMARY KEY,
  id_usuario           INTEGER     NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  codigo_invitacion    INTEGER     NOT NULL,
  codeqr               VARCHAR(50) NOT NULL UNIQUE
);

-- 6. Tabla medicamentos (depende de usuarios_condicion)
CREATE TABLE IF NOT EXISTS medicamentos (
  idmedicamento        SERIAL       PRIMARY KEY,
  nombre               VARCHAR(255) NOT NULL,
  cantidad             VARCHAR(30)  NOT NULL,
  dosis                INTEGER      NOT NULL,
  frecuencia           VARCHAR(255) NOT NULL,
  id_usuario_condicion INTEGER      NOT NULL REFERENCES usuarios_condicion(id_usuario_condicion) ON DELETE CASCADE
);

-- 7. Tabla crisis (depende de usuarios_condicion)
CREATE TABLE IF NOT EXISTS crisis (
  id_crisis            SERIAL                   PRIMARY KEY,
  fecha_hora           TIMESTAMP WITH TIME ZONE NOT NULL,
  descripcion          VARCHAR(550)             NOT NULL,
  duracion             INTEGER                  NOT NULL,
  id_usuario_condicion INTEGER                  NOT NULL REFERENCES usuarios_condicion(id_usuario_condicion) ON DELETE CASCADE
);

-- 8. Tabla contactos_emergencia (depende de usuarios y usuarios_condicion)
CREATE TABLE IF NOT EXISTS contactos_emergencia (
  id_contacto          SERIAL       PRIMARY KEY,
  relacion             VARCHAR(100) NOT NULL,
  id_contacto_usuario  INTEGER      NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  id_usuario_condicion INTEGER      NOT NULL REFERENCES usuarios_condicion(id_usuario_condicion) ON DELETE CASCADE
);

-- 9. Tabla usuarios_tipos_condiciones — relación M:N usuario_condicion <-> condicion
CREATE TABLE IF NOT EXISTS usuarios_tipos_condiciones (
  id                   SERIAL  PRIMARY KEY,
  id_usuario_condicion INTEGER NOT NULL REFERENCES usuarios_condicion(id_usuario_condicion) ON DELETE CASCADE,
  id_condicion         INTEGER NOT NULL REFERENCES condiciones(id_condicion) ON DELETE CASCADE
);

-- 10. Tabla recursos (sin dependencias)
CREATE TABLE IF NOT EXISTS recursos (
  id_recurso   SERIAL       PRIMARY KEY,
  tipo_recurso VARCHAR(50)  NOT NULL,
  titulo       VARCHAR(255) NOT NULL,
  url          VARCHAR(500) NOT NULL
);
