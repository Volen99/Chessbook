export interface IStreams {
  data: IStreamsData[];

  pagination: IStreamsPagination;
}

export interface IStreamsData {
  game_id: string;
  game_name: string;
  id: string;
  language: string;
  started_at: string;
  tag_ids: string[];
  thumbnail_url: string;
  title: string;
  type: string;
  user_id: string;
  user_login: string;
  user_name: string;
  viewer_count: number;
}

export interface IStreamsPagination {
  cursor: string;
}
