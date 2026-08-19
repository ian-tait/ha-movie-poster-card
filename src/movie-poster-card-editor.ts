import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { CardConfig } from './types';
import { DEFAULT_SIGNAGE_HTML, DEFAULT_SIGNAGE_CSS, DEFAULT_SIGNAGE_JS } from './signage-defaults';

// Schema excludes colour fields — those render as native <input type="color"> below ha-form
const SCHEMA: any[] = [
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

  // Cinema Signage + Banner appearance + Gestures rendered as custom sections — see below
];

const COLOR_ROWS: { field: keyof CardConfig; label: string }[] = [
  { field: 'overlay_color',  label: 'Overlay colour' },
  { field: 'title_color',    label: 'Title colour' },
  { field: 'meta_color',     label: 'Year / rating colour' },
  { field: 'synopsis_color', label: 'Synopsis colour' },
];

const LABELS: Record<string, string> = {
  tmdb_api_key:            'TMDB API Key',
  source:                  'Movie source',
  region:                  'Region code (e.g. GB, US, AU)',
  display_time:            'Seconds per poster',
  transition:              'Transition style',
  watchlist_entity:        'Watchlist (to-do entity)',
  watchlist_item_format:   'Watchlist item format',
  watchlist_confirm:       'Show "Added" notification',
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
  overlay_opacity:         'Overlay opacity',
  title_size:              'Title size',
  title_weight:            'Title weight',
  text_shadow:             'Text shadow',
  show_marquee:            'Show cinema signage',
  tap_action:              'Tap',
  double_tap_action:       'Double tap',
  hold_action:             'Hold',
};

const HELPERS: Record<string, string> = {
  watchlist_item_format: 'Variables: {title}  {year}  {rating}  {overview}  — e.g. {title} ({year}) — ★{rating}/10',
};

class MoviePosterCardEditor extends LitElement {
  @property({ attribute: false }) hass!: any;
  @state() private _config!: CardConfig;

  setConfig(config: CardConfig) {
    this._config = {
      ...config,
      marquee_custom_html: config.marquee_custom_html ?? DEFAULT_SIGNAGE_HTML,
      marquee_custom_css:  config.marquee_custom_css  ?? DEFAULT_SIGNAGE_CSS,
      marquee_custom_js:   config.marquee_custom_js   ?? DEFAULT_SIGNAGE_JS,
    };
  }

