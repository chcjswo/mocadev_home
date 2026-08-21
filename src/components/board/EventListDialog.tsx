'use client';

import type { BoardData } from '@/lib/board/types';
import { ddText, dleft, evCol, evName } from '@/lib/board/utils';
import { Dlg } from './Dlg';

interface EventListDialogProps {
  data: BoardData;
  today: Date;
  onEdit: (eventId: string) => void;
  onNew: () => void;
  onClose: () => void;
}

export function EventListDialog({ data, today, onEdit, onNew, onClose }: EventListDialogProps) {
  const list = [...data.events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <Dlg title="일정 목록" onClose={onClose}>
      <div className="evlist">
        {list.map((e) => {
          const d = dleft(e.date, today);
          return (
            <div key={e.id} className="evrow" onClick={() => onEdit(e.id)}>
              <span className="b" style={{ background: evCol(data, e.type) }} />
              <span>
                <span className="t">{e.title}</span>
                <span className="m">
                  {e.date.replace(/-/g, '.')} · {evName(data, e.type)}
                  {d !== null ? ' · ' + ddText(d) : ''}
                  {e.note ? ' · ' + e.note : ''}
                </span>
              </span>
              <button className="pen">&#9998;</button>
            </div>
          );
        })}
        {list.length === 0 && <div className="empty">등록된 일정이 없습니다.</div>}
      </div>
      <button className="newrow" onClick={onNew}>
        + 일정 추가
      </button>
      <div className="dbtn">
        <button onClick={onClose}>닫기</button>
      </div>
    </Dlg>
  );
}
