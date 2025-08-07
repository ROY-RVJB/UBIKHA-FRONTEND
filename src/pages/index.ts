// Pages
export { default as HomePage } from './HomePage';
export { default as LoginPage } from './LoginPage';  // ✅ Nueva página universal
export { default as RegisterPage } from './RegisterPage';  // ✅ Nueva página de registro
export { default as HomePageArrendador } from './HomePageArrendador';
export { default as MisAnunciosPage } from './MisAnunciosPage';  // ✅ Nueva página de anunciosz
export { default as MisMensajesPage} from './MisMensajesPage';  // ✅ Nueva página de anunciosz

// ❌ DEPRECATED - Eliminadas páginas de login específicas:
// - LoginArrendadorPage (reemplazada por LoginPage)
// - LoginArrendatarioPage (reemplazada por LoginPage) 
// - LoginAdministradorPage (reemplazada por LoginPage)
