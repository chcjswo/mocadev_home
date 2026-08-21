'use client';

import type { BoardData } from '@/lib/board/types';
import { etype, evCol, evOn, labCol, pad } from '@/lib/board/utils';

const DOW = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarProps {
  data: BoardData;
  todayKey: string;
  calY: number;
  calM: number;
  selDay: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onSelectDay: (day: string) => void;
  onOpenEventList: () => void;
}

export function Calendar({
  data,
  todayKey,
  calY,
  calM,
  selDay,
  onPrev,
  onNext,
  onToday,
  onSelectDay,
  onOpenEventList,
}: CalendarProps) {
  const start = new Date(calY, calM, 1).getDay();
  const last = new Date(calY, calM + 1, 0).getDate();

  const days = [];
  for (let d = 1; d <= last; d++) {
    const key = calY + '-' + pad(calM + 1) + '-' + pad(d);
    const dow = new Date(calY, calM, d).getDay();
    const evs = evOn(data, key);
    const dues = data.cards.filter((c) => c.due === key && c.list < 3);
    const marks = evs.map((e) => etype(data, e.type).mark);
    const mk = marks.includes('bg') ? ' mk-bg' : marks.includes('red') ? ' mk-red' : '';
    const dots = [...evs.map((e) => evCol(data, e.type)), ...dues.map((c) => labCol(data, c.labs[0]))];
    const extra = dots.length - 4;
    days.push(
      <button
        key={key}
        className={`day${key === todayKey ? ' today' : ''}${key === selDay ? ' sel' : ''}${
          dow === 0 || dow === 6 ? ' wk' : ''
        }${mk}`}
        title={evs.map((e) => e.title).join(', ')}
        onClick={() => onSelectDay(key)}
      >
        <span className="num">{d}</span>
        {dots.length > 0 && (
          <span className="dots">
            {dots.slice(0, 4).map((c, i) => (
              <i key={i} style={{ background: c }} />
            ))}
            {extra > 0 && <span className="more">+{extra}</span>}
          </span>
        )}
      </button>,
    );
  }

  return (
    <section className="panel">
      <div className="cal-top">
        <span className="cal-mon">
          {calY}.{pad(calM + 1)}
        </span>
        <span className="nav">
          <button className="today-b" onClick={onToday}>
            오늘
          </button>
          <button aria-label="이전 달" onClick={onPrev}>
            &lsaquo;
          </button>
          <button aria-label="다음 달" onClick={onNext}>
            &rsaquo;
          </button>
        </span>
      </div>
      <div className="cal">
        {DOW.map((d, i) => (
          <div key={d} className={`dow${i === 0 || i === 6 ? ' wk' : ''}`}>
            {d}
          </div>
        ))}
        {Array.from({ length: start }, (_, i) => (
          <div key={'out' + i} className="day out" />
        ))}
        {days}
      </div>
      <div className="calleg">
        {/* TODO(#11): 종류 편집 다이얼로그 연결 */}
        <button onClick={onOpenEventList}>일정</button>
        <span className="keys">
          {data.etypes.map((t) => (
            <span key={t.id}>
              <i style={{ background: t.color }} />
              {t.name}
            </span>
          ))}
        </span>
        <button className="last">종류</button>
      </div>
    </section>
  );
}
