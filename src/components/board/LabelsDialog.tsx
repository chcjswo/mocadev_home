'use client';

import { PALETTE } from '@/lib/board/data';
import type { BoardData, Label } from '@/lib/board/types';
import { Dlg } from './Dlg';
import { Swatch } from './Swatch';
import { useFocusNewRow } from './useFocusNewRow';

interface LabelsDialogProps {
  data: BoardData;
  onUpdate: (fn: (d: BoardData) => BoardData) => void;
  onClose: () => void;
}

export function LabelsDialog({ data, onUpdate, onClose }: LabelsDialogProps) {
  const rowsRef = useFocusNewRow(data.labels.length);

  const patch = (id: string, v: Partial<Label>) =>
    onUpdate((d) => ({ ...d, labels: d.labels.map((l) => (l.id === id ? { ...l, ...v } : l)) }));

  const del = (l: Label) => {
    const n = data.cards.filter((c) => c.labs.includes(l.id)).length;
    if (n && !window.confirm(`"${l.name}" 라벨이 카드 ${n}장에 붙어 있습니다. 지울까요?`)) return;
    onUpdate((d) => ({
      ...d,
      cards: d.cards.map((c) => ({ ...c, labs: c.labs.filter((x) => x !== l.id) })),
      labels: d.labels.filter((x) => x.id !== l.id),
    }));
  };

  const add = () =>
    onUpdate((d) => ({
      ...d,
      labels: [
        ...d.labels,
        { id: 'L' + Date.now().toString(36), name: '새 라벨', color: PALETTE[d.labels.length % PALETTE.length] },
      ],
    }));

  return (
    <Dlg title="라벨 고치기" onClose={onClose}>
      <div ref={rowsRef}>
        {data.labels.map((l) => {
          const n = data.cards.filter((c) => c.labs.includes(l.id)).length;
          return (
            <div key={l.id} className="lrow">
              <input
                type="text"
                value={l.name}
                aria-label="라벨 이름"
                onChange={(e) => patch(l.id, { name: e.target.value })}
              />
              <Swatch color={l.color} onPick={(c) => patch(l.id, { color: c })} />
              <button className="rowx" title="지우기" onClick={() => del(l)}>
                &times;
              </button>
              <span className="lused" style={{ gridColumn: '1/-1' }}>
                카드 {n}장에 붙어 있음
              </span>
            </div>
          );
        })}
        {data.labels.length === 0 && <div className="empty">라벨이 없습니다.</div>}
      </div>
      <button className="newrow" onClick={add}>
        + 라벨 추가
      </button>
      <div className="dbtn">
        <button onClick={onClose}>닫기</button>
      </div>
    </Dlg>
  );
}
