const fs = require('fs');

const originalTools = [
    {
        id: 'claude',
        name: 'Claude 3.5 Sonnet',
        sector: 'Escritura y Productividad',
        logo: 'claude',
        emoji: '🤖',
        isFullyFree: true,
        freeTierDetails: '100% Gratis',
        url: 'https://claude.ai',
        description: 'La inteligencia artificial más avanzada para redacción natural y análisis de textos.',
        longDescription: 'Ofrece la redacción más humana y coherente del mercado sin costo. Ideal para ensayos, correos, y cualquier tipo de redacción profesional. Destaca por su capacidad para seguir instrucciones de formato y su tono natural, superando a menudo a alternativas de pago en la calidad pura del texto producido.'
    },
    {
        id: 'leonardo',
        name: 'Leonardo.ai',
        sector: 'Imagen y Diseño',
        logo: 'leonardo',
        emoji: '🎨',
        isFullyFree: false,
        freeTierDetails: 'Freemium (150 tokens/día)',
        url: 'https://leonardo.ai',
        description: 'Generación de imágenes espectaculares con calidad profesional. El mejor freemium.',
        longDescription: "Da 150 tokens diarios gratis. Es mejor que Midjourney si no quieres pagar, permitiendo crear arte profesional. La plataforma incluye multitud de modelos afinados ('finetuned'), creación de texturas 3D y edición asistida por IA para mantener la consistencia en los personajes o estilos."
    },
    {
        id: 'deepseek',
        name: 'DeepSeek R1',
        sector: 'Programación',
        logo: 'deepseek',
        emoji: '🐳',
        isFullyFree: true,
        freeTierDetails: 'Open Source',
        url: 'https://chat.deepseek.com',
        description: 'Potente modelo para resolver problemas lógicos y programar. Alta eficiencia.',
        longDescription: 'Una IA de código abierto potentísima. Supera a muchos modelos de pago en razonamiento lógico y programación. Ofrece sugerencias de código súper precisas, un análisis de repositorio avanzado y una ventana de contexto amplia para leer bases de código extensas.'
    },
    {
        id: 'perplexity',
        name: 'Perplexity AI',
        sector: 'Investigación y Datos',
        logo: 'perplexity',
        emoji: '🔍',
        isFullyFree: false,
        freeTierDetails: 'Búsqueda Gratis',
        url: 'https://www.perplexity.ai',
        description: 'El mejor buscador conversacional actual con fuentes en tiempo real.',
        longDescription: 'Sustituye a Google. Te da respuestas con fuentes citadas en tiempo real, ideal para estudiantes y periodistas. Combina un potente motor de búsqueda con los mejores LLMs para sintetizar la información de múltiples webs y darte una respuesta estructurada libre de publicidad.'
    },
    {
        id: 'gamma',
        name: 'Gamma App',
        sector: 'Escritura y Productividad',
        logo: 'gamma',
        emoji: '🪄',
        isFullyFree: false,
        freeTierDetails: 'Freemium (Créditos iniciales)',
        url: 'https://gamma.app',
        description: 'Genera presentaciones completas y documentos estéticos con solo un prompt.',
        longDescription: 'Crea presentaciones enteras (diapositivas) con un solo prompt. Te ahorra horas de diseño en PowerPoint. Su interfaz es ultra-fluida y te permite ajustar cada diapositiva de forma interactiva e iterativa. Ideal para presentar propuestas a clientes rápidamente.'
    },
    {
        id: 'capcut',
        name: 'CapCut Desktop IA',
        sector: 'Video y Animación',
        logo: 'capcut',
        emoji: '✂️',
        isFullyFree: false,
        freeTierDetails: 'Funciones Gratis',
        url: 'https://www.capcut.com',
        description: 'El editor de video favorito ahora con subtítulos automáticos y más IA.',
        longDescription: 'Incluye funciones de subtitulado automático y edición por IA totalmente gratuitas y fáciles de usar. Remueve fondos sin chroma key, mejora el audio aislando la voz y genera subtítulos dinámicos que retienen la atención en RRSS (TikTok, Reels, Shorts).'
    },
    {
        id: 'copilot',
        name: 'Microsoft Copilot',
        sector: 'Escritura y Productividad',
        logo: 'copilot',
        emoji: '✈️',
        isFullyFree: true,
        freeTierDetails: '100% Gratis',
        url: 'https://copilot.microsoft.com',
        description: 'Asistente de IA integral que utiliza GPT-4 y DALL-E gratis.',
        longDescription: 'Integrado en el ecosistema de Microsoft, Copilot ofrece acceso gratuito a modelos de lenguaje avanzados (GPT-4) y generadores de imágenes (DALL-E 3) con acceso a internet en tiempo real. Es tu mejor aliado para buscar, resumir y crear en el día a día sin pagar suscripciones.'
    },
    {
        id: 'cursor',
        name: 'Cursor AI',
        sector: 'Programación',
        logo: 'cursor',
        emoji: '🖱️',
        isFullyFree: false,
        freeTierDetails: 'Freemium (Plan Básico)',
        url: 'https://www.cursor.com',
        description: 'El editor de código moderno con IA nativa y refactorización inteligente.',
        longDescription: 'Construido sobre VS Code, incluye funciones avanzadas de autocompletado y chat con IA basándose en todo el contexto de tu proyecto. Su plan gratuito ofrece una cantidad generosa de peticiones a modelos avanzados, ideal para desarrollar mucho más rápido con asistencia premium.'
    },
    {
        id: 'suno',
        name: 'Suno AI',
        sector: 'Audio y Música',
        logo: 'suno',
        emoji: '🎵',
        isFullyFree: false,
        freeTierDetails: '50 Créditos Diarios',
        url: 'https://suno.com',
        description: 'Genera canciones completas con voces y bases musicales ultra-realistas.',
        longDescription: 'Suno revoluciona la creación de audio, permitiendo a cualquier persona componer canciones completas (letra, música y cantantes) especificando solo el género y la temática. El tier gratuito te da créditos suficientes para crear varios temas creativos cada día.'
    },
    {
        id: 'flux',
        name: 'Flux.1 (via Fal)',
        sector: 'Imagen y Diseño',
        logo: 'flux',
        emoji: '🌌',
        isFullyFree: true,
        freeTierDetails: 'Versiones de acceso abierto',
        url: 'https://fal.ai/models/fal-ai/flux/schnell',
        description: 'El generador de imágenes de mayor calidad en Open Source actual.',
        longDescription: 'Creado por los cerebros detrás de Stable Diffusion, Flux.1 proporciona una anatomía hiperrealista y entiende el texto de los prompts mejor que casi cualquier otra IA. Accesible a través de múltiples hubs gratuitos para resultados espectaculares.'
    },
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        sector: 'Escritura y Productividad',
        logo: 'chatgpt',
        emoji: '💬',
        isFullyFree: false,
        freeTierDetails: 'Plan Básico Gratis',
        url: 'https://chatgpt.com',
        description: 'Asistente de IA versátil y potente para cualquier tarea de trabajo diario.',
        longDescription: 'La IA más popular del mundo te permite redactar, resumir correos, generar ideas y organizar tu trabajo. El plan gratuito ahora incluye acceso al modelo GPT-4o mini, suficientemente rápido e inteligente para agilizar casi cualquier tarea de oficina o trabajo en equipo.'
    },
    {
        id: 'cody',
        name: 'Cody (Sourcegraph)',
        sector: 'Programación',
        logo: 'cody',
        emoji: '👨‍💻',
        isFullyFree: true,
        freeTierDetails: 'Individual Gratis',
        url: 'https://sourcegraph.com/cody',
        description: 'Asistente de código IA que conoce todo tu repositorio de trabajo.',
        longDescription: 'A diferencia de otros autocompletados limitados, Cody lee todo tu código para escribir y corregir funciones basándose en el contexto general de tu arquitectura de software. Es el compañero perfecto para la programación e informática, y su plan personal es 100% gratis.'
    },
    {
        id: 'udio',
        name: 'Udio AI',
        sector: 'Audio y Música',
        logo: 'udio',
        emoji: '🎧',
        isFullyFree: false,
        freeTierDetails: 'Freemium (Créditos Diarios)',
        url: 'https://www.udio.com',
        description: 'Crea música de altísima calidad y nitidez profesional al instante.',
        longDescription: 'Udio es espectacular para crear canciones, bases de rap, música épica para juegos o jingles. A diferencia de otros, la calidad y separación de instrumentos es casi indistinguible del audio de estudio real. Genial para la producción musical y exploración creativa de cualquier género.'
    },
    {
        id: 'chefgpt',
        name: 'ChefGPT',
        sector: 'Cocina',
        logo: 'chefgpt',
        emoji: '👨‍🍳',
        isFullyFree: false,
        freeTierDetails: 'Plan Básico Gratis',
        url: 'https://www.chefgpt.com',
        description: 'Tu chef personal de IA. Recetas a partir de lo que hay en tu nevera.',
        longDescription: 'Ideal para la cocina diaria. Simplemente le dices a la IA qué ingredientes te sobran en la despensa, tus objetivos macro nutricionales o alergias, y te generará recetas saludables paso a paso para cocinar sin desperdiciar comida. Elimina la eterna pregunta de "¿qué ceno hoy?".'
    },
    {
        id: 'julius',
        name: 'Julius AI',
        sector: 'Investigación y Datos',
        logo: 'julius',
        emoji: '📊',
        isFullyFree: false,
        freeTierDetails: 'Freemium (Análisis Básico)',
        url: 'https://julius.ai',
        description: 'Analista de datos que procesa Excels, CSVs y dibuja gráficos avanzados.',
        longDescription: 'Julius es tu científico de datos personal. Sube un archivo Excel, CSV o conecta tu base de datos y pídele en lenguaje natural que encuentre tendencias, haga previsiones o grafique tus ventas. Perfecto para analistas sin conocimientos profundos de programación en Python analítico.'
    },
    {
        id: 'notebooklm',
        name: 'NotebookLM (Google)',
        sector: 'Investigación y Datos',
        logo: 'notebooklm',
        emoji: '📓',
        isFullyFree: true,
        freeTierDetails: '100% Gratis',
        url: 'https://notebooklm.google.com',
        description: 'Convierte tus apuntes en podcasts interactivos y guías de estudio.',
        longDescription: 'La revolución para estudiantes. Sube tus PDFs, apuntes de clase o enlaces de YouTube, y NotebookLM te creará resúmenes, tests de repaso, e incluso un podcast donde dos presentadores de IA debaten y explican tus apuntes de forma súper amena.'
    },
    {
        id: 'reclaim',
        name: 'Reclaim AI',
        sector: 'Horarios',
        logo: 'reclaim',
        emoji: '📅',
        isFullyFree: false,
        freeTierDetails: 'Plan Básico Gratis',
        url: 'https://reclaim.ai',
        description: 'Organiza tu calendario agrupando tareas, hábitos y descansos automáticos.',
        longDescription: 'Ideal para gestionar tu tiempo sin estrés. Se sincroniza con Google Calendar y automáticamente encaja tus tareas pendientes en los huecos libres, protegiendo tiempo para ti, tus hábitos (ej. "Ir al gimnasio") y reprogramando todo automáticamente si surge una urgencia.'
    },
    {
        id: 'vmake',
        name: 'Vmake AI Fashion',
        sector: 'Moda',
        logo: 'vmake',
        emoji: '👗',
        isFullyFree: false,
        freeTierDetails: 'Freemium (Créditos Gratis)',
        url: 'https://vmake.ai',
        description: 'Pruébate ropa en modelos virtuales o cámbiate de ropa en fotos.',
        longDescription: 'Una herramienta impresionante para moda y e-commerce. Puedes subir la foto de una prenda y Vmake generará modelos realistas de diferentes tallas y etnias luciéndola. También incluye funciones de Virtual Try-On para ver cómo te quedarían a ti los outfits.'
    },
    {
        id: 'quillbot',
        name: 'QuillBot',
        sector: 'Escritura y Productividad',
        logo: 'quillbot',
        emoji: '✍️',
        isFullyFree: false,
        freeTierDetails: 'Freemium (Plan Básico)',
        url: 'https://quillbot.com',
        description: 'El mejor parafraseador y corrector gramatical impulsado por IA.',
        longDescription: 'Perfecto para reescribir textos, mejorar el vocabulario y evitar el plagio. Su versión gratuita te permite parafrasear párrafos cortos en diferentes tonos (formal, fluido, etc.) de manera inmediata y con excelentes resultados en español e inglés.'
    },
    {
        id: 'consensus',
        name: 'Consensus AI',
        sector: 'Investigación y Datos',
        logo: 'consensus',
        emoji: '🔬',
        isFullyFree: false,
        freeTierDetails: 'Búsqueda Gratis',
        url: 'https://consensus.app',
        description: 'Buscador de IA que solo extrae respuestas de artículos científicos reales.',
        longDescription: 'Si estás haciendo una tesis o un trabajo académico, esta herramienta extrae citas y conclusiones directamente de bases de datos de papers científicos (revisados por pares). Dile adiós a las respuestas inventadas y obtén rigor científico gratis.'
    },
    {
        id: 'luma',
        name: 'Luma Dream Machine',
        sector: 'Video y Animación',
        logo: 'luma',
        emoji: '🎥',
        isFullyFree: false,
        freeTierDetails: '30 Generaciones/Mes',
        url: 'https://lumalabs.ai/dream-machine',
        description: 'Genera clips de video hiperrealistas y de alta calidad a partir de texto.',
        longDescription: 'Una IA revolucionaria para crear videos desde cero o animar imágenes estáticas. Con su plan gratuito obtienes suficientes créditos mensuales para renderizar cinemáticas fluidas o assets rápidos para tus proyectos audiovisuales y redes sociales.'
    },
    {
        id: 'dishgen',
        name: 'DishGen',
        sector: 'Cocina',
        logo: 'dishgen',
        emoji: '🥘',
        isFullyFree: true,
        freeTierDetails: 'Gratis con Límites',
        url: 'https://www.dishgen.com',
        description: 'Generador de recetas creativas que aprovecha las sobras de tu nevera.',
        longDescription: 'Escribe los pocos ingredientes que te quedan y DishGen formulará instantáneamente una receta única con el paso a paso exacto, tiempos de cocción y alternativas. Perfecto para salir del paso sin tener que comprar ingredientes extra.'
    },
    {
        id: 'chatcsv',
        name: 'ChatCSV',
        sector: 'Investigación y Datos',
        logo: 'chatcsv',
        emoji: '📈',
        isFullyFree: false,
        freeTierDetails: 'Uso Básico Gratis',
        url: 'https://www.chatcsv.co',
        description: 'Chatea directamente con tus hojas de cálculo y documentos de datos.',
        longDescription: 'Convierte tus archivos CSV tabulares en un asistente inteligente. Hazle preguntas sobre tu tabla como "qué mes vendimos más?" o "filtra los usuarios inactivos", y ChatCSV leerá la información devolviéndote los datos procesados al instante.'
    },
    {
        id: 'socratic',
        name: 'Socratic by Google',
        sector: 'Investigación y Datos',
        logo: 'socratic',
        emoji: '🦉',
        isFullyFree: true,
        freeTierDetails: '100% Gratis',
        url: 'https://socratic.org',
        description: 'Resolución de problemas de matemáticas, física y ciencias con solo una foto.',
        longDescription: 'Toma una foto a ese problema de álgebra o química que no entiendes, y la IA de Socratic lo desgrana explicándote la solución paso por paso con gráficos y conceptos clave. Una app imprescindible y 100% gratuita para estudiantes.'
    },
    {
        id: 'trevor',
        name: 'Trevor AI',
        sector: 'Horarios',
        logo: 'trevor',
        emoji: '⏳',
        isFullyFree: false,
        freeTierDetails: 'Plan Básico Gratis',
        url: 'https://trevorai.com',
        description: 'Planificador de Time-Blocking para aumentar tu tiempo de concentración.',
        longDescription: 'Aplica la famosa técnica del bloque de tiempo (Time-Blocking) asignando horas específicas a cada tarea de tu lista de pendientes en el calendario. Trevor AI calcula tu carga de trabajo y previene el burnout manteniéndote enfocado.'
    },
    {
        id: 'cala',
        name: 'Cala (Fashion AI)',
        sector: 'Moda',
        logo: 'cala',
        emoji: '👚',
        isFullyFree: false,
        freeTierDetails: 'Freemium',
        url: 'https://ca.la',
        description: 'Diseño de ropa y generación de colecciones de moda en segundos.',
        longDescription: 'Es el sistema operativo definitivo para que diseñadores y marcas de ropa creen bocetos impulsados por IA. Combina descripciones de prendas y estilos para obtener renders 3D de alta calidad que puedes llevar directos a la producción textil.'
    },
    {
        id: 'gemini',
        name: 'Google Gemini',
        sector: 'Escritura y Productividad',
        logo: 'gemini',
        emoji: '✨',
        isFullyFree: false,
        freeTierDetails: 'Plan Básico Gratis',
        url: 'https://gemini.google.com',
        description: 'La inteligencia artificial multimodal de Google integrada en su ecosistema.',
        longDescription: 'Gemini destaca por su enorme ventana de contexto y su capacidad nativa para entender texto, código, imágenes y vídeos al mismo tiempo. Al estar integrado con Google Workspace (Docs, Gmail, Drive), es ideal para resumir hojas de cálculo o redactar correos en tu día a día.'
    },
    {
        id: 'midjourney',
        name: 'Midjourney',
        sector: 'Imagen y Diseño',
        logo: 'midjourney',
        emoji: '⛵',
        isFullyFree: false,
        freeTierDetails: 'Solo de Pago',
        url: 'https://www.midjourney.com',
        description: 'El rey indiscutible de la generación de imágenes artísticas y fotorrealistas.',
        longDescription: 'Aunque ya no ofrece prueba gratuita constante, Midjourney v6 es el estándar de la industria creativa. Genera desde fotografías ultrarrealistas hasta logotipos y concept art para videojuegos con una fidelidad gráfica inigualable. Se utiliza a través de Discord o su web oficial.'
    },
    {
        id: 'stablediffusion',
        name: 'Stable Diffusion',
        sector: 'Imagen y Diseño',
        logo: 'stablediffusion',
        emoji: '🖼️',
        isFullyFree: true,
        freeTierDetails: 'Open Source',
        url: 'https://stability.ai',
        description: 'El modelo libre más potente para generar imágenes sin censura localmente.',
        longDescription: 'La gran ventaja de Stable Diffusion (especialmente SDXL) es que puedes descargarlo e instalarlo gratis en tu propio PC. Ofrece un control absoluto mediante interfaces como ComfyUI o Automatic1111, permitiéndote entrenar tus propios modelos (LoRAs) sin depender de suscripciones.'
    },
    {
        id: 'runway',
        name: 'Runway Gen-3',
        sector: 'Video y Animación',
        logo: 'runway',
        emoji: '🎬',
        isFullyFree: false,
        freeTierDetails: 'Freemium',
        url: 'https://runwayml.com',
        description: 'La plataforma líder en creación creativa y efectos visuales generativos.',
        longDescription: 'Runway está orientado a cineastas y creadores de contenido. Su modelo Gen-3 Alpha produce vídeos de altísima fidelidad temporal y control de cámara milimétrico. Permite funciones avanzadas como Text-to-Video, Image-to-Video y herramientas mágicas de borrado en movimiento.'
    },
    {
        id: 'kling',
        name: 'Kling AI',
        sector: 'Video y Animación',
        logo: 'kling',
        emoji: '🎞️',
        isFullyFree: false,
        freeTierDetails: 'Créditos Diarios',
        url: 'https://klingai.com',
        description: 'Generación de vídeo hiperrealista y simulación física avanzada.',
        longDescription: 'El principal competidor de Sora (OpenAI) accesible al público. Kling destaca por su increíble entendimiento de la física del mundo real: fluidos, reflejos y movimientos corporales complejos son renderizados con una precisión asombrosa. Ofrece varios créditos diarios en su tier gratuito.'
    }
];

