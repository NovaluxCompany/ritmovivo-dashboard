# 🧩 **Historia de Usuario (HU) — Frontend CRUD de Cursos con Angular + Tailwind + Flowbite**

## **HU-002 — Implementar gestión completa de Cursos (Crear, Editar, Visualizar, Habilitar/Deshabilitar)**

### 🎯 **Como** desarrollador frontend

### 👤 **Quiero** construir completamente el CRUD de cursos en Angular usando **Tailwind + Flowbite**

### ✅ **Para que** el administrador pueda gestionar los cursos disponibles: crear nuevos, modificar existentes, ver todos en una tabla y habilitar/deshabilitar cursos según sea necesario.

---

# ✅ 1. Objetivo de la tarea

Construir **todo el lado frontend de la gestión de cursos**, incluyendo:

* UI visual de la tabla de cursos con **Tailwind + Flowbite**
* Modal reutilizable para crear y editar cursos
* Formulario reactivo con 13 campos + validaciones
* Funcionalidad de habilitar/deshabilitar cursos
* Integración con la API
* Diseño responsive (desktop y móvil)

---

# 📁 2. Estructura de archivos esperada

Dentro del proyecto Angular, crear:

```
src/
 ├── app/
 │   ├── modules/
 │   │   └── cursos/
 │   │       ├── components/
 │   │       │   ├── gestion-cursos/
 │   │       │   │   ├── gestion-cursos.component.ts
 │   │       │   │   ├── gestion-cursos.component.html
 │   │       │   │   └── gestion-cursos.component.scss
 │   │       │   └── modal-curso/
 │   │       │       ├── modal-curso.component.ts
 │   │       │       ├── modal-curso.component.html
 │   │       │       └── modal-curso.component.scss
 │   │       ├── models/
 │   │       │   └── curso.interface.ts
 │   │       ├── services/
 │   │       │   └── curso.service.ts
 │   │       └── cursos.module.ts
 │   └── shared/
 │       └── services/
 │           └── notificacion.service.ts
```

---

# 🎨 3. Diseño visual (UI) — **Obligatorio usar Flowbite + Tailwind**

### **3.1 Página principal (gestion-cursos.component.html)**

Elementos obligatorios:

* **Header** con título "Gestión de Cursos" y botón **"Nuevo Curso"** (azul)
* **Tabla responsive** de Flowbite con todas las columnas
* Versión **cards** para móviles
* **Modal** para crear/editar

Referencia de componentes Flowbite a usar:

* Table (responsive)
* Button (primary para "Nuevo Curso")
* Modal (para formulario)
* Badge (para estado y nivel)
* Input fields
* Select dropdowns
* Checkbox

### **3.2 Estructura de la tabla (Desktop)**

👉 La tabla debe verse así:

```
----------------------------------------------------------------------------------------
| Nombre          | Instructor    | Duración | Precio  | Día     | Hora  | Nivel    | Estado | Acciones           |
----------------------------------------------------------------------------------------
| Yoga Matutino   | María González| 60 min   | $150.00 | Lunes   | 07:00 | Princ.   | 🟢 Activo | Editar | Deshabilitar |
| CrossFit Avanz. | Carlos Pérez  | 90 min   | $250.00 | Miér.   | 18:00 | Avanz.   | 🟢 Activo | Editar | Deshabilitar |
| Pilates         | Ana Martínez  | 45 min   | $120.00 | Viernes | 09:00 | Inter.   | 🔴 Inactivo | Editar | Habilitar |
----------------------------------------------------------------------------------------
```

**Columnas obligatorias:**
1. Nombre
2. Instructor
3. Duración
4. Precio
5. Día
6. Hora
7. Nivel (con badge de color)
8. Estado (badge verde "Activo" o rojo "Inactivo")
9. Acciones (botones "Editar" y "Habilitar/Deshabilitar")


### **3.3 Versión móvil (Cards)**

Para pantallas pequeñas, mostrar cada curso como un card de Flowbite:

