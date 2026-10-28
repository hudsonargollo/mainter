import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { useEffect, useState } from 'react';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/v2',
  component: IntakeFormV2,
});

// Form steps
const STEPS = [
  {
    id: 'welcome',
    title: 'Bienvenido a Mainter',
    description: 'Te ayudamos a registrar tu información. Empezaremos con tus datos personales.',
  },
  {
    id: 'fullName',
    title: '¿Cuál es tu nombre completo?',
    field: { name: 'fullName', label: 'Nombre completo', type: 'text' as const, required: true },
  },
  {
    id: 'company',
    title: '¿Tienes empresa?',
    description: 'Puedes agregar información de tu empresa si aplica.',
    field: { name: 'company', label: 'Nombre de la empresa', type: 'text' as const, required: false },
  },
  {
    id: 'phone',
    title: '¿Cuál es tu teléfono?',
    field: { name: 'phone', label: 'Número de teléfono', type: 'text' as const, required: true },
  },
  {
    id: 'email',
    title: '¿Tienes email?',
    description: 'Opcional, pero útil para recibir actualizaciones.',
    field: { name: 'email', label: 'Correo electrónico', type: 'email' as const, required: false },
  },
  {
    id: 'department',
    title: '¿En qué departamento estás?',
    field: { name: 'department', label: 'Departamento', type: 'text' as const, required: true },
  },
  {
    id: 'municipality',
    title: '¿En qué municipio estás?',
    field: { name: 'municipality', label: 'Municipio', type: 'text' as const, required: true },
  },
  {
    id: 'hectares',
    title: '¿Cuántos hectáreas manejas?',
    field: { name: 'hectares', label: 'Hectáreas', type: 'number' as const, required: false },
  },
  {
    id: 'crops',
    title: '¿Qué cultivos produce tu finca?',
    description: 'Agrega cada cultivo. Usa la tecla Enter para añadir uno nuevo.',
    field: { name: 'crops', label: 'Cultivos', type: 'crops' as const, required: false },
  },
  {
    id: 'contact',
    title: '¿Cómo prefieres ser contactado?',
    field: { name: 'contactChannel', label: 'Canal de contacto', type: 'single_choice' as const, required: true, options: ['WhatsApp', 'Teléfono', 'Email', 'Presencial'] },
  },
  {
    id: 'salesman',
    title: '¿Tienes un vendedor asignado?',
    description: 'Si ya tienes un comercial asignado, selecciónalo.',
    field: { name: 'salesmanId', label: 'Vendedor', type: 'text' as const, required: false },
  },
  {
    id: 'review',
    title: 'Revisa tus datos',
    review: true,
  },
];

interface FormData {
  [key: string]: any;
}

export interface Salesman {
  id: string;
  name: string;
  active?: boolean;
}

async function fetchSalesmen(): Promise<Salesman[]> {
  try {
    const response = await fetch('/api/salesmen');
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error('Error loading salesmen:', error);
  }
  return [];
}