const rawTools = fs.readFileSync('tools_raw.txt', 'utf-8');
const lines = rawTools.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const categoryIcons = {
    'Chatbots y Asistentes': ['🤖', '👾', '👽', '💬', '🧠', '🗣️', '💭', '💁', '🙋'],
    'Imagen y Diseño': ['🎨', '🖼️', '🎭', '🖌️', '🖍️', '📸', '🌈', '✨', '✒️'],
    'Video y Animación': ['🎬', '🎥', '📹', '🎞️', '🍿', '📺', '📼', '📽️', '🎇'],
    'Programación': ['💻', '🖥️', '⌨️', '�️', '⚙️', '🔧', '👨‍�💻', '👩‍💻', '🔌'],
    'Escritura y Productividad': ['✍️', '📝', '📓', '📋', '🖊️', '🖋️', '📖', '📚', '✅'],
    'Investigación y Datos': ['📊', '📈', '📉', '🔍', '🔬', '🧪', '🧬', '🔭', '🧮'],
    'Audio y Música': ['🎵', '🎧', '🎤', '🎙️', '📻', '🎸', '🎹', '🎷', '🥁'],
    'Automatización': ['⚙️', '🤖', '🚀', '⚡', '🔄', '🔁', '🔂', '🏗️', '🏭'],
    'Marketing y Ventas': ['🚀', '🎯', '📢', '📣', '💸', '💰', '🤝', '🙌', '🛒'],
    'Utilidades': ['🛠️', '🧰', '🔨', '🔧', '🔩', '🪛', '⚙️', '🗑️', '🧹'],
    'Cocina': ['🍳', '🥘', '🍲', '🥗', '🍔', '🍕', '🍰', '🍷', '🥂'],
    'Horarios': ['📅', '📆', '🗓️', '⏱️', '⏲️', '⏰', '🕰️', '⏳', '⌛'],
    'Moda': ['👗', '👔', '👕', '👖', '🧣', '🧤', '🧥', '🧦', '👠']
};

