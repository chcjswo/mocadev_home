'use client';

import { useEffect, useRef } from 'react';

/** 행 편집 다이얼로그에서 새 행이 추가되면 마지막 행의 이름 입력칸에 포커스 (원본 동작) */
export function useFocusNewRow(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const prev = useRef(count);

  useEffect(() => {
    if (count > prev.current) {
      const inputs = ref.current?.querySelectorAll<HTMLInputElement>('input[type=text]');
      const last = inputs?.[inputs.length - 1];
      last?.focus();
      last?.select();
    }
    prev.current = count;
  }, [count]);

  return ref;
}
