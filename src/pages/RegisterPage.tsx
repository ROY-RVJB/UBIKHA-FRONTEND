import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterStepOne } from '../components/ui/RegisterStepOne/RegisterStepOne';
import { RegisterStepTwo } from '../components/ui/RegisterStepTwo/RegisterStepTwo';
import { RegisterStepThree } from '../components/ui/RegisterStepThree/RegisterStepThree';
import { authService } from '../services/authService';

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
    apellido_paterno: '',
    apellido_materno: '',
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
  const handleFinalSubmit = (finalData: any) => {
    const completeData = { ...formData, ...finalData };
    
    console.log('Datos completos del registro:', completeData);
    
    // Verificar que el número haya sido verificado (debe tener verification_code del paso 2)
    if (!completeData.verification_code) {
      alert('Error: El número de teléfono debe ser verificado antes de continuar');
      setCurrentStep(2); // Regresar al paso 2
      return;
    }
    
    // Preparar datos para el endpoint WhatsApp (sin verification_code)
    const registrationData = {
      email: completeData.email,
      nombres: completeData.nombres,
      apellido_paterno: completeData.apellido_paterno,
      apellido_materno: completeData.apellido_materno,
      num_celular: completeData.num_celular,
      fecha_nacimiento: completeData.fecha_nacimiento,
      password: completeData.password
    };

    console.log('🔍 Estado de verificación:', {
      teléfono: completeData.num_celular,
      códigoVerificado: !!completeData.verification_code,
      código: completeData.verification_code ? '[VERIFICADO]' : '[NO VERIFICADO]'
    });

    // Llamar al API de registro WhatsApp
    authService.completeWhatsAppRegistration(registrationData)
      .then((result) => {
        console.log('Registro WhatsApp exitoso:', result);
        alert(`¡Registro completado exitosamente! ${result.message}`);
        navigate('/home-arrendatario');
      })
      .catch((error: any) => {
        console.error('❌ Error completo en registro WhatsApp:', error);
        console.error('❌ Mensaje del error:', error.message);
        console.error('❌ Stack del error:', error.stack);
        console.error('❌ Datos que se intentaron enviar:', registrationData);
        
        let userMessage = 'Error en el registro';
        
        if (error.message.includes('Status: 500')) {
          userMessage = `Error del servidor (500): Posibles causas:
• El email ${registrationData.email} ya está registrado
• El teléfono ${registrationData.num_celular} ya existe en el sistema
• Problema temporal del servidor
• La verificación de WhatsApp pudo haber expirado

Por favor intenta con un email diferente o contacta al administrador.`;
        } else if (error.message.includes('timeout') || error.message.includes('tardó demasiado')) {
          userMessage = 'La conexión tardó demasiado. Verifica tu internet e intenta nuevamente.';
        } else {
          userMessage = `Error en el registro: ${error.message || 'Error desconocido'}`;
        }
        
        alert(userMessage);
      });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backgroundColor: 'var(--color-bg)'
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
