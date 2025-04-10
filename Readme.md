Manual de Usuario
Introducción:
La API de autenticación permite a los usuarios registrarse, iniciar sesión, obtener
información de su perfil y cerrar sesión. Está diseñada para integrarse con
aplicaciones frontend y utiliza tokens JWT para la autenticación.

**Requisitos previos**
1. Software necesario:
o Python 3.9 o superior.
o Node.js 16 o superior.
o Un gestor de paquetes como npm o yarn.
o Un servidor de base de datos compatible con SQL Server (por ejemplo,
SQL Server Express).
o Controlador ODBC para SQL Server (ODBC Driver 17 o superior).

2. Instalación de dependencias:
o Asegúrate de tener pip para instalar las dependencias de Python.
o Asegúrate de tener npm o yarn para instalar las dependencias del
frontend.


**Configuración del Backend**
1. Clonar el repositorio:
o Descarga o clona el proyecto en tu ordenador.
2. Configurar el entorno virtual de Python:
cd Backend
python -m venv venv
source venv/bin/activate # En Windows: venv\Scripts\activate
3. Instalar las dependencias:
pip install -r requirements.txt
4. Configurar las variables de entorno:
o Crea un archivo .env en la carpeta app con el siguiente contenido:
JWT_SECRET_KEY=tu_clave_secreta
DATABASE_URL=mssql+pyodbc://@<TU_SERVIDOR>/<TU_BASE_DE_DATOS>?truste
d_connection=yes&driver=ODBC+Driver+17+for+SQL+Server
5. Configurar la base de datos:
o Asegúrate de que la base de datos esté configurada y accesible.
6. Ejecutar el servidor:
uvicorn app.main:app --reload
o El backend estará disponible en http://127.0.0.1:8000.


**Configuración del Frontend**
1. Navegar a la carpeta del frontend:
cd Frontend
2. Instalar las dependencias:
npm install
3. Configurar el archivo de entorno:
o Crea un archivo .env en la carpeta Frontend con el siguiente contenido:
REACT_APP_API_URL=http://127.0.0.1:8000
4. Ejecutar el servidor de desarrollo:
npm start o npm run dev
o El frontend estará disponible en http://localhost:3000.

**Pruebas del Sistema**
Registro de usuario:
o Accede a http://localhost:3000/register y crea una cuenta.
Inicio de sesión:
o Accede a http://localhost:3000/login e inicia sesión con las
credenciales creadas.
Perfil de usuario:
o Una vez autenticado, accede a http://localhost:3000/profile para ver el
perfil del usuario.
URL Base de la API: http://127.0.0.1:8000
Herramientas recomendadas para pruebas:
• Postman
• Navegador o cliente HTTP

**EndPoints Disponibles:**
1. Registro de Usuario
• URL: /auth/register
• Método: POST
• Descripción: Permite registrar un nuevo usuario.
• Cuerpo de la Solicitud (JSON):
• {
• "name": "John",
• "lastname": "Doe",
• "email": "john.doe@example.com",
• "password": "password123"
• }
• Ejemplo de respuesta exitosa:
• {
• "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
• }
• Errores Comunes:
o 400 Bad Request: Datos faltantes o inválidos.
o 409 Conflict: El correo ya está registrado.

2. Inicio de Sesión
• URL: /auth/login
• Método: POST
• Descripción: Permite a un usuario iniciar sesión.
• Cuerpo de la Solicitud (JSON):
• {
• "email": "john.doe@example.com",
• "password": "password123"
• }
• Ejemplo de Respuesta Exitosa (200):
• {
• "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
• }
• Errores Comunes:
o 401 Unauthorized: Credenciales incorrectas.

3. Obtener Perfil del Usuario
• URL: /auth/profile
• Método: GET
• Descripción: Obtiene la información del usuario autenticado.
• Encabezados Requeridos:
• {
• "Authorization": "Bearer <token>"
• }
• Ejemplo de Respuesta Exitosa (200):
• {
• "id": 1,
• "name": "John",
• "lastname": "Doe",
• "email": "john.doe@example.com"
• }
• Errores Comunes:
o 401 Unauthorized: Token inválido o no proporcionado.

**Preguntas Frecuentes (FAQ)**
• ¿Qué hago si recibo un error 401?
o Verifica que el token JWT sea válido y esté incluido en los encabezados
de la solicitud.
• ¿Cómo manejo un error 400 en el registro?
o Asegúrate de enviar todos los campos requeridos (name, lastname,
email, password) en el formato correcto.
• ¿El token tiene expiración?
o Sí, verifica la configuración del backend para conocer la duración del
token.