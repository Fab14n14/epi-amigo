-- ============================================================
-- EpiAmigo — Seed SQL para Railway
-- Ejecutar DESPUÉS de railway-schema.sql
-- ============================================================

-- Tipos de epilepsia (IDs deben coincidir con los usados en el frontend)
-- El frontend envía los labels como strings; la relación se guarda en
-- usuarios_tipos_condiciones usando el id_condicion de esta tabla.
INSERT INTO condiciones (id_condicion, tipo_condicion) VALUES
  (1, 'Focal'),
  (2, 'Etiología desconocida'),
  (3, 'Generalizada'),
  (4, 'Genética'),
  (5, 'Síndrome epiléptico'),
  (6, 'No tengo conocimiento del tipo')
ON CONFLICT (id_condicion) DO NOTHING;

-- Recursos educativos (videos y PDFs sobre epilepsia)
-- El frontend filtra por tipo_recurso: 'Video' o 'Pdf' (case-sensitive)
INSERT INTO recursos (tipo_recurso, titulo, url) VALUES
  (
    'Video',
    '¿Qué es la epilepsia? — Liga Chilena contra la Epilepsia',
    'https://www.youtube.com/watch?v=yHyAFpEqCXo'
  ),
  (
    'Video',
    'Primeros auxilios ante una crisis epiléptica',
    'https://www.youtube.com/watch?v=YT0LrSWdJh4'
  ),
  (
    'Video',
    'Epilepsia en niños: causas y tratamiento',
    'https://www.youtube.com/watch?v=example_video_3'
  ),
  (
    'Pdf',
    'Guía de convivencia con la epilepsia — MINSAL Chile',
    'https://www.minsal.cl/wp-content/uploads/2015/09/Epilepsia.pdf'
  ),
  (
    'Pdf',
    'Protocolo de actuación ante crisis epiléptica en el trabajo',
    'https://www.senel.es/wp-content/uploads/2019/05/Protocolo-crisis-epileptica-en-el-trabajo.pdf'
  )
ON CONFLICT DO NOTHING;
