import { analyzeText } from './markerEngine.js';

const text = process.argv.slice(2).join(' ') || 'I am happy';
const packet = analyzeText('example', text);
console.log(JSON.stringify(packet, null, 2));
