# **JELLYJOBS**  
![logoSinFondo](https://github.com/user-attachments/assets/31c098e2-84cb-4fb1-ab4c-bd84031ed9e7)
**Bolsa de Trabajo Inmediata**  

---

## **DESCRIPCIÓN**  
JellyJobs es una aplicación web diseñada para conectar rápidamente a trabajadores con empresas que solicitan sus servicios.  

---
## **INSTALACIÓN**  

## **TECNOLOGIAS**  

![ss](https://github.com/user-attachments/assets/6760a433-bfda-4fc0-816b-f2ed2e47e810)

### **1. Clonar el Repositorio**  
Clona el repositorio con el siguiente comando:  

```bash
git clone https://github.com/JellyJobs/JellyJobs
```

### **2. Configuración del Backend**  
El backend está desarrollado en **Python (Django)**. Sigue estos pasos para ejecutarlo:

Navega al directorio del backend:

```bash
cd backend
```

Ejecuta el servidor de desarrollo:

```bash
python manage.py runserver
```

#### **Dependencias del Backend**  
Asegúrate de instalar las siguientes dependencias:

```bash
asgiref==3.8.1
certifi==2024.12.14
cloudinary==1.42.1
Django==5.1.2
django-cors-headers==4.5.0
djangorestframework==3.15.2
djangorestframework-simplejwt==5.3.1
pillow==11.0.0
psycopg2==2.9.10
PyJWT==2.9.0
six==1.17.0
sqlparse==0.5.1
tzdata==2024.2
urllib3==2.3.0
```

### **3. Configuración del Frontend**  
El frontend está desarrollado en **JavaScript (React)** con **Ant Design**. Sigue estos pasos para ejecutarlo:

Navega al directorio del frontend:

```bash
cd frontend
```

Inicializa el proyecto e instala las dependencias:

```bash
npm init -y
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

o

```bash
npm start
```

#### **Dependencias del Frontend**  
Las dependencias principales del frontend son:

```bash
@eslint/js@9.10.0
@testing-library/react@13.4.0
@testing-library/user-event@13.5.0
antd@5.20.3
axios@1.7.9
dayjs@1.11.13
eslint-plugin-react@7.36.1
eslint@8.57.0
globals@15.9.0
jsonwebtoken@^9.0.2 (UNMET DEPENDENCY)
jwt-decode@4.0.0
react-dom@18.3.1
react-router-dom@6.26.1
react-scripts@5.0.1
react@18.3.1
web-vitals@2.1.4
```

### **4. Entorno Virtual (Recomendado)**  
Para aislar las dependencias de **Python**, se recomienda utilizar un entorno virtual.

Instala virtualenv si no lo tienes:

```bash
pip install virtualenv
```

Crea un entorno virtual:

```bash
python -m venv venv
```

Activa el entorno virtual:

En **Windows**:

```bash
venv\Scripts\activate
```

En **macOS/Linux**:

```bash
source venv/bin/activate
```