```
------------------------------------
| Yoga Matutino        🟢 Activo   |
|----------------------------------|
| Instructor: María González       |
| Día: Lunes - 07:00              |
| Precio: $150.00                  |
|                                  |
| [  Editar  ] [  Deshabilitar  ]  |
------------------------------------
```

---

# 📝 4. Modal del formulario (Crear/Editar curso)

### **4.1 Estructura del modal**

Usar el **componente Modal de Flowbite** con:

* **Header**: Título dinámico ("Nuevo Curso" o "Editar Curso") + botón cerrar (X)
* **Body**: Formulario en grid de 2 columnas
* **Footer**: Botones "Cancelar" y "Guardar Curso"

### **4.2 Campos del formulario (13 campos obligatorios)**

El formulario debe contener:

| # | Campo | Tipo | Validación | Placeholder/Opciones |
|---|-------|------|------------|---------------------|
| 1 | Nombre | Input text | Requerido | "Ej: Yoga Matutino" |
| 2 | Instructor | Input text | Requerido | "Ej: María González" |
| 3 | Duración | Input text | Requerido | "Ej: 60 minutos" |
| 4 | Precio | Input text | Requerido, >0 | "Ej: 150.00" |
| 5 | Color | Select | Requerido | Color picker |
| 6 | Día | Select | Requerido | Lunes a Domingo |
| 7 | Hora | Input time | Requerido | Selector de hora |
| 8 | Lugar | Select | Requerido | "Ej: Sala Principal" |
| 9 | Género | Input text | Requerido | Mixto, Femenino, Masculino |
| 10 | Nivel | Input text | Requerido | Principiante, Intermedio, Avanzado |
| 11 | 2x1 | Checkbox | No requerido | "Promoción 2x1" |
| 12 | Capacidad | Input number | Requerido, >0 | "Ej: 20" |
| 13 | FechaInicio | Input date | Requerido | Selector de fecha |

**Layout del formulario:**
- Grid de 2 columnas en desktop
- 1 columna en móvil
- Botones al final

---

# 🧠 5. Lógica en Angular

## 5.1 Interface del modelo (curso.interface.ts)

Crear interface con todas las propiedades:

```typescript
export interface Curso {
  id?: number;
  nombre: string;
  instructor: string;
  duracion: string;
  precio: number;
  color: string;
  dia: string;
  hora: string;
  lugar: string;
  genero: string;
  nivel: string;
  promo2x1: boolean;
  capacidad: number;
  fechaInicio: string;
  activo: boolean;
}
```

## 5.2 Servicio de cursos (curso.service.ts)

Crear los siguientes métodos que se conectarán con la API del backend:

### **Método 1: obtenerTodos()**
- Devuelve Observable con array de cursos
- Hacer petición GET al endpoint de la API
- Manejar respuesta y errores

### **Método 2: crear(curso: Curso)**
- Recibe objeto curso
- Hacer petición POST al endpoint de la API
- Retorna Observable del curso creado

### **Método 3: actualizar(id: number, curso: Curso)**
- Recibe ID y objeto curso
- Hacer petición PUT al endpoint de la API
- Retorna Observable del curso actualizado

### **Método 4: cambiarEstado(id: number)**
- Recibe ID del curso
- Hacer petición PATCH al endpoint de la API para cambiar el estado
- Retorna Observable del curso actualizado

**Importante:**
- Importar y usar HttpClient de Angular
- Configurar headers necesarios enviando el token
- Implementar manejo de errores con catchError de RxJS
- Todas las peticiones deben manejar estados de loading

---

## 5.3 Componente principal (gestion-cursos.component.ts)

### **Variables necesarias:**
- `cursos: Curso[]` → Array de cursos obtenidos de la API
- `cargando: boolean` → Para mostrar loader durante las peticiones

### **Métodos a implementar:**

#### **ngOnInit()**
- Llamar a `cargarCursos()`
- Suscribirse al servicio para obtener los cursos de la API

#### **cargarCursos()**
- Establecer `cargando = true`
- Llamar al método `obtenerTodos()` del servicio
- Suscribirse a la respuesta
- Actualizar variable `cursos` con los datos recibidos
- Establecer `cargando = false`
- Manejar errores y mostrar notificación si falla

