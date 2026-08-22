'use client';

import { useEffect, useRef, useState } from 'react';
import type { BoardData } from '@/lib/board/types';
import { dleft, iso, lastStage, meId, meName, openCards, proj } from '@/lib/board/utils';
import { Agenda } from './Agenda';
import type { LastSaved } from './BoardGate';
import { Calendar } from './Calendar';
import { CardDialog, type CardDraft } from './CardDialog';
import { EventDialog, type EventDraft } from './EventDialog';
import { EventListDialog } from './EventListDialog';
import { FileDialog, type FileDraft } from './FileDialog';
import { Gauge } from './Gauge';
import { KanbanBoard } from './KanbanBoard';
import { LabelsDialog } from './LabelsDialog';
import { PeopleDialog } from './PeopleDialog';
import { ProjectDialog, type ProjectDraft } from './ProjectDialog';
import { ProjectList } from './ProjectList';
import { StagesDialog } from './StagesDialog';
import { TypesDialog } from './TypesDialog';

interface BoardAppProps {
  /** DB에서 불러온 시작 데이터 */
  initialData: BoardData;
  /** 로그인한 사용자의 프로필 이름 (헤더 표시용) */
  userName: string;
  /** 마지막 저장자·시각 (아직 저장된 적 없으면 null) */
  lastSaved: LastSaved | null;
  /** 데이터가 바뀔 때마다 호출 (DB 저장용) */
  onDataChange: (d: BoardData) => void;
  /** 로그인 게이트에서 내려주는 로그아웃 동작 */
  onLogout: () => void;
}

