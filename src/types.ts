export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

export type ActionType =
  | 'none'
  | 'navigate'
  | 'call-service'
  | 'url'
  | 'next'
  | 'previous'
  | 'toggle-info'
  | 'add-to-watchlist';

export interface Action {
  action: ActionType;
  navigation_path?: string;
  service?: string;
  service_data?: Record<string, unknown>;
  url_path?: string;
}

export interface CardConfig {
  tmdb_api_key: string;
  source: 'now_playing' | 'popular' | 'top_rated' | 'trending_day' | 'trending_week';
  region: string;
  cache_hours: number;

  display_time: number;
  transition: 'fade' | 'none';
  transition_duration: number;
  shuffle: boolean;
  pause_on_hover: boolean;

  show_overlay: boolean;
  show_title: boolean;
  show_year: boolean;
  show_rating: boolean;
  show_synopsis: boolean;
  synopsis_lines: number;
  show_progress_bar: boolean;
  progress_bar_position: 'bottom' | 'top';
  show_clock: boolean;
  clock_format: '12h' | '24h';

  overlay_style: 'gradient' | 'solid' | 'frosted';
  overlay_color: string;
  overlay_opacity: number;
  overlay_position: 'bottom' | 'top' | 'center';
  title_color: string;
  title_size: 'sm' | 'md' | 'lg' | 'xl';
  title_weight: 'normal' | 'bold';
  meta_color: string;
  synopsis_color: string;
  text_shadow: boolean;

  tap_action: Action;
  double_tap_action: Action;
  swipe_left_action: Action;
  swipe_right_action: Action;
  swipe_threshold: number;

  watchlist_entity?: string;
  watchlist_item_format: string;
  watchlist_confirm: boolean;
  watchlist_no_duplicates: boolean;
}

export const DEFAULT_CONFIG: Omit<CardConfig, 'tmdb_api_key'> = {
  source: 'now_playing',
  region: 'US',
  cache_hours: 6,

  display_time: 30,
  transition: 'fade',
  transition_duration: 1.0,
  shuffle: true,
  pause_on_hover: true,

  show_overlay: true,
  show_title: true,
  show_year: true,
  show_rating: true,
  show_synopsis: true,
  synopsis_lines: 3,
  show_progress_bar: true,
  progress_bar_position: 'bottom',
  show_clock: false,
  clock_format: '24h',

  overlay_style: 'gradient',
  overlay_color: '#000000',
  overlay_opacity: 0.7,
  overlay_position: 'bottom',
  title_color: '#ffffff',
  title_size: 'lg',
  title_weight: 'bold',
  meta_color: '#cccccc',
  synopsis_color: '#aaaaaa',
  text_shadow: true,

  tap_action: { action: 'none' },
  double_tap_action: { action: 'add-to-watchlist' },
  swipe_left_action: { action: 'next' },
  swipe_right_action: { action: 'previous' },
  swipe_threshold: 50,

  watchlist_item_format: '{title} ({year}) — {rating}/10',
  watchlist_confirm: true,
  watchlist_no_duplicates: true,
};
