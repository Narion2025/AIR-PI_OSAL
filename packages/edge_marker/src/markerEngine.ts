import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yaml';

export interface MarkerPacket {
  id: string;
  timestamp: string;
  markers: Record<string, number>;
  ttl: number;
}

interface MarkerDef {
  regex: RegExp;
}

const markerDefs: Record<string, MarkerDef> = (() => {
  let file = fileURLToPath(new URL('./markers.yaml', import.meta.url));
  if (!fs.existsSync(file)) {
    file = fileURLToPath(new URL('../markers.yaml', import.meta.url));
  }
  const data = YAML.parse(fs.readFileSync(file, 'utf8'));
  const defs: Record<string, MarkerDef> = {};
  for (const [name, cfg] of Object.entries<any>(data.markers)) {
    defs[name] = { regex: new RegExp(cfg.regex, 'gi') };
  }
  return defs;
})();

export function analyzeText(id: string, text: string, ttl = 3600): MarkerPacket {
  const markers: Record<string, number> = {};
  for (const [name, def] of Object.entries(markerDefs)) {
    const matches = text.match(def.regex);
    markers[name] = matches ? matches.length / 1 : 0;
  }
  return {
    id,
    timestamp: new Date().toISOString(),
    markers,
    ttl,
  };
}