export default function IntakeFormV2() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [activeSalesmen, setActiveSalesmen] = useState<Salesman[]>([]);

  // Load salesmen for the conditional field
  useEffect(() => {
    fetchSalesmen().then(data => {
      setActiveSalesmen(data.filter(s => s.active !== false));
    });
  }, []);

  const currentStepData = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: 'intake-v2',
          data: formData,
          status: 'new',
        }),
      });
      
      if (response.ok) {
        setShowCongrats(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSalesmanOptions = () => {
    const step = currentStepData.field;
    if (!step) return [];
    if (step.name !== 'salesmanId') {
      return step.options || [];
    }
    return ['Nadie asignado', ...activeSalesmen.map(s => s.name)];
  };

  const getCropsInput = () => {
    const existing = formData.crops || [];
    return existing.map((value: string, idx: number) => (
      <div key={idx} className="crop-tag">
        <span className="crop-tag-text">{value}</span>
        <button 
          type="button" 
          className="crop-tag-remove"
          onClick={() => removeCrop(idx)}
          aria-label={`Eliminar ${value}`}
        >
          ✕
        </button>
      </div>
    ));
  };

  const addCrop = (value: string) => {
    if (!value.trim()) return;
    const trimmed = value.trim();
    const existing = formData.crops || [];
    if (existing.includes(trimmed)) return;
    setFormData(prev => ({ ...prev, crops: [...(prev.crops || []), trimmed] }));
  };

  const removeCrop = (index: number) => {
    setFormData(prev => ({
      ...prev,
      crops: prev.crops.filter((_: unknown, i: number) => i !== index),
    }));
  };

  const renderStep = () => {
    if (showCongrats) {
      return (
        <div className="congratulations">
          <div className="congratulations-content">
            <img src="/logomainter.png" alt="Mainter" className="congratulations-logo" />
            <h2>¡Gracias por completar el registro!</h2>
            <p>Nuestro equipo se pondrá en contacto contigo pronto.</p>
            <button className="button primary" onClick={() => {
              setCurrentStep(0);
              setFormData({});
              setShowCongrats(false);
            }}>
              Registrar otro
            </button>
          </div>
        </div>
      );
    }

    if (currentStepData.review) {
      return (
        <div className="review-container">
          <h3>Revisa tus datos</h3>
          <div className="review-grid">
            {STEPS.slice(0, -2).map((step) => {
              const field = step.field;
              if (!field) return null;
              const value = formData[field.name];
              return value ? (
                <div key={step.id} className="review-item">
                  <span className="review-label">{field.label}:</span>
                  <span className="review-value">{value}</span>
                </div>
              ) : null;
            })}
          </div>
          <div className="review-actions">
            <button className="button secondary" onClick={handleBack}>
              Anterior
            </button>
            <button className="button" onClick={handleSubmit}>
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </div>
      );
    }

    if (!currentStepData.field) {
      return (
        <div className="welcome-screen">
          <h3>{currentStepData.title}</h3>
          <p>{currentStepData.description}</p>
          <button className="button" onClick={handleNext}>
            Comenzar
          </button>
        </div>
      );
    }

    const step = currentStepData.field;

    return (
      <div className="step-container">
        <div className="step-header">
          <div className="step-number">{currentStep + 1} de {STEPS.length}</div>
          <h3>{currentStepData.title}</h3>
          {currentStepData.description && (
            <p className="step-description">{currentStepData.description}</p>
          )}
        </div>

        <div className="field-container">
          {step.type === 'single_choice' && (
            <div className="choice-group">
              {getSalesmanOptions().map((option, idx) => (
                <label key={idx} className="choice-option">
                  <input
                    type="radio"
                    name={step.name}
                    value={option}
                    checked={formData[step.name] === option}
                    onChange={(e) => handleInputChange(step.name, e.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
          
          {step.type !== 'single_choice' && (
            <div className="generic-input-container">
              {step.type === 'crops' && (
                <>
                  <div className="crop-input-wrapper">
                    <input
                      type="text"
                      placeholder="Escribe un cultivo y presiona Enter"
                      value={formData.cropsInput || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, cropsInput: e.target.value }))}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter' && formData.cropsInput) {
                          addCrop(formData.cropsInput);
                          setFormData(prev => ({ ...prev, cropsInput: '' }));
                        }
                      }}
                      className="intake-input crop-input"
                    />
                    <button 
                      type="button" 
                      className="button add-crop-button"
                      onClick={() => addCrop(formData.cropsInput)}
                    >
                      + Añadir
                    </button>
                  </div>
                  <div className="crop-tags">
                    {getCropsInput() || <span className="crop-tags-empty">Sin cultivos agregados</span>}
                  </div>
                </>
              )}
              
              {step.type !== 'crops' && (
                <input
                  type="text"
                  name={step.name}
                  value={formData[step.name] || ''}
                  onChange={(e) => handleInputChange(step.name, e.target.value)}
                  className="intake-input"
                  placeholder={step.label}
                  required={step.required}
                />
              )}
            </div>
          )}
        </div>

        <div className="step-navigation">
          {currentStep > 0 && (
            <button className="button secondary" onClick={handleBack}>
              Anterior
            </button>
          )}
          <button className="button" onClick={handleNext}>
            {isLastStep ? 'Enviar' : 'Siguiente'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="intake-v2-container">
      <div className="intake-v2-header">
        <div className="intake-logo-wrapper">
          <img src="/logomainter.png" alt="Mainter" className="intake-logo" />
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="intake-v2-content">
        {renderStep()}
      </div>
    </div>
  );
}