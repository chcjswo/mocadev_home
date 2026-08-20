'use client';

import { FKIND } from '@/lib/board/data';
import type { Project } from '@/lib/board/types';
import type { BoardData } from '@/lib/board/types';
import { ddCls, ddText, dleft, openOf } from '@/lib/board/utils';

interface GaugeProps {
  data: BoardData;
  today: Date;
  project: Project;
  onSetStage: (stage: number) => void;
  onEditFile: (fileId: string | null) => void;
}

export function Gauge({ data, today, project: p, onSetStage, onEditFile }: GaugeProps) {
  const d = dleft(p.due, today);
  const files = p.files || [];

  return (
    <div className="gauge">
      <div className="gtop">
        <b>{p.name}</b>
        <span className={`gd ${ddCls(d)}`}>{p.due ? p.due.replace(/-/g, '.') + ' · ' + ddText(d) : '마감 없음'}</span>
      </div>
      <div className="gbar">
        {data.stages.map((s, i) => (
          <button
            key={i}
            className={`gstep ${i < p.stage ? 'done' : ''} ${i === p.stage ? 'now' : ''}`}
            title={`${s} 단계로 옮기기`}
            onClick={() => onSetStage(i)}
          >
            <i />
            <span>{s}</span>
          </button>
        ))}
      </div>
      <div className="ghint">
        <span>단계를 누르면 옮겨집니다 · 남은 카드 {openOf(data, p.id)}</span>
        {/* TODO(#11): 단계 편집 다이얼로그 연결 */}
        <button>단계 고치기</button>
      </div>
      <div className="files">
        <span className="flabel">보관함</span>
        {files.map((f) => (
          <span key={f.id} className="fchip">
            <span className="ic">{FKIND[f.kind] || '🔗'}</span>
            <a href={f.url} target="_blank" rel="noopener noreferrer">
              {f.name}
            </a>
            <button className="pen" title="고치기" onClick={() => onEditFile(f.id)}>
              &#9998;
            </button>
          </span>
        ))}
        <button className="faddb" onClick={() => onEditFile(null)}>
          + 파일 · 폴더
        </button>
      </div>
    </div>
  );
}
