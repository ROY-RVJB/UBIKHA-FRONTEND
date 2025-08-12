import { useLocation } from 'react-router-dom';
import './WizardProgressIndicator.css';

interface Step {
  path: string;
  title: string;
  heading: string;
}

const steps: Step[] = [
  { path: '/step1', title: 'INICIO', heading: 'Describe tu espacio' },
  { path: '/step1/accommodation', title: 'Paso 1', heading: 'Tipo de alojamiento' },
  { path: '/step1/basic-info', title: 'Paso 1', heading: 'Información básica' },
  { path: '/step2', title: 'Paso 2', heading: 'Haz que destaque' },
  { path: '/step2/photos', title: 'Paso 2', heading: 'Agregar fotos' },
  { path: '/step2/title', title: 'Paso 2', heading: 'Título del inmueble' },
  { path: '/step2/description', title: 'Paso 2', heading: 'Descripción' },
  { path: '/step3', title: 'Paso 3', heading: 'Terminar y publicar' },
  { path: '/step3/price', title: 'Paso 3', heading: 'Configurar precio' }
];

export default function WizardProgressIndicator() {
  const location = useLocation();
  
  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  const currentStep = currentStepIndex >= 0 ? currentStepIndex : 0;
  const totalSteps = steps.length;
  
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}