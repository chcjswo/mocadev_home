'use client';

import { useRef, useState } from 'react';
import { LISTS } from '@/lib/board/data';
import type { BoardData } from '@/lib/board/types';
import { meId } from '@/lib/board/utils';
import { Dlg } from './Dlg';

export interface CardDraft {
  text: string;
  proj: string;
  list: number;
  labs: string[];
  owners: string[];
  due: string;
}

interface CardDialogProps {
  data: BoardData;
  editId: number | null;
  /** 새 카드일 때 시작 칸 */
  initialList: number;
  fProj: string | null;
  onSave: (v: CardDraft) => void;
  onDelete: () => void;
  onClose: () => void;
}

export function CardDialog({ data, editId, initialList, fProj, onSave, onDelete, onClose }: CardDialogProps) {
  const c = editId !== null ? data.cards.find((x) => x.id === editId) : undefined;
  const me = meId(data);
  const [text, setText] = useState(c ? c.text : '');
  const [projId, setProjId] = useState(c ? c.proj : fProj || data.projects[0]?.id || '');
  const [list, setList] = useState(c ? c.list : initialList);
  const [labs, setLabs] = useState<string[]>(c ? [...c.labs] : []);
  const [own, setOwn] = useState<string[]>(c ? [...(c.owners || [])] : me ? [me] : []);
  const [due, setDue] = useState(c ? c.due : '');
  const textRef = useRef<HTMLTextAreaElement>(null);

  const toggle = (arr: string[], set: (v: string[]) => void, id: string) =>
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  const save = () => {
    const t = text.trim();
    if (!t) {
      textRef.current?.focus();
      return;
    }
    onSave({ text: t, proj: projId, list, labs: [...labs], owners: [...own], due });
  };

  return (
    <Dlg title={c ? '카드 고치기' : '새 카드'} onClose={onClose}>
      <div className="f">
        <label>할 일</label>
        <textarea ref={textRef} value={text} onChange={(e) => setText(e.target.value)} autoFocus />
      </div>
      <div className="two">
        <div className="f">
          <label>프로젝트</label>
          <select value={projId} onChange={(e) => setProjId(e.target.value)}>
            {data.projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="f">
          <label>칸</label>
          <select value={list} onChange={(e) => setList(Number(e.target.value))}>
            {LISTS.map((n, i) => (
              <option key={i} value={i}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="f">
        <label>라벨</label>
        <div className="pick">
          {data.labels.length === 0 && <span className="hint">라벨이 없습니다.</span>}
          {data.labels.map((l) => (
            <button key={l.id} type="button" aria-pressed={labs.includes(l.id)} onClick={() => toggle(labs, setLabs, l.id)}>
              <i style={{ background: l.color }} />
              {l.name}
            </button>
          ))}
        </div>
      </div>
      <div className="f">
        <label>담당</label>
        <div className="pick">
          {data.people.length === 0 && <span className="hint">담당자가 없습니다.</span>}
          {data.people.map((p) => (
            <button key={p.id} type="button" aria-pressed={own.includes(p.id)} onClick={() => toggle(own, setOwn, p.id)}>
              {p.name}
            </button>
          ))}
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
        {c && (
          <button className="del" onClick={onDelete}>
            삭제
          </button>
        )}
      </div>
    </Dlg>
  );
}
