'use client';

import { useRef, useState } from 'react';
import type { FileKind, Project } from '@/lib/board/types';
import { Dlg } from './Dlg';

export interface FileDraft {
  name: string;
  kind: FileKind;
  url: string;
}

interface FileDialogProps {
  project: Project;
  editId: string | null;
  onSave: (v: FileDraft) => void;
  onDelete: () => void;
  onClose: () => void;
}

export function FileDialog({ project, editId, onSave, onDelete, onClose }: FileDialogProps) {
  const f = editId ? project.files.find((x) => x.id === editId) : null;
  const [name, setName] = useState(f ? f.name : '');
  const [kind, setKind] = useState<FileKind>(f ? f.kind : 'folder');
  const [url, setUrl] = useState(f ? f.url : '');
  const nameRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const n = name.trim();
    const u = url.trim();
    if (!n) {
      nameRef.current?.focus();
      return;
    }
    if (!u) {
      urlRef.current?.focus();
      return;
    }
    onSave({ name: n, kind, url: u });
  };

  return (
    <Dlg title={f ? '파일 고치기' : '파일 · 폴더 추가'} onClose={onClose}>
      <div className="f">
        <label>이름</label>
        <input
          ref={nameRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="캐릭터 러프 폴더"
          autoFocus
        />
      </div>
      <div className="f">
        <label>종류</label>
        <select value={kind} onChange={(e) => setKind(e.target.value as FileKind)}>
          <option value="folder">폴더</option>
          <option value="image">그림</option>
          <option value="build">실행 파일</option>
          <option value="doc">문서</option>
          <option value="link">링크</option>
        </select>
      </div>
      <div className="f">
        <label>링크</label>
        <input
          ref={urlRef}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://drive.google.com/..."
        />
        <div className="hint">
          구글 드라이브·깃허브 링크를 넣으면 눌러서 바로 열립니다.
          <br />내 컴퓨터 폴더는 file:///C:/... 형태로 넣되, 브라우저가 막을 수 있습니다.
        </div>
      </div>
      <div className="dbtn">
        <button onClick={save}>저장</button>
        <button className="ghost" onClick={onClose}>
          취소
        </button>
        {f && (
          <button className="del" onClick={onDelete}>
            삭제
          </button>
        )}
      </div>
    </Dlg>
  );
}
