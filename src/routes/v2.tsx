import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import ConversationalFormShell from '~/components/conversational/ConversationalFormShell';
import { Step } from '~/hooks/useConversationalForm';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/v2',
  component: IntakeFormV2,
});

// ======================== FORM SCHEMA ========================
// Full question list with photo field, slider, crops (multi-add), all questions

const STEPS: Step[] = [
  // ======================== INTRO / BIOGRAFÍA ========================
  {
    id: 'intro',
    question: 'Biografía — conoce al dueño de la propiedad',
    subtitle: 'Primeros datos para iniciar el registro',
    type: 'text',
    illustrationKey: 'biografia',
    required: true,
  },
  {
    id: 'fullName',
    question: '¿Cuál es su nombre completo?',
    type: 'text',
    illustrationKey: 'nombre',
    required: true,
  },
  {
    id: 'age',
    question: '¿Qué edad tiene?',
    type: 'text',
    illustrationKey: 'edad',
    required: true,
  },
  {
    id: 'estadoCivil',
    question: '¿Cuál es su estado civil (soltero o casado)?',
    type: 'select',
    options: [
      { label: 'Soltero', value: 'soltero' },
      { label: 'Casado', value: 'casado' },
      { label: 'Divorciado', value: 'divorciado' },
      { label: 'Viudo', value: 'viudo' },
      { label: 'Unión libre', value: 'union-libre' },
    ],
    illustrationKey: 'estado-civil',
    required: true,
  },
  {
    id: 'tieneHijos',
    question: '¿Tiene hijos?',
    type: 'select',
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
    illustrationKey: 'hijos',
    required: true,
  },
  {
    id: 'cantidadHijos',
    question: '¿Cuántos hijos tiene?',
    type: 'text',
    illustrationKey: 'cantidad-hijos',
    required: false,
  },
  {
    id: 'edadesHijos',
    question: '¿Qué edades tienen?',
    type: 'text',
    illustrationKey: 'edades-hijos',
    required: false,
  },
  {
    id: 'fechasNacimientoHijos',
    question: '¿Cuáles son sus fechas de nacimiento?',
    type: 'text',
    illustrationKey: 'fechas-hijos',
    required: false,
  },
  {
    id: 'fechaBoda',
    question: '¿Cuándo es su aniversario de bodas?',
    type: 'text',
    illustrationKey: 'aniversario',
    required: false,
  },
  {
    id: 'tieneNietos',
    question: '¿Tiene nietos?',
    type: 'select',
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
    illustrationKey: 'nietos',
    required: false,
  },
  {
    id: 'cantidadNietos',
    question: '¿Cuántos y de qué edades?',
    type: 'text',
    illustrationKey: 'cantidad-nietos',
    required: false,
  },
  {
    id: 'origen',
    question: '¿De qué ciudad o región es originario? ¿Dónde creció?',
    type: 'text',
    illustrationKey: 'origen',
    required: true,
  },
  {
    id: 'tieneTrabajaEnCampo',
    question: '¿Trabaja solo o con su familia en el campo?',
    type: 'select',
    options: [
      { label: 'Solo', value: 'solo' },
      { label: 'Con familia', value: 'familia' },
      { label: 'Con staff', value: 'staff' },
    ],
    illustrationKey: 'trabajo-campo',
    required: true,
  },
  // ======================== FOTOGRAFÍA ========================
  {
    id: 'foto',
    question: 'Fotografía de perfil',
    subtitle: 'Sube una foto para identificar al dueño de la propiedad',
    type: 'text',
    illustrationKey: 'foto',
    required: false,
  },
  // ======================== FAMILIA Y ORIGEN ========================
  {
    id: 'familia',
    question: 'Familia y Orígenes',
    subtitle: 'La historia familiar es fundamental para entender su patrimonio',
    type: 'text',
    illustrationKey: 'familia',
  },
  {
    id: 'fechaNacimientoMadre',
    question: '¿Cuál es la fecha de nacimiento de su madre?',
    type: 'text',
    illustrationKey: 'madre',
    required: false,
  },
  {
    id: 'fechaNacimientoPadre',
    question: '¿Cuál es la fecha de nacimiento de su padre?',
    type: 'text',
    illustrationKey: 'padre',
    required: false,
  },
  {
    id: 'tieneTradicionFamilia',
    question: '¿Tiene alguna tradición familiar sagrada (por ejemplo, el churrasco familiar de los domingos, viajes de fin de año, etc.)?',
    type: 'select',
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
    illustrationKey: 'tradicion',
    required: false,
  },
  // ======================== GUSTOS / AFICIONES / ESTILO DE VIDA ========================
  {
    id: 'gustos',
    question: 'Gustos, Aficiones y Estilo de Vida',
    subtitle: 'Conoce sus preferencias y hábitos de vida',
    type: 'text',
    illustrationKey: 'gustos',
  },
  {
    id: 'comidaFavorita',
    question: '¿Cuál es su comida favorita?',
    type: 'text',
    illustrationKey: 'comida',
    required: false,
  },
  {
    id: 'leGustaFutbol',
    question: '¿Le gusta el fútbol? Si es así, ¿cuál es su equipo favorito?',
    type: 'text',
    illustrationKey: 'futbol',
    required: false,
  },
  {
    id: 'otroDeporte',
    question: 'Aparte del fútbol, ¿sigue o practica algún otro deporte (carreras de autos, tenis, caballos, caza, pesca)?',
    type: 'text',
    illustrationKey: 'deportes',
    required: false,
  },
  {
    id: 'musicaFavorita',
    question: '¿Qué tipo de música le gusta escuchar cuando maneja hacia el campo o mientras trabaja?',
    type: 'text',
    illustrationKey: 'musica',
    required: false,
  },
  {
    id: 'bebidaFavorita',
    question: '¿Cuál es su bebida favorita para relajarse o acompañar una buena comida (vino, cerveza, café, mate, etc.)?',
    type: 'text',
    illustrationKey: 'bebida',
    required: false,
  },
  {
    id: 'leGustoCocinar',
    question: '¿Le gusta cocinar o es usted el encargado de hacer el churrasco en los eventos familiares?',
    type: 'select',
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
      { label: 'A veces', value: 'a-veces' },
    ],
    illustrationKey: 'cocina',
    required: false,
  },
  {
    id: 'restauranteFavorito',
    question: 'Cuando sale a comer con su familia, ¿cuál es su restaurante favorito o qué tipo de ambiente prefiere?',
    type: 'text',
    illustrationKey: 'restaurante',
    required: false,
  },
  {
    id: 'viajePlaya',
    question: 'Cuando viaja por placer, ¿qué tipo de destino prefiere (playa, campo, ciudad, montaña)?',
    type: 'text',
    illustrationKey: 'viaje',
    required: false,
  },
  {
    id: 'tieneMascotas',
    question: '¿Tiene mascotas o animales a los que les tenga especial cariño en la propiedad (perros, caballos, etc.)?',
    type: 'text',
    illustrationKey: 'mascotas',
    required: false,
  },
  {
    id: 'tieneSociedad',
    question: '¿Pertenece a alguna fraternidad, club social o asociación ganadrera/agrícola donde pase su tiempo libre?',
    type: 'text',
    illustrationKey: 'sociedad',
    required: false,
  },
  // ======================== RUTINA / PERSONALIDAD / VÍNCULO CON EL CAMPO ========================
  {
    id: 'rutina',
    question: 'Rutina, Personalidad y Vínculo con el Campo',
    subtitle: 'Comprende cómo funciona su día a día y qué le motiva',
    type: 'text',
    illustrationKey: 'rutina',
  },
  {
    id: 'madruga',
    question: '¿Es de los que madrugan mucho o prefiere arrancar su día de trabajo un poco más tarde?',
    type: 'select',
    options: [
      { label: 'Madruga', value: 'madruga' },
      { label: 'Tarde', value: 'tarde' },
      { label: 'Mixto', value: 'mixto' },
    ],
    illustrationKey: 'madrugo',
    required: true,
  },
  {
    id: 'loQueMasDisfruta',
    question: '¿Qué es lo que más disfruta de su vida trabajando en el campo?',
    type: 'text',
    illustrationKey: 'disfruta',
    required: true,
  },
  {
    id: 'comoEmenzo',
    question: '¿Cómo empezó en el rubro agrícola? (¿Heredó la tierra, la compró, empezó desde cero?)',
    type: 'text',
    illustrationKey: 'comenzo',
    required: true,
  },
  {
    id: 'cultivoFavorito',
    question: 'De todos los cultivos que maneja, ¿cuál es su favorito o el que más le apasiona trabajar?',
    type: 'text',
    illustrationKey: 'cultivo',
    required: false,
  },
  {
    id: 'cultivos',
    question: '¿Qué cultivos maneja en la propiedad?',
    type: 'multiselect',
    options: [
      { label: 'Soja', value: 'soja' },
      { label: 'Maíz', value: 'maiz' },
      { label: 'Trigo', value: 'trigo' },
      { label: 'Milho', value: 'milho' },
      { label: 'Arroz', value: 'arroz' },
      { label: 'Sorgo', value: 'sorgo' },
      { label: 'Café', value: 'cafe' },
      { label: 'Cítricos', value: 'citricos' },
      { label: 'Frutales', value: 'frutales' },
      { label: 'Pastos', value: 'pastos' },
      { label: 'Vacuno', value: 'vacuno' },
      { label: 'Porcino', value: 'porcino' },
      { label: 'Aviario', value: 'aviary' },
      { label: 'Agroflorestación', value: 'agroflorestacion' },
      { label: 'Otro', value: 'otro' },
    ],
    illustrationKey: 'cultivos',
    required: false,
  },
  {
    id: 'loQueRelaja',
    question: '¿Qué es lo que más le relaja hacer cuando está muy estresado por una campaña difícil?',
    type: 'text',
    illustrationKey: 'relaja',
    required: false,
  },
  {
    id: 'logroPropio',
    question: '¿Qué logro personal o familiar le da más orgullo de todo lo que ha construido hasta ahora?',
    type: 'text',
    illustrationKey: 'logro',
    required: false,
  },
  // ======================== RELACIÓN CON EL ADN ========================
  {
    id: 'adn',
    question: 'Relación con el Asesor de Negocios (ADN)',
    subtitle: 'Acompañamiento y comunicación para el éxito de su operación',
    type: 'text',
    illustrationKey: 'adn',
  },
  {
    id: 'horarioVisita',
    question: '¿En qué horario prefiere que el ADN lo visite en su propiedad (por la mañana temprano, al mediodía, por la tarde)?',
    type: 'select',
    options: [
      { label: 'Mañana temprano', value: 'mañana' },
      { label: 'Al mediodía', value: 'mediodia' },
      { label: 'Por la tarde', value: 'tarde' },
      { label: 'Flexible', value: 'flexible' },
    ],
    illustrationKey: 'horario',
    required: true,
  },
  {
    id: 'comunicacionPreferida',
    question: '¿Cómo prefiere que se comuniquen con usted (llamada directa, mensaje de WhatsApp, audios)?',
    type: 'select',
    options: [
      { label: 'Llamada directa', value: 'llamada' },
      { label: 'WhatsApp', value: 'whatsapp' },
      { label: 'Audios', value: 'audios' },
      { label: 'Correo electrónico', value: 'correo' },
    ],
    illustrationKey: 'comunicacion',
    required: true,
  },
  {
    id: 'temaFavorito',
    question: 'Además del trabajo, ¿cuál es el tema del que más le gusta hablar o debatir con su ADN?',
    type: 'text',
    illustrationKey: 'tema',
    required: false,
  },
  {
    id: 'anecdotaADN',
    question: '¿Tienen alguna anécdota divertida, un susto o un buen recuerdo que haya vivido junto a su ADN en el campo?',
    type: 'textarea',
    illustrationKey: 'anecdota',
    required: false,
  },
];

// ======================== HELPER: VALIDATION ========================
function requiredValidator(value: any): boolean {
  return value !== undefined && value !== '' && value !== null;
}

// ======================== PAGE ========================
export default function IntakeFormV2() {
  return (
    <ConversationalFormShell steps={STEPS} />
  );
}
