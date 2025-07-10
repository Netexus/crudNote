/*
 * Sistema de Enrutamiento SPA para CrudNote
 * 
 * Para usar el enrutamiento en otros archivos JavaScript:
 * 
 * 1. Importar las funciones necesarias:
 *    import { router } from "./routes";
 * 
 * 2. Para redirigir a una ruta:
 *    window.location.hash = "nombre-de-la-ruta";
 *    router();
 * 
 * 3. Para navegar a una ruta específica:
 *    // Ejemplo: Navegar al dashboard
 *    window.location.hash = "dashboard";
 *    router();
 * 
 * Notas importantes:
 * - Las rutas están definidas en el objeto 'routes' al inicio del archivo
 * - Los componentes deben estar en la ruta especificada en 'component'
 * - Los títulos de las páginas se actualizan automáticamente según la ruta
 * - El manejo de errores está implementado con la página 404
 */

// Definición de rutas y sus componentes correspondientes
const routes = {
  '': { component: './src/components/Home/Home.html', title: 'CrudNote - Home' },
  'login': { component: './src/components/login/Login.html', title: 'CrudNote - Login' },
  'register': { component: './src/components/register/Register.html', title: 'CrudNote - Register' },
  'contact': { component: './src/components/Contact/Contact.html', title: 'CrudNote - Contact' },
  'terms': { component: './src/components/Terms/Terms.html', title: 'CrudNote - Terms' },
  'about': { component: './src/components/About/About.html', title: 'CrudNote - About' },
  'notes': { component: './src/components/Notes/Notes.html', title: 'CrudNote - My Notes' },
  'dashboard': { component: './src/components/dashboard/Dashboard.html', title: 'CrudNote - Dashboard' },
  '404': { component: './src/components/NotFound/NotFound.html', title: 'CrudNote - Page Not Found' }
};

// Función que carga el componente y actualiza el título
export async function loadComponent(route) {
  try {
    const routeData = routes[route] || routes['404'];
    
    // Actualizar el título de la página
    document.title = routeData.title;
    
    // Cargar el componente
    const response = await fetch(routeData.component);
    if (!response.ok) {
      throw new Error('Failed to load component');
    }
    
    const html = await response.text();
    
    // Actualizar el contenido
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = html;
      
      // Ejecutar el código JavaScript del componente cargado
      const scripts = appContainer.getElementsByTagName('script');
      Array.from(scripts).forEach(script => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        script.type = script.type || 'text/javascript';
        script.parentNode.replaceChild(newScript, script);
      });
    }
  } catch (error) {
    console.error('Error loading component:', error);
    // Si hay un error, cargar la página de error 404
    loadComponent('404');
  }
}

// Manejador de enrutamiento
export function router() {
  console.log('Router ejecutándose');
  console.log('Hash actual:', window.location.hash);
  
  // Obtener el hash de la URL (sin el #), o '' si está vacío
  const hash = window.location.hash.slice(1) || '';
  
  // Cargar el componente correspondiente
  loadComponent(hash);
}

// Prevenir el comportamiento por defecto de los enlaces
export function preventDefaultLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = e.currentTarget.getAttribute('href').slice(1);
      window.location.hash = hash;
      router();
    });
  });
}

// Inicializar el enrutamiento
export function initRouter() {
  // Manejar cambios en el hash
  window.addEventListener('hashchange', router);
  
  // Manejar el click en enlaces
  preventDefaultLinks();
  
  // Cargar el componente inicial
  router();
}

// Iniciar el router cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initRouter);
