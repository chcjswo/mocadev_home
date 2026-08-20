import type { BoardData, Card, EventType } from './types';

export const pad = (n: number) => String(n).padStart(2, '0');

export const iso = (d: Date) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

/** 마감까지 남은 날 수 (마감 없으면 null) */
export const dleft = (due: string, today: Date) =>
  due ? Math.round((new Date(due + 'T00:00:00').getTime() - today.getTime()) / 86400000) : null;

export const ddText = (d: number | null) => (d === null ? '' : d < 0 ? 'D+' + -d : d === 0 ? 'D-DAY' : 'D-' + d);

export const ddCls = (d: number | null) => (d === null ? '' : d < 0 ? 'over' : d <= 7 ? 'soon' : '');

export const proj = (data: BoardData, id: string) => data.projects.find((p) => p.id === id);

export const lab = (data: BoardData, id: string) => data.labels.find((l) => l.id === id);

export const labCol = (data: BoardData, id: string) => lab(data, id)?.color || 'var(--ink-soft)';

export const labName = (data: BoardData, id: string) => lab(data, id)?.name || '';

export const etype = (data: BoardData, id: string): EventType =>
  data.etypes.find((t) => t.id === id) || data.etypes[0] || { id: '', name: '', color: '#5A6880', mark: 'none' };

export const evCol = (data: BoardData, id: string) => etype(data, id).color;

export const evName = (data: BoardData, id: string) => etype(data, id).name;

export const evOn = (data: BoardData, date: string) => data.events.filter((e) => e.date === date);

export const person = (data: BoardData, id: string) => data.people.find((p) => p.id === id);

export const pName = (data: BoardData, id: string) => person(data, id)?.name || '?';

export const meId = (data: BoardData) => (data.people.find((p) => p.me) || data.people[0])?.id;

export const meName = (data: BoardData) => (data.people.find((p) => p.me) || data.people[0])?.name || '내';

export const owners = (data: BoardData, c: Card) => (c.owners || []).map((id) => pName(data, id)).join('·') || '-';

export const lastStage = (data: BoardData) => data.stages.length - 1;

export const openOf = (data: BoardData, id: string) => data.cards.filter((c) => c.proj === id && c.list < 3).length;

export const openCards = (data: BoardData) => data.cards.filter((c) => c.list < 3);