  private _valueChanged(ev: CustomEvent) {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this._config, ...ev.detail.value } },
    }));
  }

  private _bannerChanged(field: keyof CardConfig, ev: CustomEvent) {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this._config, [field]: ev.detail.value } },
    }));
  }

  private _colorChanged(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const field = input.dataset.field as keyof CardConfig;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this._config, [field]: input.value } },
    }));
  }

  private _computeLabel(schema: { name: string }) {
    return LABELS[schema.name] ?? schema.name;
  }

  private _computeHelper(schema: { name: string }) {
    return HELPERS[schema.name] ?? undefined;
  }

  private _restoreSignageDefaults() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: {
        config: {
          ...this._config,
          marquee_custom_html: DEFAULT_SIGNAGE_HTML,
          marquee_custom_css:  DEFAULT_SIGNAGE_CSS,
          marquee_custom_js:   DEFAULT_SIGNAGE_JS,
        },
      },
    }));
  }

  private _signageFieldChanged(field: 'marquee_custom_html' | 'marquee_custom_css' | 'marquee_custom_js', ev: CustomEvent) {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this._config, [field]: ev.detail.value } },
    }));
  }

  private _renderSignageSection() {
    const c = this._config;
    const textarea = (field: 'marquee_custom_html' | 'marquee_custom_css' | 'marquee_custom_js', value: string) => html`
      <ha-selector
        .hass=${this.hass}
        .selector=${{ text: { multiline: true } }}
        .value=${value}
        @value-changed=${(e: CustomEvent) => this._signageFieldChanged(field, e)}
      ></ha-selector>
    `;

    return html`
      <details class="banner-panel">
        <summary class="banner-summary">
          <span>Cinema Signage</span>
          <ha-icon icon="mdi:chevron-down" class="banner-chevron"></ha-icon>
        </summary>
        <div class="banner-content">

          <label class="banner-label">Show cinema signage</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ boolean: {} }}
            .value=${c.show_marquee}
            @value-changed=${(e: CustomEvent) => this._bannerChanged('show_marquee', e)}
          ></ha-selector>

          <div class="signage-restore-row">
            <span class="signage-restore-hint">Edit the HTML, CSS, and JS below to customise the sign.</span>
            <button class="signage-restore-btn" @click=${this._restoreSignageDefaults}>Restore cinema defaults</button>
          </div>

          <label class="banner-label">HTML</label>
          ${textarea('marquee_custom_html', c.marquee_custom_html ?? '')}

          <label class="banner-label">CSS</label>
          ${textarea('marquee_custom_css', c.marquee_custom_css ?? '')}

          <label class="banner-label">JavaScript</label>
          ${textarea('marquee_custom_js', c.marquee_custom_js ?? '')}
          <p class="signage-js-hint">In JS, use <code>host</code> to reference the signage container element.</p>

        </div>
      </details>
    `;
  }

  private _renderBannerSection() {
    const c = this._config;
    const sel = (selector: unknown, value: unknown, field: keyof CardConfig) => html`
      <ha-selector
        .hass=${this.hass}
        .selector=${selector}
        .value=${value}
        @value-changed=${(e: CustomEvent) => this._bannerChanged(field, e)}
      ></ha-selector>
    `;

    return html`
      <details class="banner-panel">
        <summary class="banner-summary">
          <span>Banner appearance</span>
          <ha-icon icon="mdi:chevron-down" class="banner-chevron"></ha-icon>
        </summary>
        <div class="banner-content">

          <label class="banner-label">Overlay style</label>
          ${sel({ select: { mode: 'dropdown', options: [{ value: 'gradient', label: 'Gradient' }, { value: 'solid', label: 'Solid' }] } }, c.overlay_style, 'overlay_style')}

          <label class="banner-label">Overlay position</label>
          ${sel({ select: { mode: 'dropdown', options: [{ value: 'bottom', label: 'Bottom' }, { value: 'top', label: 'Top' }, { value: 'center', label: 'Centre' }] } }, c.overlay_position, 'overlay_position')}

          <label class="banner-label">Overlay opacity</label>
          ${sel({ number: { min: 0, max: 1, step: 0.05, mode: 'slider' } }, c.overlay_opacity, 'overlay_opacity')}

          <label class="banner-label">Title size</label>
          ${sel({ select: { mode: 'dropdown', options: [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }, { value: 'xl', label: 'Extra large' }] } }, c.title_size, 'title_size')}

          <label class="banner-label">Title weight</label>
          ${sel({ select: { mode: 'dropdown', options: [{ value: 'normal', label: 'Normal' }, { value: 'bold', label: 'Bold' }] } }, c.title_weight, 'title_weight')}

          <label class="banner-label">Text shadow</label>
          ${sel({ boolean: {} }, c.text_shadow, 'text_shadow')}

          <div class="colour-subheading">Colours</div>

          ${COLOR_ROWS.map(({ field, label }) => html`
            <div class="colour-row">
              <span class="colour-label">${label}</span>
              <input
                class="colour-input"
                type="color"
                data-field=${field}
                .value=${(this._config[field] as string) ?? '#ffffff'}
                @input=${this._colorChanged}
              />
            </div>
          `)}
        </div>
      </details>
    `;
  }

  private _renderGesturesSection() {
    const c = this._config;
    const sel = (selector: unknown, value: unknown, field: keyof CardConfig) => html`
      <ha-selector
        .hass=${this.hass}
        .selector=${selector}
        .value=${value}
        @value-changed=${(e: CustomEvent) => this._bannerChanged(field, e)}
      ></ha-selector>
    `;
    return html`
      <details class="banner-panel">
        <summary class="banner-summary">
          <span>Gestures &amp; actions</span>
          <ha-icon icon="mdi:chevron-down" class="banner-chevron"></ha-icon>
        </summary>
        <div class="banner-content">
          <label class="banner-label">Tap</label>
          ${sel({ ui_action: {} }, c.tap_action, 'tap_action')}
          <label class="banner-label">Double tap</label>
          ${sel({ ui_action: {} }, c.double_tap_action, 'double_tap_action')}
          <label class="banner-label">Hold (default: none — change if needed)</label>
          ${sel({ ui_action: {} }, c.hold_action, 'hold_action')}
        </div>
      </details>
    `;
  }

  render() {
    if (!this.hass || !this._config) return html``;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>

      ${this._renderSignageSection()}
      ${this._renderBannerSection()}
      ${this._renderGesturesSection()}
    `;
  }

  static styles = css`
    ha-form {
      display: block;
    }

    /* Custom Banner appearance expandable */
    .banner-panel {
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      border-radius: 8px;
      margin: 16px 0 4px;
      overflow: hidden;
    }

    .banner-summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 16px;
      margin: 0;
      cursor: pointer;
      list-style: none;
      font-size: 1rem;
      font-weight: 500;
      color: var(--primary-text-color);
      user-select: none;
      /* Reset browser default indentation on <summary> */
      padding-inline-start: 16px;
    }

    .banner-summary::-webkit-details-marker { display: none; }
    .banner-summary::marker { display: none; }

    .banner-chevron {
      transition: transform 0.2s ease;
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }

    .banner-panel[open] .banner-chevron {
      transform: rotate(180deg);
    }

    .banner-content {
      padding: 8px 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      border-top: 1px solid var(--divider-color, rgba(255,255,255,0.08));
    }

    .banner-label {
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--secondary-text-color);
      margin-top: 10px;
      margin-bottom: 2px;
      display: block;
    }

    /* Colour picker rows */
    .colour-subheading {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 14px 0 6px;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.08));
    }

    .colour-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0;
    }

    .colour-label {
      font-size: 1rem;
      color: var(--primary-text-color);
    }

    .colour-input {
      width: 48px;
      height: 32px;
      padding: 2px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.2));
      border-radius: 6px;
      background: transparent;
      cursor: pointer;
    }

    .colour-input::-webkit-color-swatch-wrapper { padding: 0; }
    .colour-input::-webkit-color-swatch { border: none; border-radius: 4px; }

    /* Signage section restore row */
    .signage-restore-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin: 12px 0 4px;
      padding: 10px 12px;
      background: var(--secondary-background-color, rgba(255,255,255,0.04));
      border-radius: 6px;
    }

    .signage-restore-hint {
      font-size: 0.8rem;
      color: var(--secondary-text-color);
      flex: 1;
    }

    .signage-restore-btn {
      flex-shrink: 0;
      background: none;
      border: 1px solid var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
      border-radius: 4px;
      padding: 5px 10px;
      font-size: 0.8rem;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.15s;
    }

    .signage-restore-btn:hover {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
    }

    .signage-js-hint {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin: 4px 0 0;
    }

    .signage-js-hint code {
      background: var(--code-editor-background-color, rgba(0,0,0,0.2));
      border-radius: 3px;
      padding: 1px 4px;
      font-family: monospace;
    }
  `;
}

customElements.define('movie-poster-card-editor', MoviePosterCardEditor);
