'use client';

import { LISTS } from '@/lib/board/data';
import type { BoardData } from '@/lib/board/types';
import { ddText, dleft, evCol, evName, evOn, labCol, labName, openCards, owners, proj } from '@/lib/board/utils';

interface AgendaProps {
  data: BoardData;
  today: Date;
  todayKey: string;
  selDay: string;
  onOpenCard: (cardId: number) => void;
}

export function Agenda({ data, today, todayKey, selDay, onOpenCard }: AgendaProps) {
  const isToday = selDay === todayKey;
  const dObj = new Date(selDay + 'T00:00:00');
  const title = isToday
    ? '오늘 일정'
    : dObj.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' }) + ' 일정';

  const evs = evOn(data, selDay);
  const late = isToday
    ? openCards(data).filter((c) => {
        const d = dleft(c.due, today);
        return d !== null && d < 0;
      })
    : [];
  const day = data.cards.filter((c) => c.due === selDay);
  const n = evs.length + late.length + day.length;
  const sub = isToday && late.length ? '지난 것 ' + late.length + '건 포함 · 총 ' + n + '건' : n + '건';

  return (
    <div>
      <div className="agtop">
        <b>{title}</b>
        <span className="s">{sub}</span>
      </div>
      <div>
        {/* TODO(#11): 일정 클릭 시 편집 다이얼로그 연결 */}
        {evs.map((e) => (
          <div key={e.id} className="ag">
            <span className="bar" style={{ background: evCol(data, e.type) }} />
            <span>
              <span className="agt">
                <span className="tag" style={{ background: evCol(data, e.type) }}>
                  {evName(data, e.type)}
                </span>
                {e.title}
              </span>
              {e.note && <span className="agm">{e.note}</span>}
            </span>
            <span className="agw" />
          </div>
        ))}
        {[...late, ...day].map((c) => {
          const d = dleft(c.due, today);
          return (
            <div key={c.id} className="ag" onClick={() => onOpenCard(c.id)}>
              <span className="bar" style={{ background: c.labs.length ? labCol(data, c.labs[0]) : 'var(--ink-soft)' }} />
              <span>
                <span className="agt">{c.text}</span>
                <span className="agm">
                  {proj(data, c.proj)?.name || ''} · {LISTS[c.list]}
                  {c.labs.length ? ' · ' + c.labs.map((l) => labName(data, l)).join(', ') : ''}
                </span>
              </span>
              <span className="agw">
                <b>{owners(data, c)}</b>
                {d !== null && d < 0 && <span style={{ color: 'var(--rust)' }}>{ddText(d)}</span>}
              </span>
            </div>
          );
        })}
        {n === 0 && <div className="empty">{isToday ? '오늘 할 일이 비어 있습니다.' : '이 날은 비어 있습니다.'}</div>}
      </div>
    </div>
  );
}
