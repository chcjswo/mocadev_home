'use client';

import { useState } from 'react';
import { LISTS } from '@/lib/board/data';
import type { BoardData } from '@/lib/board/types';
import { ddCls, ddText, dleft, labCol, labName, owners, proj } from '@/lib/board/utils';

interface KanbanBoardProps {
  data: BoardData;
  today: Date;
  fProj: string | null;
  onMoveCard: (cardId: number, list: number) => void;
  onOpenCard: (cardId: number | null, list?: number) => void;
  onOpenLabels: () => void;
}

export function KanbanBoard({ data, today, fProj, onMoveCard, onOpenCard, onOpenLabels }: KanbanBoardProps) {
  const [overList, setOverList] = useState<number | null>(null);

  const shown = data.cards.filter((c) => !fProj || c.proj === fProj);

  return (
    <>
      <div className="board">
        {LISTS.map((name, i) => {
          const cs = shown.filter((c) => c.list === i);
          return (
            <div
              key={i}
              className={`list${overList === i ? ' over' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setOverList(i);
              }}
              onDragLeave={() => setOverList(null)}
              onDrop={(e) => {
                e.preventDefault();
                setOverList(null);
                const id = Number(e.dataTransfer.getData('text'));
                if (data.cards.some((c) => c.id === id)) onMoveCard(id, i);
              }}
            >
              <h3>
                {name}
                <span>{cs.length}</span>
              </h3>
              {cs.map((c) => {
                const d = dleft(c.due, today);
                return (
                  <div
                    key={c.id}
                    className="c"
                    draggable
                    tabIndex={0}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text', String(c.id));
                    }}
                    onClick={() => onOpenCard(c.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        onOpenCard(c.id);
                      }
                    }}
                  >
                    {c.labs.length > 0 && (
                      <div className="labs">
                        {c.labs.map((l) => (
                          <span key={l} className="lab" style={{ background: labCol(data, l) }} title={labName(data, l)} />
                        ))}
                      </div>
                    )}
                    <div>{c.text}</div>
                    <div className="foot">
                      <span>{proj(data, c.proj)?.name || ''}</span>
                      <span>
                        {c.due && (
                          <>
                            <span className={`dd ${ddCls(d)}`}>{ddText(d)}</span> ·{' '}
                          </>
                        )}
                        {owners(data, c)}
                      </span>
                    </div>
                  </div>
                );
              })}
              <button className="add" onClick={() => onOpenCard(null, i)}>
                + 카드
              </button>
            </div>
          );
        })}
      </div>
      <div className="legend">
        <button className="edit" onClick={onOpenLabels}>
          라벨 고치기
        </button>
        <span className="keys">
          {data.labels.map((l) => (
            <span key={l.id}>
              <i style={{ background: l.color }} />
              {l.name}
            </span>
          ))}
        </span>
      </div>
    </>
  );
}
