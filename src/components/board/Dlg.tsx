'use client';

import { useEffect, useRef } from 'react';

interface DlgProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

/** 네이티브 dialog 래퍼: 마운트 시 showModal, ESC·닫기 시 onClose */
export function Dlg({ title, onClose, children }: DlgProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog ref={ref} onClose={onClose}>
      <div className="dlg">
        <h3>{title}</h3>
        {children}
        {/* DOM 마지막에 두어 열릴 때 초기 포커스가 첫 입력란에 그대로 가게 한다. 위치는 CSS로 오른쪽 상단 */}
        <button type="button" className="x" aria-label="닫기" onClick={onClose}>
          ×
        </button>
      </div>
    </dialog>
  );
}
