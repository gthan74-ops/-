import path from 'path';
import fs from 'fs';

export interface Poem {
  id: number;
  author: string;
  title: string;
  text: string;
  year: string;
  grade: string;
  charCount: number;
  license: string;
  views: number;
  url: string;
}

export interface PoemIndex {
  id: number;
  author: string;
  title: string;
  year: string;
  grade: string;
  charCount: number;
}

let _poems: Poem[] | null = null;
let _index: PoemIndex[] | null = null;

function loadPoems(): Poem[] {
  if (_poems) return _poems;
  const filePath = path.join(process.cwd(), 'public', 'data', 'poems.json');
  _poems = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Poem[];
  return _poems;
}

function loadIndex(): PoemIndex[] {
  if (_index) return _index;
  const filePath = path.join(process.cwd(), 'public', 'data', 'poems-index.json');
  _index = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as PoemIndex[];
  return _index;
}

export function getAllPoemsIndex(): PoemIndex[] {
  return loadIndex();
}

export function getPoemById(id: number): Poem | undefined {
  return loadPoems().find((p) => p.id === id);
}

export function getTodayPoem(): Poem {
  const poems = loadPoems();
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return poems[dayOfYear % poems.length];
}

export function getRandomPoems(count: number, excludeId?: number): Poem[] {
  const poems = loadPoems().filter((p) => p.id !== excludeId);
  const shuffled = [...poems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getAllAuthors(): string[] {
  const index = loadIndex();
  return [...new Set(index.map((p) => p.author))].sort();
}

export function getPoemsByPage(page: number, perPage = 20): { poems: PoemIndex[]; total: number } {
  const index = loadIndex();
  const start = (page - 1) * perPage;
  return { poems: index.slice(start, start + perPage), total: index.length };
}
