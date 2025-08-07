import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterStepOne } from '../components/ui/RegisterStepOne/RegisterStepOne';
import { RegisterStepTwo } from '../components/ui/RegisterStepTwo/RegisterStepTwo';
import { RegisterStepThree } from '../components/ui/RegisterStepThree/RegisterStepThree';

/**
 * 🎯 REGISTRO MULTI-PASO
 * 
 * Página que maneja el flujo de registro en 3 pasos:
 * - Paso 1: Número de teléfono ✅
 * - Paso 2: Por definir ⏳
 * - Paso 3: Por definir ⏳
 */
function RegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Estado para almacenar todos los datos del formulario
  const [formData, setFormData] = useState({
    num_celular: '',
    verification_code: '', // Código de verificación del paso 2
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    email: '',
    password: ''
  });

  // Manejador para avanzar al siguiente paso
  const handleNextStep = (stepData: any) => {
    setFormData({ ...formData, ...stepData });
    setCurrentStep(currentStep + 1);
    
    // Log para debugging
    console.log('Datos actualizados:', { ...formData, ...stepData });
    console.log('Avanzando al paso:', currentStep + 1);
  };

  // Manejador para retroceder al paso anterior
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Manejador para volver al login (desde el paso 1)
  const handleBackToLogin = () => {
    navigate('/login');
  };

  // Manejador para el submit final (paso 3)
  const handleFinalSubmit = async (finalData: any) => {
    const completeData = { ...formData, ...finalData };
    
    console.log('Datos completos del registro:', completeData);
    
    // TODO: Llamar al servicio de registro cuando esté implementado
    // try {
    //   await authService.register(completeData);
    //   navigate('/login');
    // } catch (error) {
    //   console.error('Error en registro:', error);
    // }
    
    // Por ahora, solo navegamos al login
    alert('Registro completado (simulado). Datos en consola.');
    navigate('/home-arrendatario');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backgroundColor: '#f8fafc'
    }}>
      {currentStep === 1 && (
        <RegisterStepOne
          onNext={handleNextStep}
          onBack={handleBackToLogin}
          initialData={formData}
        />
      )}
      
      {currentStep === 2 && (
        <RegisterStepTwo
          onNext={handleNextStep}
          onBack={handlePrevStep}
          phoneNumber={formData.num_celular}
        />
      )}
      
      {currentStep === 3 && (
        <RegisterStepThree
          onSubmit={handleFinalSubmit}
          onBack={handlePrevStep}
          formData={formData}
        />
      )}
    </div>
  );
}

export default RegisterPage;