const regexCategory = /^\d+\.\s+(.*)$/;
let currentCategoryStr = '';
let currentCategory = '';

const newTools = [];

for (const line of lines) {
    const match = line.match(regexCategory);
    if (match) {
        let catTitle = match[1];
        if (catTitle.includes('Chatbots')) currentCategory = 'Chatbots y Asistentes';
        else if (catTitle.includes('Imagen')) currentCategory = 'Imagen y Diseño';
        else if (catTitle.includes('Video')) currentCategory = 'Video y Animación';
        else if (catTitle.includes('Programación')) currentCategory = 'Programación';
        else if (catTitle.includes('Escritura')) currentCategory = 'Escritura y Productividad';
        else if (catTitle.includes('Investigación')) currentCategory = 'Investigación y Datos';
        else if (catTitle.includes('Audio')) currentCategory = 'Audio y Música';
        else if (catTitle.includes('Automatización')) currentCategory = 'Automatización';
        else if (catTitle.includes('Marketing')) currentCategory = 'Marketing y Ventas';
        else if (catTitle.includes('Utilidades')) currentCategory = 'Utilidades';
        continue;
    }

    const splitIdx = line.indexOf(' - ') !== -1 ? line.indexOf(' - ') : line.indexOf(' – ');
    if (splitIdx !== -1 && currentCategory !== '') {
        let rawName = line.substring(0, splitIdx).trim();
        let desc = line.substring(splitIdx + 3).trim();

        let name = rawName;
        let urlName = name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        let url = `https://www.${urlName}.com`;
        if (name.toLowerCase().includes('google')) url = 'https://google.com';

        let id = urlName + '_' + Math.floor(Math.random() * 10000);
        let hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        let emojiArr = categoryIcons[currentCategory] || ['✨'];
        let distinctEmoji = emojiArr[hash % emojiArr.length];

        newTools.push({
            id: id,
            name: name,
            sector: currentCategory,
            logo: urlName,
            emoji: distinctEmoji,
            isFullyFree: false,
            freeTierDetails: 'Freemium',
            url: url,
            description: desc,
            longDescription: desc + ' Explora más sobre esta herramienta en su sitio web ofical. Excelente solución en ' + currentCategory + '.'
        });
    }
}

