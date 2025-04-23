# Frontend Tareas - Aplicación de Gestión de Tareas

Una aplicación moderna de gestión de tareas construida con Angular 17 y Tailwind CSS. Esta aplicación permite a los usuarios gestionar sus tareas diarias con una interfaz limpia y responsive.

## 🚀 Características

- ✨ Interfaz moderna y responsive con Tailwind CSS
- 📝 Operaciones CRUD completas para tareas
- ✅ Validación de formularios en tiempo real
- 🔄 Estado de carga y manejo de errores
- 🎨 Diseño intuitivo y fácil de usar
- 🔍 Feedback visual para todas las acciones
- 📱 Diseño mobile-first

## 🛠️ Tecnologías Utilizadas

- **Angular 17**: Framework frontend principal
- **Tailwind CSS**: Framework de utilidades CSS
- **RxJS**: Manejo de operaciones asíncronas
- **TypeScript**: Lenguaje de programación tipado
- **Angular Forms**: Manejo de formularios reactivos

## 📋 Prerrequisitos

- Node.js (v18 o superior)
- npm (v9 o superior)
- Angular CLI (v17 o superior)
- Backend API corriendo en `http://localhost:3000`

## 🔧 Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd frontend-tareas
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   ng serve
   ```

4. Abrir el navegador en `http://localhost:4200`

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   └── task-list/          # Componente principal de tareas
│   ├── models/
│   │   └── task.ts             # Interfaz de Tarea
│   ├── services/
│   │   └── task.service.ts     # Servicio de comunicación con API
│   ├── app.component.ts        # Componente raíz
│   └── app.config.ts           # Configuración de la aplicación
├── assets/                     # Recursos estáticos
└── styles.css                  # Estilos globales y configuración Tailwind
```

## 🔌 Comunicación con el Backend

La aplicación se comunica con un backend REST API que debe estar corriendo en `http://localhost:3000`. Los endpoints utilizados son:

- `GET /tasks`: Obtener todas las tareas
- `POST /tasks`: Crear una nueva tarea
- `PUT /tasks/:id`: Actualizar una tarea existente
- `DELETE /tasks/:id`: Eliminar una tarea

## 🎨 Estilos y Diseño

El proyecto utiliza Tailwind CSS para los estilos, proporcionando:

- Diseño responsive
- Temas consistentes
- Componentes modernos
- Transiciones y animaciones suaves
- Estados interactivos (hover, focus, active)

## 🧪 Testing

Para ejecutar las pruebas unitarias:

```bash
ng test
```

Para ejecutar las pruebas end-to-end:

```bash
ng e2e
```

## 📚 Documentación

La documentación del código sigue las mejores prácticas de JSDoc y está disponible en los siguientes archivos principales:

- `task.service.ts`: Documentación del servicio de tareas
- `task-list.component.ts`: Documentación del componente principal
- `task.ts`: Documentación de la interfaz de datos

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## ✍️ Autores

- Fabián Rivera - *Desarrollo Inicial* - [TuUsuario](https://github.com/frakxman)

## 🎉 Agradecimientos

- Angular Team por el excelente framework
- Tailwind CSS por el sistema de utilidades
- Todos los contribuidores que ayudaron a mejorar este proyecto
