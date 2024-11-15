# EpiAmigo

EpiAmigo es una aplicación diseñada para mejorar la calidad de vida de las personas con epilepsia y sus cuidadores, ofreciendo herramientas para la autogestión de la condición.

## Requisitos Previos

1. **PostgreSQL**: Versión 16 con PgAdmin4 instalado para gestionar la base de datos.
2. **Node.js**: Instalado para gestionar dependencias.
3. **NestJS**: Framework para el back-end.
4. **Expo Go**: Instalado en un dispositivo móvil o **Android Studio** en tu PC para ejecutar el front-end.

---

## Instrucciones de Instalación

### **Back-end**

1. **Clonar el repositorio**:  
   Descarga el código del back-end desde el siguiente enlace:  
   - [Repositorio back-end](https://github.com/Fab14n14/epi-amigo)

2. **Restaurar base de datos**:  
   Importa la base de datos en PgAdmin mediante la opción de **restore**.

3. **Configurar el archivo `.env`**:  
   Crea o edita el archivo `.env` en la raíz del proyecto con los siguientes valores:
   ```env
   DATABASE_PORT=<puerto de PostgreSQL>
   DATABASE_USER=<usuario de la base de datos>
   DATABASE_PASSWORD=<contraseña>
   DATABASE_NAME=<nombre de la base de datos>
4. **Instalar dependencias**:
   En la terminal de Visual Studio Code (VSC), navega al directorio del proyecto y ejecuta:
   ```bash
   npm install
5. **Iniciar el servidor**:
   Desde la terminal de VSC, ejecuta:
   ```bash
   nest start --watch

### **Front-end**
1. **Clonar el repositorio**:
   Descarga el código del front-end desde el siguiente enlace:
   - [Repositorio front-end](https://github.com/nattygd/EpiAmigo)
2. **Eliminar la carpeta node_modules**:
   Abre Git Bash en VSC, navega al directorio del proyecto y ejecuta:
   ```bash
   rm -rf node_modules
3. **Instalar dependencias**:
   Ejecuta el siguiente comando:
   ```bash
   npm install --legacy-peer-deps
4. **Configurar la IP para los servicios**:
   En el archivo config.ts, ubicado dentro de la carpeta app, ingresa tu dirección IP para conectar los servicios creados.
5. **Verificar conexión a la red Wi-Fi**:
   Asegúrate de que tu computador y tu dispositivo móvil estén conectados a la misma red Wi-Fi si vas a utilizar un dispositivo móvil.
6. **Iniciar el proyecto en Expo**:
   En la terminal de PowerShell de VSC, ejecuta:
   ```bash
   npm start
   ```
   Esto abrirá la interfaz de Expo.
7. **Autenticarse en Expo**:
   Se te solicitará ingresar tu correo o nombre de usuario y contraseña asociados a Expo Go.
   - [Link de expo go](https://expo.dev/go)
8. **Ejecutar la aplicación**:
   - En un dispositivo móvil: Escanea el código QR con la cámara para abrir la aplicación en Expo Go.
   - En un emulador de Android Studio: Selecciona un emulador en Android Studio y conecta el proyecto utilizando:
     ```bash
     shift + a

### **Repositorios del proyecto**
- Back-end: [Repositorio back-end](https://github.com/Fab14n14/epi-amigo)
- Front-end: [Repositorio front-end](https://github.com/nattygd/EpiAmigo)
