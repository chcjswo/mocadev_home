'use client';

import type { BoardData, Person } from '@/lib/board/types';
import { Dlg } from './Dlg';
import { useFocusNewRow } from './useFocusNewRow';

interface PeopleDialogProps {
  data: BoardData;
  onUpdate: (fn: (d: BoardData) => BoardData) => void;
  onClose: () => void;
}

export function PeopleDialog({ data, onUpdate, onClose }: PeopleDialogProps) {
  const rowsRef = useFocusNewRow(data.people.length);

  const rename = (id: string, name: string) =>
    onUpdate((d) => ({ ...d, people: d.people.map((p) => (p.id === id ? { ...p, name } : p)) }));

  const setMe = (id: string) =>
    onUpdate((d) => ({ ...d, people: d.people.map((p) => ({ ...p, me: p.id === id })) }));

  const del = (p: Person) => {
    if (data.people.length <= 1) {
      window.alert('담당자는 한 명 이상이어야 합니다.');
      return;
    }
    const n = data.cards.filter((c) => (c.owners || []).includes(p.id)).length;
    if (n && !window.confirm(`"${p.name}" 담당자가 카드 ${n}장에서 빠집니다. 계속할까요?`)) return;
    onUpdate((d) => {
      const people = d.people.filter((x) => x.id !== p.id);
      if (!people.some((x) => x.me) && people.length) people[0] = { ...people[0], me: true };
      return {
        ...d,
        cards: d.cards.map((c) => ({ ...c, owners: (c.owners || []).filter((o) => o !== p.id) })),
        people,
      };
    });
  };

  const add = () =>
    onUpdate((d) => ({ ...d, people: [...d.people, { id: 'M' + Date.now().toString(36), name: '새 담당자' }] }));

  return (
    <Dlg title="담당자 고치기" onClose={onClose}>
      <div ref={rowsRef}>
        {data.people.map((p) => {
          const n = data.cards.filter((c) => (c.owners || []).includes(p.id)).length;
          return (
            <div key={p.id} className="mrow">
              <input
                type="text"
                value={p.name}
                aria-label="담당자 이름"
                onChange={(e) => rename(p.id, e.target.value)}
              />
              <label className="me">
                <input type="radio" name="me" checked={!!p.me} onChange={() => setMe(p.id)} /> 나
              </label>
              <button className="rowx" title="지우기" onClick={() => del(p)}>
                &times;
              </button>
              <span className="lused" style={{ gridColumn: '1/-1' }}>
                카드 {n}장을 맡고 있음
              </span>
            </div>
          );
        })}
        {data.people.length === 0 && <div className="empty">담당자가 없습니다.</div>}
      </div>
      <button className="newrow" onClick={add}>
        + 담당자 추가
      </button>
      <div className="dbtn">
        <button onClick={onClose}>닫기</button>
      </div>
    </Dlg>
  );
}
