URL pública al frontend: https://conflict-tracker-frontend-delta.vercel.app/

Para cambiar las variables de entorno para un nuevo deployment tan solo hay que ir a Environment en el panel de la izquierda, ya sea en Render o en Vercel, y borrar, modificar o añadir.

Lista de modificaciones hechas al backend/frontend

Backend

- Variables para la conexión a supabase en el archivo application.yaml creadas
- Dependencia de PostgreSQL añadida al proyecto de Springboot
- Dockerfile creado en la carpeta raíz del proyecto


Frontend

- baseURL de conexión con la api cambiada a la que proporciona el render