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
:root {
  color-scheme: dark;
  font-family: Inter, sans-serif;
}

html, body {
  margin: 0;
  min-height: 100%;
}

body {
  background: #050816;
}

.site-header {
  position: sticky;
}

.product-card {
  border-radius: 1.5rem;
}

.site-footer {
  padding: 2rem 0;
}

```

### 1.3 Criterio: Comentarios

Usar comentarios para dividir secciones del archivo CSS, por ejemplo:

```css
/* ===== HEADER ===== */
.site-header {
  position: sticky;
  top: 0;
}

/* ===== PRODUCTOS ===== */
.product-card {
  border-radius: 1.5rem;
}

/* ===== FOOTER ===== */
.site-footer {
  padding: 2rem 0;
}
```

## 2. Sintaxis y formato

### 2.1 Criterio: Sintaxis  

Usar correctamente `selector { propiedad: valor; }`, por ejemplo:

```css
.container {
  width: 100%;
  margin: 0 auto;
}
```

### 2.2 Criterio: Indentación 

2 o 4 espacios consistentes, por ejemplo:

```css
.hero-card {
  background: rgba(15, 23, 42, 0.95);
  border-radius: 2rem;
  padding: 2rem;
}
```

### 2.3 Criterio: Cierre de reglas  

Siempre cerrar con `;` y `}`, por ejemplo:

```css
.product-price {
  font-size: 1.7rem;
  font-weight: 700;
}
```

### 2.4 Criterio: Legibilidad 

Una propiedad por línea, por ejemplo:

```css
.feature-item {
  background: rgba(14, 23, 42, 0.9);
  border-radius: 1.25rem;
  padding: 1.5rem;
}
```

## 3. Uso de selectores

### 3.1 Criterio: Prioridad 

Preferir clases (.clase) sobre etiquetas o IDs, por ejemplo:

```css
.nav-links {
  display: flex;
  gap: 1.25rem;
}
```

### 3.2 Criterio: Nombres 

Descriptivos, en minúsculas y con guiones (`.menu-principal`), por ejemplo:

```css
.product-card {
  padding: 1.75rem;
}

.contact-card {
  border-radius: 1.75rem;
}
```

### 3.3 Criterio: Complejidad 

Evitar selectores anidados innecesarios, por ejemplo:

```css
/* Correcto */
.product-card h3 {
  margin: 0;
}

/* Evitar */
.section .product-grid .product-card .content h3 {
  margin: 0;
}
```

## 4. Uso de clases

### 4.1 Criterio: Claridad  

Usar clases que representen claramente la intención visual, por ejemplo:

```css
.primary-btn {
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  border-radius: 999px;
}
```

### 4.2 Criterio: Orden 

Mantener un orden lógico: `layout → espaciado → color → tipografía`, por ejemplo:

```css
.hero-card {
  display: flex;
  padding: 2rem;
  background: rgba(15, 23, 42, 0.95);
  color: #eef2ff;
  font-size: 1rem;
}
```
### 4.3 Criterio: Legibilidad 

Evitar listas desordenadas de clases, por ejemplo:

```css
/* Correcto */
.secondary-btn {
  color: #cbd5e1;
  border: 1px solid rgba(148, 163, 184, 0.32);
  padding: 0.9rem 1.5rem;
}

/* Evitar */
.btn2 {
  c: white;
  p: 10px;
}
```

## Referencias

* CSS | MDN. (n.d.). Retrieved May 14, 2026 from https://developer.mozilla.org/es/docs/Web/CSS
* All CSS specifications. (n.d.). Retrieved May 14, 2026 from https://www.w3.org/Style/CSS/specs.en.html
* Tailwind CSS - Rapidly build modern websites without ever leaving your HTML. (n.d.). Retrieved May 14, 2026 from https://tailwindcss.com/