export function BoardApp({ initialData, userName, lastSaved, onDataChange, onLogout }: BoardAppProps) {
  const [data, setData] = useState<BoardData>(initialData);
  const [today, setToday] = useState<Date | null>(null);
  const [calY, setCalY] = useState(0);
  const [calM, setCalM] = useState(0);
  const [selDay, setSelDay] = useState('');
  const [fProj, setFProj] = useState<string | null>(null);
  /** 열려 있는 프로젝트 다이얼로그 (editId: null이면 새로 만들기) */
  const [projDlg, setProjDlg] = useState<{ editId: string | null } | null>(null);
  /** 열려 있는 파일 다이얼로그 (editId: null이면 새로 추가) */
  const [fileDlg, setFileDlg] = useState<{ editId: string | null } | null>(null);
  /** 열려 있는 카드 다이얼로그 (editId: null이면 새 카드, list: 시작 칸) */
  const [cardDlg, setCardDlg] = useState<{ editId: number | null; list: number } | null>(null);
  /** 열려 있는 일정 다이얼로그 (editId: null이면 새 일정) */
  const [eventDlg, setEventDlg] = useState<{ editId: string | null } | null>(null);
  const [eventListOpen, setEventListOpen] = useState(false);
  const [typesOpen, setTypesOpen] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [labelsOpen, setLabelsOpen] = useState(false);
  const [stagesOpen, setStagesOpen] = useState(false);
  const fileInRef = useRef<HTMLInputElement>(null);

  // 첫 렌더(불러온 데이터)는 건너뛰고, 편집이 생길 때만 저장 콜백 호출
  const skipFirstChange = useRef(true);
  useEffect(() => {
    if (skipFirstChange.current) {
      skipFirstChange.current = false;
      return;
    }
    onDataChange(data);
  }, [data, onDataChange]);

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

  /* 프로젝트 */
  const pickProj = (id: string) => setFProj(fProj === id ? null : id);

  const setStage = (id: string, stage: number) =>
    setData((d) => ({ ...d, projects: d.projects.map((p) => (p.id === id ? { ...p, stage } : p)) }));

  const saveProj = (v: ProjectDraft) => {
    const editId = projDlg?.editId ?? null;
    setData((d) =>
      editId
        ? { ...d, projects: d.projects.map((p) => (p.id === editId ? { ...p, ...v } : p)) }
        : { ...d, projects: [...d.projects, { id: 'p' + Date.now().toString(36), files: [], ...v }] },
    );
    setProjDlg(null);
  };

  const delProj = () => {
    const editId = projDlg?.editId;
    if (!editId) return;
    const n = data.cards.filter((c) => c.proj === editId).length;
    if (n && !window.confirm(`카드 ${n}장이 함께 지워집니다. 계속할까요?`)) return;
    setData((d) => ({
      ...d,
      cards: d.cards.filter((c) => c.proj !== editId),
      projects: d.projects.filter((p) => p.id !== editId),
    }));
    if (fProj === editId) setFProj(null);
    setProjDlg(null);
  };

  /* 프로젝트 파일 */
  const saveFile = (v: FileDraft) => {
    if (!fProj) return;
    const editId = fileDlg?.editId ?? null;
    setData((d) => ({
      ...d,
      projects: d.projects.map((p) =>
        p.id === fProj
          ? {
              ...p,
              files: editId
                ? p.files.map((f) => (f.id === editId ? { ...f, ...v } : f))
                : [...p.files, { id: 'F' + Date.now().toString(36), ...v }],
            }
          : p,
      ),
    }));
    setFileDlg(null);
  };

  const delFile = () => {
    const editId = fileDlg?.editId;
    if (!fProj || !editId) return;
    setData((d) => ({
      ...d,
      projects: d.projects.map((p) => (p.id === fProj ? { ...p, files: p.files.filter((f) => f.id !== editId) } : p)),
    }));
    setFileDlg(null);
  };

  /* 카드 */
  const openCard = (editId: number | null, list = 0) => {
    if (editId === null && !data.projects.length) {
      window.alert('먼저 프로젝트를 추가하세요.');
      return;
    }
    setCardDlg({ editId, list });
  };

  const moveCard = (cardId: number, list: number) =>
    setData((d) => ({ ...d, cards: d.cards.map((c) => (c.id === cardId ? { ...c, list } : c)) }));

  const saveCard = (v: CardDraft) => {
    const editId = cardDlg?.editId ?? null;
    setData((d) =>
      editId !== null
        ? { ...d, cards: d.cards.map((c) => (c.id === editId ? { ...c, ...v } : c)) }
        : {
            ...d,
            // 불러온 JSON에 숫자 아닌 id가 섞여 있어도 새 id가 NaN이 되지 않게 거른다
            cards: [
              ...d.cards,
              { id: Math.max(99, ...d.cards.map((c) => Number(c.id)).filter((n) => !isNaN(n))) + 1, ...v },
            ],
          },
    );
    setCardDlg(null);
  };

  const delCard = () => {
    const editId = cardDlg?.editId;
    if (editId == null) return;
    setData((d) => ({ ...d, cards: d.cards.filter((c) => c.id !== editId) }));
    setCardDlg(null);
  };

  /* 일정 */
  const saveEvent = (v: EventDraft) => {
    const editId = eventDlg?.editId ?? null;
    setData((d) =>
      editId
        ? { ...d, events: d.events.map((e) => (e.id === editId ? { ...e, ...v } : e)) }
        : { ...d, events: [...d.events, { id: 'E' + Date.now().toString(36), ...v }] },
    );
    setEventDlg(null);
  };

  const delEvent = () => {
    const editId = eventDlg?.editId;
    if (!editId) return;
    setData((d) => ({ ...d, events: d.events.filter((e) => e.id !== editId) }));
    setEventDlg(null);
  };

  /* 저장 · 불러오기 */
  const saveJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '현황판-' + todayKey + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const loadJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(String(r.result)) as BoardData;
        if (!d.projects || !d.cards) throw new Error('형식이 다릅니다');
        d.people = d.people || [{ id: 'M1', name: '나', me: true }];
        d.projects.forEach((p) => (p.files = p.files || []));
        setData(d);
        setFProj(null);
      } catch (err) {
        window.alert('불러오지 못했습니다: ' + (err instanceof Error ? err.message : String(err)));
      }
      e.target.value = '';
    };
    r.readAsText(file);
  };

  const selProj = fProj ? proj(data, fProj) : undefined;

  return (
    <div className="wrap">
      <header>
        <h1>제작 현황판</h1>
        <span className="htools">
          <span className="stamp">{stamp}</span>
          {lastSaved && (
            <span className="stamp">
              마지막 저장: {lastSaved.name} · {new Date(lastSaved.at).toLocaleString('ko-KR')}
            </span>
          )}
          <span className="who">{userName}</span>
          <button onClick={saveJson}>파일로 저장</button>
          <button onClick={() => fileInRef.current?.click()}>불러오기</button>
          <button onClick={() => setPeopleOpen(true)}>담당자</button>
          <button onClick={onLogout}>로그아웃</button>
          <input ref={fileInRef} type="file" accept=".json,application/json" hidden onChange={loadJson} />
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
          onOpenEventList={() => setEventListOpen(true)}
          onOpenTypes={() => setTypesOpen(true)}
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
            <Agenda
              data={data}
              today={today}
              todayKey={todayKey}
              selDay={selDay}
              onOpenCard={openCard}
              onOpenEvent={(id) => setEventDlg({ editId: id })}
            />
          </div>
        </section>
      </div>

      <div className="grid">
        <ProjectList
          data={data}
          today={today}
          fProj={fProj}
          onPick={pickProj}
          onShowAll={() => setFProj(null)}
          onEdit={(id) => setProjDlg({ editId: id })}
        />

        <section className="panel">
          {selProj && (
            <Gauge
              data={data}
              today={today}
              project={selProj}
              onSetStage={(s) => setStage(selProj.id, s)}
              onEditFile={(id) => setFileDlg({ editId: id })}
              onOpenStages={() => setStagesOpen(true)}
            />
          )}
          <h2>
            카드 <span className="side">{selProj ? selProj.name : '전체'}</span>
          </h2>
          <KanbanBoard
            data={data}
            today={today}
            fProj={fProj}
            onMoveCard={moveCard}
            onOpenCard={openCard}
            onOpenLabels={() => setLabelsOpen(true)}
          />
        </section>
      </div>

      {projDlg && (
        <ProjectDialog
          data={data}
          editId={projDlg.editId}
          onSave={saveProj}
          onDelete={delProj}
          onClose={() => setProjDlg(null)}
        />
      )}
      {fileDlg && selProj && (
        <FileDialog
          project={selProj}
          editId={fileDlg.editId}
          onSave={saveFile}
          onDelete={delFile}
          onClose={() => setFileDlg(null)}
        />
      )}
      {typesOpen && <TypesDialog data={data} onUpdate={setData} onClose={() => setTypesOpen(false)} />}
      {peopleOpen && <PeopleDialog data={data} onUpdate={setData} onClose={() => setPeopleOpen(false)} />}
      {labelsOpen && <LabelsDialog data={data} onUpdate={setData} onClose={() => setLabelsOpen(false)} />}
      {stagesOpen && <StagesDialog data={data} onUpdate={setData} onClose={() => setStagesOpen(false)} />}
      {eventListOpen && (
        <EventListDialog
          data={data}
          today={today}
          onEdit={(id) => setEventDlg({ editId: id })}
          onNew={() => setEventDlg({ editId: null })}
          onClose={() => setEventListOpen(false)}
        />
      )}
      {eventDlg && (
        <EventDialog
          data={data}
          editId={eventDlg.editId}
          initialDate={selDay}
          onSave={saveEvent}
          onDelete={delEvent}
          onClose={() => setEventDlg(null)}
        />
      )}
      {cardDlg && (
        <CardDialog
          data={data}
          editId={cardDlg.editId}
          initialList={cardDlg.list}
          fProj={fProj}
          onSave={saveCard}
          onDelete={delCard}
          onClose={() => setCardDlg(null)}
        />
      )}

      <footer>
        데이터는 Supabase에 저장되어 로그인한 사용자끼리 공유됩니다. <b>파일로 저장</b>·<b>불러오기</b>는 백업·복원
        용도입니다.
      </footer>
    </div>
  );
}
