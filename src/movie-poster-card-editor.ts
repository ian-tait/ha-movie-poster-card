import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { CardConfig } from './types';

const SCHEMA: any[] = [
  // Always-visible required field
  {
    name: 'tmdb_api_key',
    required: true,
    selector: { text: { type: 'password' } },
  },

  // Source & timing
  {
    type: 'expandable',
    title: 'Source & timing',
    schema: [
      {
        name: 'source',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'now_playing',   label: 'Now Playing' },
              { value: 'popular',       label: 'Popular' },
              { value: 'top_rated',     label: 'Top Rated' },
              { value: 'trending_day',  label: 'Trending Today' },
              { value: 'trending_week', label: 'Trending This Week' },
            ],
          },
        },
      },
      { name: 'region',       selector: { text: {} } },
      { name: 'display_time', selector: { number: { min: 5, max: 300, step: 5, mode: 'box', unit_of_measurement: 's' } } },
      {
        name: 'transition',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'fade', label: 'Fade' },
              { value: 'none', label: 'None' },
            ],
          },
        },
      },
    ],
  },

  // Watchlist
  {
    type: 'expandable',
    title: 'Watchlist',
    schema: [
      { name: 'watchlist_entity',      selector: { entity: { domain: 'todo' } } },
      { name: 'watchlist_item_format', selector: { text: {} } },
      { name: 'watchlist_confirm',     selector: { boolean: {} } },
      { name: 'watchlist_no_duplicates', selector: { boolean: {} } },
    ],
  },

  // Overlay
  {
    type: 'expandable',
    title: 'Overlay & display',
    schema: [
      { name: 'show_overlay',       selector: { boolean: {} } },
      { name: 'show_title',         selector: { boolean: {} } },
      { name: 'show_year',          selector: { boolean: {} } },
      { name: 'show_rating',        selector: { boolean: {} } },
      { name: 'show_synopsis',      selector: { boolean: {} } },
      { name: 'synopsis_lines',     selector: { number: { min: 1, max: 10, step: 1, mode: 'box' } } },
      { name: 'show_progress_bar',  selector: { boolean: {} } },
      {
        name: 'progress_bar_position',
        selector: { select: { mode: 'dropdown', options: [{ value: 'bottom', label: 'Bottom' }, { value: 'top', label: 'Top' }] } },
      },
      { name: 'show_clock',  selector: { boolean: {} } },
      {
        name: 'clock_format',
        selector: { select: { mode: 'dropdown', options: [{ value: '24h', label: '24-hour' }, { value: '12h', label: '12-hour' }] } },
      },
    ],
  },

  // Banner appearance
  {
    type: 'expandable',
    title: 'Banner appearance',
    schema: [
      {
        name: 'overlay_style',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'gradient', label: 'Gradient' },
              { value: 'solid',    label: 'Solid' },
            ],
          },
        },
      },
      {
        name: 'overlay_position',
        selector: { select: { mode: 'dropdown', options: [{ value: 'bottom', label: 'Bottom' }, { value: 'top', label: 'Top' }, { value: 'center', label: 'Centre' }] } },
      },
      { name: 'overlay_color',   selector: { text: { type: 'color' } } },
      { name: 'overlay_opacity', selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } },
      { name: 'title_color',     selector: { text: { type: 'color' } } },
      {
        name: 'title_size',
        selector: { select: { mode: 'dropdown', options: [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }, { value: 'xl', label: 'Extra large' }] } },
      },
      {
        name: 'title_weight',
        selector: { select: { mode: 'dropdown', options: [{ value: 'normal', label: 'Normal' }, { value: 'bold', label: 'Bold' }] } },
      },
      { name: 'meta_color',     selector: { text: { type: 'color' } } },
      { name: 'synopsis_color', selector: { text: { type: 'color' } } },
      { name: 'text_shadow',    selector: { boolean: {} } },
    ],
  },

  // Gestures
  {
    type: 'expandable',
    title: 'Gestures & actions',
    schema: [
      { name: 'tap_action',        selector: { ui_action: {} } },
      { name: 'double_tap_action', selector: { ui_action: {} } },
      { name: 'swipe_left_action', selector: { ui_action: {} } },
      { name: 'swipe_right_action', selector: { ui_action: {} } },
    ],
  },
];

const LABELS: Record<string, string> = {
  tmdb_api_key:            'TMDB API Key',
  source:                  'Movie source',
  region:                  'Region code (e.g. GB, US, AU)',
  display_time:            'Seconds per poster',
  transition:              'Transition style',
  watchlist_entity:        'Watchlist (to-do entity)',
  watchlist_item_format:   'Item format',
  watchlist_confirm:       'Show confirmation toast',
  watchlist_no_duplicates: 'Prevent duplicates',
  show_overlay:            'Show text overlay',
  show_title:              'Show title',
  show_year:               'Show year',
  show_rating:             'Show rating',
  show_synopsis:           'Show synopsis',
  synopsis_lines:          'Max synopsis lines',
  show_progress_bar:       'Show progress bar',
  progress_bar_position:   'Progress bar position',
  show_clock:              'Show clock',
  clock_format:            'Clock format',
  overlay_style:           'Overlay style',
  overlay_position:        'Overlay position',
  overlay_color:           'Overlay colour',
  overlay_opacity:         'Overlay opacity',
  title_color:             'Title colour',
  title_size:              'Title size',
  title_weight:            'Title weight',
  meta_color:              'Year / rating colour',
  synopsis_color:          'Synopsis colour',
  text_shadow:             'Text shadow',
  tap_action:              'Tap action',
  double_tap_action:       'Double-tap action',
  swipe_left_action:       'Swipe left (next poster)',
  swipe_right_action:      'Swipe right (previous poster)',
};

class MoviePosterCardEditor extends LitElement {
  @property({ attribute: false }) hass!: any;
  @state() private _config!: CardConfig;

  setConfig(config: CardConfig) {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent) {
    const config = ev.detail.value as CardConfig;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config } }));
  }

  private _computeLabel(schema: { name: string }) {
    return LABELS[schema.name] ?? schema.name;
  }

  render() {
    if (!this.hass || !this._config) return html``;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  static styles = css`
    ha-form {
      display: block;
      padding: 0 4px;
    }
  `;
}

customElements.define('movie-poster-card-editor', MoviePosterCardEditor);
