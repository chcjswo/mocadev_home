'use client';

import { useRef, useState } from 'react';
import type { BoardData, ProjectKind } from '@/lib/board/types';
import { lastStage, proj } from '@/lib/board/utils';
import { Dlg } from './Dlg';

export interface ProjectDraft {
  name: string;
  kind: ProjectKind;
  stage: number;
  due: string;
}

interface ProjectDialogProps {
  data: BoardData;
  editId: string | null;
  onSave: (v: ProjectDraft) => void;
  onDelete: () => void;
  onClose: () => void;
}

export function ProjectDialog({ data, editId, onSave, onDelete, onClose }: ProjectDialogProps) {
  const p = editId ? proj(data, editId) : null;
  const [name, setName] = useState(p ? p.name : '');
  const [kind, setKind] = useState<ProjectKind>(p ? p.kind : '게임');
  const [stage, setStage] = useState(p ? Math.min(p.stage, lastStage(data)) : 0);
  const [due, setDue] = useState(p ? p.due : '');
  const nameRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const n = name.trim();
    if (!n) {
      nameRef.current?.focus();
      return;
    }
    onSave({ name: n, kind, stage, due });
  };

  return (
    <Dlg title={p ? '프로젝트 고치기' : '새 프로젝트'} onClose={onClose}>
      <div className="f">
        <label>이름</label>
        <input ref={nameRef} type="text" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
      </div>
      <div className="two">
        <div className="f">
          <label>분류</label>
          <select value={kind} onChange={(e) => setKind(e.target.value as ProjectKind)}>
            <option>앱</option>
            <option>게임</option>
          </select>
        </div>
        <div className="f">
          <label>단계</label>
          <select value={stage} onChange={(e) => setStage(Number(e.target.value))}>
            {data.stages.map((s, i) => (
              <option key={i} value={i}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="f">
        <label>마감</label>
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
      </div>
      <div className="dbtn">
        <button onClick={save}>저장</button>
        <button className="ghost" onClick={onClose}>
          취소
        </button>
        {p && (
          <button className="del" onClick={onDelete}>
            삭제
          </button>
        )}
      </div>
    </Dlg>
  );
}
