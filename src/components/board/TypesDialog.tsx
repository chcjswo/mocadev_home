'use client';

import { PALETTE } from '@/lib/board/data';
import type { BoardData, EventMark, EventType } from '@/lib/board/types';
import { Dlg } from './Dlg';
import { Swatch } from './Swatch';
import { useFocusNewRow } from './useFocusNewRow';

const MARKS: Record<EventMark, string> = { none: '표시 없음', red: '숫자 빨강', bg: '칸 배경 강조' };

interface TypesDialogProps {
  data: BoardData;
  onUpdate: (fn: (d: BoardData) => BoardData) => void;
  onClose: () => void;
}

export function TypesDialog({ data, onUpdate, onClose }: TypesDialogProps) {
  const rowsRef = useFocusNewRow(data.etypes.length);

  const patch = (id: string, v: Partial<EventType>) =>
    onUpdate((d) => ({ ...d, etypes: d.etypes.map((t) => (t.id === id ? { ...t, ...v } : t)) }));

  const del = (t: EventType) => {
    if (data.etypes.length <= 1) {
      window.alert('종류는 하나 이상이어야 합니다.');
      return;
    }
    const n = data.events.filter((e) => e.type === t.id).length;
    if (n && !window.confirm(`"${t.name}" 종류의 일정 ${n}건이 함께 지워집니다. 계속할까요?`)) return;
    onUpdate((d) => ({
      ...d,
      events: d.events.filter((e) => e.type !== t.id),
      etypes: d.etypes.filter((x) => x.id !== t.id),
    }));
  };

  const add = () =>
    onUpdate((d) => ({
      ...d,
      etypes: [
        ...d.etypes,
        {
          id: 'T' + Date.now().toString(36),
          name: '새 종류',
          color: PALETTE[d.etypes.length % PALETTE.length],
          mark: 'none',
        },
      ],
    }));

  return (
    <Dlg title="일정 종류 고치기" onClose={onClose}>
      <div ref={rowsRef}>
        {data.etypes.map((t) => (
          <div key={t.id} className="trow">
            <input
              type="text"
              value={t.name}
              aria-label="종류 이름"
              onChange={(e) => patch(t.id, { name: e.target.value })}
            />
            <Swatch color={t.color} onPick={(c) => patch(t.id, { color: c })} />
            <button className="rowx" title="지우기" onClick={() => del(t)}>
              &times;
            </button>
            <select value={t.mark} onChange={(e) => patch(t.id, { mark: e.target.value as EventMark })}>
              {(Object.entries(MARKS) as [EventMark, string][]).map(([k, v]) => (
                <option key={k} value={k}>
                  달력 표시 · {v}
                </option>
              ))}
            </select>
          </div>
        ))}
        {data.etypes.length === 0 && <div className="empty">종류가 없습니다.</div>}
      </div>
      <button className="newrow" onClick={add}>
        + 종류 추가
      </button>
      <div className="dbtn">
        <button onClick={onClose}>닫기</button>
      </div>
    </Dlg>
  );
}
