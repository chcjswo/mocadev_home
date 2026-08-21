'use client';

import type { BoardData } from '@/lib/board/types';
import { Dlg } from './Dlg';
import { useFocusNewRow } from './useFocusNewRow';

interface StagesDialogProps {
  data: BoardData;
  onUpdate: (fn: (d: BoardData) => BoardData) => void;
  onClose: () => void;
}

export function StagesDialog({ data, onUpdate, onClose }: StagesDialogProps) {
  const rowsRef = useFocusNewRow(data.stages.length);

  const rename = (i: number, name: string) =>
    onUpdate((d) => ({ ...d, stages: d.stages.map((s, j) => (j === i ? name : s)) }));

  const swap = (i: number, j: number) =>
    onUpdate((d) => {
      const stages = [...d.stages];
      [stages[i], stages[j]] = [stages[j], stages[i]];
      return {
        ...d,
        stages,
        projects: d.projects.map((p) => (p.stage === i ? { ...p, stage: j } : p.stage === j ? { ...p, stage: i } : p)),
      };
    });

  const del = (i: number) => {
    if (data.stages.length <= 2) {
      window.alert('단계는 두 개 이상이어야 합니다.');
      return;
    }
    const n = data.projects.filter((p) => p.stage === i).length;
    if (n && !window.confirm(`이 단계에 있는 프로젝트 ${n}건이 앞 단계로 옮겨집니다. 계속할까요?`)) return;
    onUpdate((d) => ({
      ...d,
      stages: d.stages.filter((_, j) => j !== i),
      projects: d.projects.map((p) =>
        p.stage > i ? { ...p, stage: p.stage - 1 } : p.stage === i ? { ...p, stage: Math.max(0, i - 1) } : p,
      ),
    }));
  };

  const add = () => onUpdate((d) => ({ ...d, stages: [...d.stages, '새 단계'] }));

  return (
    <Dlg title="단계 고치기" onClose={onClose}>
      <div ref={rowsRef}>
        {data.stages.map((s, i) => (
          <div key={i} className="srow">
            <span className="idx">{i + 1}</span>
            <input type="text" value={s} aria-label="단계 이름" onChange={(e) => rename(i, e.target.value)} />
            <span>
              <button className="mv" disabled={i === 0} onClick={() => swap(i, i - 1)}>
                &uarr;
              </button>
              <button className="mv" disabled={i === data.stages.length - 1} onClick={() => swap(i, i + 1)}>
                &darr;
              </button>
            </span>
            <button className="rowx" title="지우기" onClick={() => del(i)}>
              &times;
            </button>
          </div>
        ))}
      </div>
      <button className="newrow" onClick={add}>
        + 단계 추가
      </button>
      <div className="dbtn">
        <button onClick={onClose}>닫기</button>
      </div>
    </Dlg>
  );
}