#### **abrirModalNuevo()**
- Abrir modal con el componente "modal-curso.component.ts"
- Cambiar título a "Nuevo Curso"

#### **abrirModalEditar(curso: Curso)**
- Abrir modal con el componente "modal-curso.component.ts"
- Cargar datos del curso en formulario (usar `patchValue()`)
- Cambiar título a "Editar Curso"

#### **guardarCurso()**
- Validar formulario
- Establecer estado de loading
- Si es creación: 
  - Llamar `crear()` del servicio con los datos del formulario
  - Esperar respuesta de la API
  - Mostrar notificación de éxito
  - Recargar lista de cursos
- Si es edición: 
  - Llamar `actualizar()` del servicio con ID y datos del formulario
  - Esperar respuesta de la API
  - Mostrar notificación de éxito
  - Recargar lista de cursos
- Cerrar modal
- Manejar errores de la API y mostrar notificaciones de error

#### **toggleEstadoCurso(id: number)**
- Establecer estado de loading
- Llamar `cambiarEstado()` del servicio con el ID del curso
- Esperar respuesta de la API
- Mostrar notificación indicando el cambio ("Curso habilitado" o "Curso deshabilitado")
- Recargar lista de cursos para reflejar el nuevo estado
- Manejar errores de la API

---

## 5.4 Formulario reactivo

Usar **ReactiveFormsModule** con FormBuilder.

Crear FormGroup con todos los campos y sus validaciones:

**Validaciones obligatorias:**
- `nombre`: Requerido
- `instructor`: Requerido
- `duracion`: Requerido
- `precio`: Requerido + debe ser mayor a 0
- `color`: Requerido
- `dia`: Requerido
- `hora`: Requerido
- `lugar`: Requerido
- `genero`: Requerido
- `nivel`: Requerido
- `promo2x1`: Sin validación (es checkbox)
- `capacidad`: Requerido + debe ser mayor a 0
- `fechaInicio`: Requerido + no puede ser fecha pasada (solo en crear)

**Mostrar errores:**
- Debajo de cada campo con mensaje específico
- Aplicar clases de error de Flowbite (borde rojo)
- Deshabilitar botón "Guardar" si formulario es inválido

---

# 🔔 6. Sistema de notificaciones

Crear servicio `NotificacionService` o usar librería como `ngx-toastr`.

Tipos de notificaciones:

* ✅ **Éxito** (verde): "Curso creado exitosamente", "Curso actualizado exitosamente"
* ℹ️ **Info** (azul): "Curso habilitado", "Curso deshabilitado"
* ❌ **Error** (rojo): "Error al guardar curso", "Error de validación"

**Configuración:**
- Posición: Superior derecha
- Duración: 3 segundos
- Animación suave de entrada/salida

Usar en:
- Crear curso → Notificación de éxito
- Editar curso → Notificación de éxito
- Habilitar/Deshabilitar → Notificación de info
- Errores → Notificación de error

---

### **Configuración necesaria:**

**Headers HTTP:**
- Incluir token de autenticación en cada petición a la API.

**Manejo de errores:**
- Usar `catchError` de RxJS en cada petición
- Capturar errores HTTP (400, 401, 404, 500, etc.)
- Mostrar notificaciones específicas según el tipo de error

**Loading states:**
- Mostrar spinner mientras se hace la petición
- Deshabilitar botones durante la carga

---

# 📚 11. Recursos de referencia

* **Flowbite Angular**: https://flowbite.com/docs/getting-started/angular/
* **Flowbite Table**: https://flowbite.com/docs/components/tables/
* **Flowbite Modal**: https://flowbite.com/docs/components/modal/
* **Flowbite Forms**: https://flowbite.com/docs/components/forms/
* **Tailwind CSS**: https://tailwindcss.com/docs
* **Angular Reactive Forms**: https://angular.io/guide/reactive-forms

---

**¡Mucho éxito con la implementación! 🚀**