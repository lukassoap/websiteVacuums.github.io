# Estándar de Codificación CSS

## Propósito

Este documento establece un conjunto de buenas prácticas para la escritura de estilos en CSS, integrando tanto CSS tradicional como el uso de Tailwind CSS. Su objetivo es garantizar código legible, mantenible, consistente y escalable en proyectos web.

---

## 1. Organización y estructura

### 1.1 Criterio: Estructura del proyecto

Separar estilos en archivos `.css` cuando se use CSS tradicional, por ejemplo:

En la carpeta `stylesheets`, el archivo `style.css`, contiene las reglas CSS del sitio web.

### 1.2 Criterio: Orden del código

Definir primero estilos globales (`body`, `html`), luego componentes (`header`, `nav`, `cards`, `footer`), por ejemplo:

```css

```

### 1.3 Criterio: Comentarios

Usar comentarios para dividir secciones del archivo CSS, por ejemplo:

```css

```

## 2. Sintaxis y formato

### 2.1 Criterio: Sintaxis  

Usar correctamente `selector { propiedad: valor; }`, por ejemplo:

```css

```

### 2.2 Criterio: Indentación 

2 o 4 espacios consistentes, por ejemplo:

```css

```

### 2.3 Criterio: Cierre de reglas  

Siempre cerrar con `;` y `}`, por ejemplo:

```css

```

### 2.4 Criterio: Legibilidad 

Una propiedad por línea, por ejemplo:

```css

```

## 3. Uso de selectores

### 3.1 Criterio: Prioridad 

Preferir clases (.clase) sobre etiquetas o IDs, por ejemplo:

```css

```

### 3.2 Criterio: Nombres 

Descriptivos, en minúsculas y con guiones (`.menu-principal`), por ejemplo:

```css

```

### 3.3 Criterio: Complejidad 

Evitar selectores anidados innecesarios, por ejemplo:

```css

```

## 4. Uso de clases

### 4.1 Criterio: Claridad  

Usar clases que representen claramente la intención visual, por ejemplo:

```css

```

### 4.2 Criterio: Orden 

Mantener un orden lógico: `layout → espaciado → color → tipografía`, por ejemplo:

```css

```
### 4.3 Criterio: Legibilidad 

Evitar listas desordenadas de clases, por ejemplo:

```css

```

## Referencias

* CSS | MDN. (n.d.). Retrieved May 14, 2026 from https://developer.mozilla.org/es/docs/Web/CSS
* All CSS specifications. (n.d.). Retrieved May 14, 2026 from https://www.w3.org/Style/CSS/specs.en.html
* Tailwind CSS - Rapidly build modern websites without ever leaving your HTML. (n.d.). Retrieved May 14, 2026 from https://tailwindcss.com/