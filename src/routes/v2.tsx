import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/v2',
  component: IntakeFormV2,
});

// Form sections with questions
const SECTIONS = [
  {
    id: 'biografia',
    title: 'Biografía',
    description: 'Conoce más sobre quién es el dueño de la propiedad.',
    questions: [
      { id: 'fullName', label: '¿Cuál es su nombre completo?', type: 'text', required: true },
      { id: 'age', label: '¿Qué edad tiene?', type: 'text', required: true },
      { id: 'estadoCivil', label: '¿Cuál es su estado civil (soltero o casado)?', type: 'single_choice', required: true, options: ['Soltero', 'Casado', 'Divorciado', 'Viudo', 'Unión libre'] },
      { id: 'tieneHijos', label: '¿Tiene hijos?', type: 'single_choice', required: true, options: ['Sí', 'No'] },
      { id: 'cantidadHijos', label: '¿Cuántos hijos tiene?', type: 'text', required: false },
      { id: 'edadesHijos', label: '¿Qué edades tienen?', type: 'text', required: false },
      { id: 'fechasNacimientoHijos', label: '¿Cuáles son sus fechas de nacimiento?', type: 'text', required: false },
      { id: 'fechaBoda', label: '¿Cuándo es su aniversario de bodas?', type: 'text', required: false },
      { id: 'tieneNietos', label: '¿Tiene nietos?', type: 'single_choice', required: false, options: ['Sí', 'No'] },
      { id: 'cantidadNietos', label: '¿Cuántos y de qué edades?', type: 'text', required: false },
      { id: 'origen', label: '¿De qué ciudad o región es originario? ¿Dónde creció?', type: 'text', required: true },
      { id: 'tieneTrabajaEnCampo', label: '¿Trabaja solo o con su familia en el campo?', type: 'single_choice', required: true, options: ['Solo', 'Con familia', 'Con staff'] },
    ],
  },
  {
    id: 'familia',
    title: 'Familia y Orígenes',
    description: 'La historia familiar es fundamental para entender su patrimonio.',
    questions: [
      { id: 'fechaNacimientoMadre', label: '¿Cuál es la fecha de nacimiento de su madre?', type: 'text', required: false },
      { id: 'fechaNacimientoPadre', label: '¿Cuál es la fecha de nacimiento de su padre?', type: 'text', required: false },
      { id: 'tieneTradicionFamilia', label: '¿Tiene alguna tradición familiar sagrada (por ejemplo, el churrasco familiar de los domingos, viajes de fin de año, etc.)?', type: 'single_choice', required: false, options: ['Sí', 'No'] },
    ],
  },
  {
    id: 'gustos',
    title: 'Gustos, Aficiones y Estilo de Vida',
    description: 'Conoce sus preferencias y hábitos de vida.',
    questions: [
      { id: 'comidaFavorita', label: '¿Cuál es su comida favorita?', type: 'text', required: false },
      { id: 'leGustaFutbol', label: '¿Le gusta el fútbol? Si es así, ¿cuál es su equipo favorito?', type: 'text', required: false },
      { id: 'otroDeporte', label: 'Aparte del fútbol, ¿sigue o practica algún otro deporte (carreras de autos, tenis, caballos, caza, pesca)?', type: 'text', required: false },
      { id: 'musicaFavorita', label: '¿Qué tipo de música le gusta escuchar cuando maneja hacia el campo o mientras trabaja?', type: 'text', required: false },
      { id: 'bebidaFavorita', label: '¿Cuál es su bebida favorita para relajarse o acompañar una buena comida (vino, cerveza, café, mate, etc.)?', type: 'text', required: false },
      { id: 'leGustoCocinar', label: '¿Le gusta cocinar o es usted el encargado de hacer el churrasco en los eventos familiares?', type: 'single_choice', required: false, options: ['Sí', 'No', 'A veces'] },
      { id: 'restauranteFavorito', label: 'Cuando sale a comer con su familia, ¿cuál es su restaurante favorito o qué tipo de ambiente prefiere?', type: 'text', required: false },
      { id: 'viajePlaya', label: 'Cuando viaja por placer, ¿qué tipo de destino prefiere (playa, campo, ciudad, montaña)?', type: 'text', required: false },
      { id: 'tieneMascotas', label: '¿Tiene mascotas o animales a los que les tenga especial cariño en la propiedad (perros, caballos, etc.)?', type: 'text', required: false },
      { id: 'tieneSociedad', label: '¿Pertenece a alguna fraternidad, club social o asociación ganadrera/agrícola donde pase su tiempo libre?', type: 'text', required: false },
    ],
  },
  {
    id: 'rutina',
    title: 'Rutina, Personalidad y Vínculo con el Campo',
    description: 'Comprende cómo funciona su día a día y qué le motiva.',
    questions: [
      { id: 'madruga', label: '¿Es de los que madrugan mucho o prefiere arrancar su día de trabajo un poco más tarde?', type: 'single_choice', required: true, options: ['Madruga', 'Tarde', 'Mixto'] },
      { id: 'loQueMasDisfruta', label: '¿Qué es lo que más disfruta de su vida trabajando en el campo?', type: 'text', required: true },
      { id: 'comoEmenzo', label: '¿Cómo empezó en el rubro agrícola? (¿Heredó la tierra, la compró, empezó desde cero?)', type: 'text', required: true },
      { id: 'cultivoFavorito', label: 'De todos los cultivos que maneja, ¿cuál es su favorito o el que más le apasiona trabajar?', type: 'text', required: false },
      { id: 'loQueRelaja', label: '¿Qué es lo que más le relaja hacer cuando está muy estresado por una campaña difícil?', type: 'text', required: false },
      { id: 'logroPropio', label: '¿Qué logro personal o familiar le da más orgullo de todo lo que ha construido hasta ahora?', type: 'text', required: false },
    ],
  },
  {
    id: 'adn',
    title: 'Relación con el Asesor de Negocios (ADN)',
    description: 'Acompañamiento y comunicación para el éxito de su operación.',
    questions: [
      { id: 'horarioVisita', label: '¿En qué horario prefiere que el ADN lo visite en su propiedad (por la mañana temprano, al mediodía, por la tarde)?', type: 'single_choice', required: true, options: ['Mañana temprano', 'Al mediodía', 'Por la tarde', 'Flexible'] },
      { id: 'comunicacionPreferida', label: '¿Cómo prefiere que se comuniquen con usted (llamada directa, mensaje de WhatsApp, audios)?', type: 'single_choice', required: true, options: ['Llamada directa', 'WhatsApp', 'Audios', 'Correo electrónico'] },
      { id: 'temaFavorito', label: 'Además del trabajo, ¿cuál es el tema del que más le gusta hablar o debatir con su ADN?', type: 'text', required: false },
      { id: 'anecdotaADN', label: '¿Tienen alguna anécdota divertida, un susto o un buen recuerdo que haya vivido junto a su ADN en el campo?', type: 'text', required: false },
    ],
  },
];

