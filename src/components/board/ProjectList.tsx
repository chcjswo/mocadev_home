'use client';

import type { BoardData, ProjectKind } from '@/lib/board/types';
import { ddCls, ddText, dleft, openOf } from '@/lib/board/utils';

const KINDS: ProjectKind[] = ['앱', '게임'];

interface ProjectListProps {
  data: BoardData;
  today: Date;
  fProj: string | null;
  onPick: (id: string) => void;
  onShowAll: () => void;
  onEdit: (id: string | null) => void;
}

export function ProjectList({ data, today, fProj, onPick, onShowAll, onEdit }: ProjectListProps) {
  const groups = KINDS.map((k) => ({ kind: k, projects: data.projects.filter((p) => p.kind === k) })).filter(
    (g) => g.projects.length > 0,
  );

  return (
    <section className="panel">
      <h2>앱 · 게임</h2>
      <button className="allbtn" data-sel={fProj ? 0 : 1} onClick={onShowAll}>
        전체 보기
      </button>
      <div>
        {groups.length === 0 && <div className="empty">프로젝트가 없습니다.</div>}
        {groups.map((g) => (
          <div key={g.kind}>
            <div className="group">{g.kind}</div>
            {g.projects.map((p) => {
              const d = dleft(p.due, today);
              return (
                <div key={p.id} className="pitem" data-sel={fProj === p.id ? 1 : 0} onClick={() => onPick(p.id)}>
                  <span>{p.name}</span>
                  <span className="cnt">{openOf(data, p.id)}</span>
                  <span className={`dd ${ddCls(d)}`}>{p.due ? ddText(d) : '—'}</span>
                  <button
                    className="pen"
                    title="고치기"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(p.id);
                    }}
                  >
                    &#9998;
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button className="newproj" onClick={() => onEdit(null)}>
        + 프로젝트 추가
      </button>
    </section>
  );
}