let existingNames = originalTools.map(t => t.name.toLowerCase());
let existingToolsFiltered = [...originalTools];
let addedCount = 0;

for (let t of newTools) {
    // Check if it exists in the original list
    let isDup = existingNames.some(en =>
        en.includes(t.name.split(' (')[0].toLowerCase()) ||
        t.name.toLowerCase().includes(en)
    );
    if (!isDup) {
        existingToolsFiltered.push(t);
        addedCount++;
    }
}

let allCategories = ['Todos', ...Object.keys(categoryIcons)];

const dataJsPath = './src/data.js';
let toolsOutput = 'export const tools = [\n';
for (let t of existingToolsFiltered) {
    let escName = t.name ? t.name.replace(/'/g, "\\'") : '';
    let escDesc = t.description ? t.description.replace(/'/g, "\\'") : '';
    let escLong = t.longDescription ? t.longDescription.replace(/'/g, "\\'") : '';
    let escFree = t.freeTierDetails ? t.freeTierDetails.replace(/'/g, "\\'") : '';

    toolsOutput += `    {
        id: '${t.id}',
        name: '${escName}',
        sector: '${t.sector}',
        logo: '${t.logo}',
        emoji: '${t.emoji}',
        isFullyFree: ${t.isFullyFree},
        freeTierDetails: '${escFree}',
        url: '${t.url}',
        description: '${escDesc}',
        longDescription: '${escLong}'
    },\n`;
}
toolsOutput += '];\n\n';

let catsOutput = 'export const categories = ' + JSON.stringify(allCategories).replace(/"/g, "'") + ';\n';

fs.writeFileSync(dataJsPath, toolsOutput + catsOutput, 'utf-8');
console.log('Added ' + addedCount + ' unique new tools. Rewrote data.js correctly.');
