'use client';

import { useEffect, useState } from 'react';
import { INITIAL_DATA } from '@/lib/board/data';
import type { BoardData } from '@/lib/board/types';
import { dleft, iso, lastStage, meId, meName, openCards } from '@/lib/board/utils';
import { Agenda } from './Agenda';
import { Calendar } from './Calendar';

export function BoardApp() {
  const [data, setData] = useState<BoardData>(INITIAL_DATA);
  const [today, setToday] = useState<Date | null>(null);
  const [calY, setCalY] = useState(0);
  const [calM, setCalM] = useState(0);
  const [selDay, setSelDay] = useState('');

  // 원본과 동일하게 순수 클라이언트 렌더링 (오늘 날짜는 브라우저 기준)
  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setToday(t);
    setCalY(t.getFullYear());
    setCalM(t.getMonth());
    setSelDay(iso(t));
  }, []);

  if (!today) return null;

  const todayKey = iso(today);
  const stamp = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });

  /* 통계 */
  const open = openCards(data);
  const me = meId(data);
  const over = open.filter((c) => {
    const d = dleft(c.due, today);
    return d !== null && d < 0;
  }).length;
  const soon = open.filter((c) => {
    const d = dleft(c.due, today);
    return d !== null && d >= 0 && d <= 7;
  }).length;
  const nProj = data.projects.filter((p) => p.stage < lastStage(data)).length;
  const nMine = open.filter((c) => (c.owners || []).includes(me)).length;

  const goPrev = () => {
    if (calM === 0) {
      setCalM(11);
      setCalY(calY - 1);
    } else {
      setCalM(calM - 1);
    }
  };
  const goNext = () => {
    if (calM === 11) {
      setCalM(0);
      setCalY(calY + 1);
    } else {
      setCalM(calM + 1);
    }
  };
  const goToday = () => {
    setCalY(today.getFullYear());
    setCalM(today.getMonth());
    setSelDay(todayKey);
  };

  return (
    <div className="wrap">
      <header>
        <h1>제작 현황판</h1>
        <span className="htools">
          <span className="stamp">{stamp}</span>
          {/* TODO(#11): 저장/불러오기/담당자 다이얼로그 연결 */}
          <button>파일로 저장</button>
          <button>불러오기</button>
          <button>담당자</button>
        </span>
      </header>

      <div className="grid">
        <Calendar
          data={data}
          todayKey={todayKey}
          calY={calY}
          calM={calM}
          selDay={selDay}
          onPrev={goPrev}
          onNext={goNext}
          onToday={goToday}
          onSelectDay={setSelDay}
        />

        <section className="panel">
          <div className="tsplit">
            <div className="nums">
              <div>
                <span className="n">{nProj}</span>
                <span className="l">진행 프로젝트</span>
              </div>
              <div>
                <span className="n">{nMine}</span>
                <span className="l">{meName(data)} 할 일</span>
              </div>
              <div className={over ? 'bad' : 'warn'}>
                <span className="n">{over + soon}</span>
                <span className="l">마감 임박</span>
                <span className="sub">{over ? '지난 것 ' + over : ''}</span>
              </div>
            </div>
            <Agenda data={data} today={today} todayKey={todayKey} selDay={selDay} />
          </div>
        </section>
      </div>

      <footer>
        데이터는 브라우저 안에만 있습니다. <b>파일로 저장</b>을 눌러 내려받고, 다음에 <b>불러오기</b>로 되살립니다.
      </footer>
    </div>
  );
}
