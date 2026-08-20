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
      </div>
    </dialog>
  );
}
