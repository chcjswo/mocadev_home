import type { AbstractIntlMessages } from 'next-intl';

/** 클라이언트 컴포넌트에서만 사용하는 번역 네임스페이스 */
const CLIENT_NAMESPACES = ['languageSwitcher', 'carousel'] as const;

export function pickClientMessages(messages: AbstractIntlMessages): AbstractIntlMessages {
  return Object.fromEntries(
    CLIENT_NAMESPACES.filter((key) => key in messages).map((key) => [key, messages[key]]),
  );
}
