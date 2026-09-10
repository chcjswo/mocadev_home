'use client';

import { useRef, useState } from 'react';
import { LIST_ORDER, LISTS } from '@/lib/board/data';
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
  /** 새 카드일 때 기본 마감일 (YYYY-MM-DD) */
  todayKey: string;
  fProj: string | null;
  onSave: (v: CardDraft) => void;
  onDelete: () => void;
  /** 댓글 등록 (기존 카드에서만). 카드 저장/취소와 무관하게 즉시 반영된다 */
  onAddComment: (text: string) => void;
  onClose: () => void;
}

/** 댓글 저장 시각을 '월/일 시:분'으로. 아직 DB에서 안 온 값(undefined)은 빈 칸 */
const fmtAt = (at?: string) => {
  if (!at) return '';
  const d = new Date(at);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export function CardDialog({
  data,
  editId,
  initialList,
  todayKey,
  fProj,
  onSave,
  onDelete,
  onAddComment,
  onClose,
}: CardDialogProps) {
  const c = editId !== null ? data.cards.find((x) => x.id === editId) : undefined;
  const me = meId(data);
  const [text, setText] = useState(c ? c.text : '');
  const [projId, setProjId] = useState(c ? c.proj : fProj || data.projects[0]?.id || '');
  const [list, setList] = useState(c ? c.list : initialList);
  const [labs, setLabs] = useState<string[]>(c ? [...c.labs] : []);
  const [own, setOwn] = useState<string[]>(c ? [...(c.owners || [])] : me ? [me] : []);
  const [due, setDue] = useState(c ? c.due : todayKey);
  const [cmt, setCmt] = useState('');
  const textRef = useRef<HTMLTextAreaElement>(null);

  const addComment = () => {
    const t = cmt.trim();
    if (!t) return;
    onAddComment(t);
    setCmt('');
  };

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
        <textarea ref={textRef} rows={6} value={text} onChange={(e) => setText(e.target.value)} autoFocus />
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
            {LIST_ORDER.map((i) => (
              <option key={i} value={i}>
                {LISTS[i]}
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
      {c?.creator && (
        <div className="f">
          <label>작성</label>
          <span className="hint">{c.creator}</span>
        </div>
      )}
      {c && (
        <div className="f">
          <label>댓글</label>
          <div className="cmt-in">
            <input
              value={cmt}
              placeholder="댓글을 입력하고 Enter"
              onChange={(e) => setCmt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  addComment();
                }
              }}
            />
            <button type="button" onClick={addComment}>
              등록
            </button>
          </div>
          {/* 최근 댓글이 입력창 바로 아래 오도록 뒤집어 보여준다 */}
          <ul className="cmts">
            {[...(c.comments ?? [])].reverse().map((m) => (
              <li key={m.id}>
                <span>{m.text}</span>
                <small>
                  {m.author} {fmtAt(m.at)}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
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
