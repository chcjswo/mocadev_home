/** 제작 현황판 데이터 모델 (production_status.html 프로토타입에서 확정된 스키마) */

export type EventMark = 'none' | 'red' | 'bg';

export type FileKind = 'folder' | 'image' | 'build' | 'doc' | 'link';

export type ProjectKind = '앱' | '게임';

export interface Person {
  id: string;
  name: string;
  me?: boolean;
}

export interface EventType {
  id: string;
  name: string;
  color: string;
  mark: EventMark;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface BoardEvent {
  id: string;
  date: string;
  type: string;
  title: string;
  note: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  kind: FileKind;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  kind: ProjectKind;
  stage: number;
  due: string;
  files: ProjectFile[];
}

export interface CardComment {
  id: string;
  text: string;
  /** 작성자 이메일 아이디('@' 앞부분). DB에서 읽을 때만 채워지는 읽기 전용 값 */
  author?: string;
  /** 저장 시각 (DB created_at, ISO 문자열). DB에서 읽을 때만 채워지는 읽기 전용 값 */
  at?: string;
}

export interface Card {
  id: number;
  proj: string;
  /** 0:할 일 1:진행 중 2:검토 3:완료 */
  list: number;
  text: string;
  labs: string[];
  owners: string[];
  due: string;
  /** 작성자 이메일 아이디('@' 앞부분). DB에서 읽을 때만 채워지는 읽기 전용 값 */
  creator?: string;
  /** 댓글 목록 (오래된 순). 없으면 생략 */
  comments?: CardComment[];
}

export interface BoardData {
  stages: string[];
  people: Person[];
  etypes: EventType[];
  labels: Label[];
  events: BoardEvent[];
  projects: Project[];
  cards: Card[];
}