export interface FormData {
  [key: string]: any;
}

export interface Salesmen {
  id: string;
  name: string;
  active?: boolean;
}

async function fetchSalesmen(): Promise<Salesmen[]> {
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
  const [activeSalesmen, setActiveSalesmen] = useState<Salesmen[]>([]);
  const [hoveredQuestion, setHoveredQuestion] = useState<string | null>(null);

  useEffect(() => {
    fetchSalesmen().then(data => {
      setActiveSalesmen(data.filter(s => s.active !== false));
    });
  }, []);

  const currentSection = SECTIONS[currentStep];
  const isLastSection = currentStep === SECTIONS.length - 1;

  const answeredCount = currentSection?.questions.filter(q => {
    const val = formData[q.id];
    return val !== undefined && val !== '';
  }).length || 0;

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (isLastSection) {
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

  const renderQuestion = (question: typeof currentSection.questions[0]) => {
    const value = formData[question.id];
    const isSingleChoice = question.type === 'single_choice';
    const isCrops = question.type === 'crops';

    if (isSingleChoice) {
      return (
        <div className="choice-group">
          {question.options?.map((option: string) => {
            const isAnswered = value === option;
            const isBadAnswer = question.id === 'estadoCivil' ? option === 'Unión libre' : false;

            return (
              <label
                key={option}
                className={`choice-option ${isBadAnswer ? 'choice-option--bad' : ''}`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={isAnswered}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                />
                <span className="choice-option-text">{option}</span>
              </label>
            );
          })}
        </div>
      );
    }

    if (isCrops) {
      const crops = formData[question.id] || [];
      return (
        <div className="crop-input-wrapper">
          <input
            type="text"
            placeholder="Escribe un cultivo y presiona Enter"
            value={(formData[question.id + 'Input'] || '')}
            onChange={(e) => setFormData(prev => ({ ...prev, [question.id + 'Input']: e.target.value }))}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && (formData[question.id + 'Input'] || '').trim()) {
                const val = (formData[question.id + 'Input'] || '').trim();
                if (!crops.includes(val)) {
                  setFormData(prev => ({ ...prev, [question.id]: [...(prev[question.id] || []), val] }));
                  setFormData(prev => ({ ...prev, [question.id + 'Input']: '' }));
                }
              }
            }}
            className="intake-input crop-input"
          />
          <button
            type="button"
            className="button add-crop-button"
            onClick={() => {
              const val = (formData[question.id + 'Input'] || '').trim();
              if (val && !crops.includes(val)) {
                setFormData(prev => ({ ...prev, [question.id]: [...(prev[question.id] || []), val] }));
                setFormData(prev => ({ ...prev, [question.id + 'Input']: '' }));
              }
            }}
          >
            + Añadir
          </button>
          <div className="crop-tags">
            {crops.map((crop: string, idx: number) => (
              <div key={idx} className="crop-tag">
                <span className="crop-tag-text">{crop}</span>
                <button
                  type="button"
                  className="crop-tag-remove"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      [question.id]: prev[question.id].filter((_: unknown, i: number) => i !== idx),
                    }));
                  }}
                  aria-label={`Eliminar ${crop}`}
                >
                  ✕
                </button>
              </div>
            )) || <span className="crop-tags-empty">Sin cultivos agregados</span>}
          </div>
        </div>
      );
    }

    return (
      <input
        type="text"
        name={question.id}
        value={value || ''}
        onChange={(e) => handleInputChange(question.id, e.target.value)}
        className="intake-input"
        placeholder={question.label}
        required={question.required}
      />
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
            style={{ width: `${(currentStep / (SECTIONS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="intake-v2-content">
        {showCongrats ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="congratulations"
          >
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
          </motion.div>
        ) : (
          <>
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="step-container"
            >
              <div className="step-header">
                <div className="step-number">
                  <div className="section-label">{currentSection.title}</div>
                  <div className="step-divider">|</div>
                  <div>{currentStep + 1} de {SECTIONS.length}</div>
                </div>
                <h3>{currentSection.title}</h3>
                <p className="step-description">{currentSection.description}</p>

                <div className="progress-info">
                  {answeredCount} de {currentSection!.questions.length} respondidas
                  <div className="progress-bar-small">
                    <div
                      className="progress-fill-small"
                      style={{ width: `${(answeredCount / currentSection!.questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="question-container">
                {currentSection!.questions.map((question, idx) => (
                  <motion.div
                    key={question.id}
                    initial={{
                      opacity: 0,
                      y: 16,
                      width: 'calc(100% - 32px)',
                      marginLeft: '16px',
                    }}
                    animate={{ opacity: 1, y: 0, width: 'calc(100% - 16px)', marginLeft: '8px' }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: idx * 0.08,
                    }}
                    onHoverStart={() => setHoveredQuestion(question.id)}
                    onHoverEnd={() => setHoveredQuestion(null)}
                    className="question-item"
                  >
                    <div className="question-number">{idx + 1}.o</div>
                    <div className="question-text">{question.label}</div>
                    {renderQuestion(question)}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="step-navigation"
              >
                <button className="button secondary" onClick={handleBack}>
                  Anterior
                </button>
                <button className="button" onClick={handleNext}>
                  {isLastSection ? 'Enviar' : 'Siguiente'}
                </button>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
