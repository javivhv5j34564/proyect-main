const fs = require('fs');

const rawTools = fs.readFileSync('tools_raw.txt', 'utf-8');
const lines = rawTools.split('\n').filter(l => l.trim().length > 0);

const categoryIcons = {
    'Chatbots y Asistentes': '🤖',
    'Imagen y Diseño': '🎨',
    'Video y Animación': '🎬',
    'Programación': '💻',
    'Escritura y Productividad': '✍️',
    'Investigación y Datos': '📊',
    'Audio y Música': '🎵',
    'Automatización': '⚙️',
    'Marketing y Ventas': '🚀',
    'Utilidades': '🛠️'
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
    if (splitIdx !== -1) {
        let rawName = line.substring(0, splitIdx).trim();
        let desc = line.substring(splitIdx + 3).trim();

        let name = rawName;
        let urlName = name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        let url = `https://www.${urlName}.com`;
        if (name.toLowerCase().includes('google')) url = 'https://google.com';

        let id = urlName + '_' + Math.floor(Math.random() * 10000);

        newTools.push({
            id: id,
            name: name,
            sector: currentCategory,
            logo: urlName,
            emoji: categoryIcons[currentCategory] || '✨',
            isFullyFree: false,
            freeTierDetails: 'Freemium',
            url: url,
            description: desc,
            longDescription: desc + ' Explora más sobre esta herramienta en su sitio web ofical. Excelente solución en ' + currentCategory + '.'
        });
    }
}

const dataJsPath = './src/data.js';
let existingContent = fs.readFileSync(dataJsPath, 'utf-8');

const existingToolsMatch = existingContent.match(/export const tools = (\[[\s\S]*?\]);\n/);
let existingTools = [];
if (existingToolsMatch) {
    try {
        const rawArr = existingToolsMatch[1];
        existingTools = eval("(" + rawArr + ")");
    } catch (e) {
        console.log("Could not eval existing tools.", e);
    }
}

let existingNames = existingTools.map(t => t.name.toLowerCase());
let existingToolsFiltered = [...existingTools];
let addedCount = 0;

for (let t of newTools) {
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
console.log('Added ' + addedCount + ' tools. Rewrote data.js.');
