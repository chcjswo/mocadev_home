'use client';

import { useRef, useState } from 'react';
import type { BoardData } from '@/lib/board/types';
import { Dlg } from './Dlg';

export interface EventDraft {
  title: string;
  type: string;
  date: string;
  note: string;
}

interface EventDialogProps {
  data: BoardData;
  editId: string | null;
  /** 새 일정일 때 기본 날짜 */
  initialDate: string;
  onSave: (v: EventDraft) => void;
  onDelete: () => void;
  onClose: () => void;
}

export function EventDialog({ data, editId, initialDate, onSave, onDelete, onClose }: EventDialogProps) {
  const e = editId ? data.events.find((x) => x.id === editId) : undefined;
  const [title, setTitle] = useState(e ? e.title : '');
  const [type, setType] = useState(e ? e.type : data.etypes[0]?.id || '');
  const [date, setDate] = useState(e ? e.date : initialDate);
  const [note, setNote] = useState(e ? e.note : '');
  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const t = title.trim();
    if (!t) {
      titleRef.current?.focus();
      return;
    }
    if (!date) {
      dateRef.current?.focus();
      return;
    }
    onSave({ title: t, type, date, note: note.trim() });
  };

  return (
    <Dlg title={e ? '일정 고치기' : '새 일정'} onClose={onClose}>
      <div className="f">
        <label>제목</label>
        <input ref={titleRef} type="text" value={title} onChange={(ev) => setTitle(ev.target.value)} autoFocus />
      </div>
      <div className="two">
        <div className="f">
          <label>종류</label>
          <select value={type} onChange={(ev) => setType(ev.target.value)}>
            {data.etypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="f">
          <label>날짜</label>
          <input ref={dateRef} type="date" value={date} onChange={(ev) => setDate(ev.target.value)} />
        </div>
      </div>
      <div className="f">
        <label>메모</label>
        <textarea value={note} onChange={(ev) => setNote(ev.target.value)} />
      </div>
      <div className="dbtn">
        <button onClick={save}>저장</button>
        <button className="ghost" onClick={onClose}>
          취소
        </button>
        {e && (
          <button className="del" onClick={onDelete}>
            삭제
          </button>
        )}
      </div>
    </Dlg>
  );
}
