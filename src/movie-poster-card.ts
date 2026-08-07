import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { TmdbClient } from './tmdb-client';
import { DEFAULT_CONFIG, type Action, type CardConfig, type Movie } from './types';

const DOUBLE_TAP_MS = 300;
const TITLE_SIZES: Record<string, string> = { sm: '14px', md: '18px', lg: '24px', xl: '32px' };

class MoviePosterCard extends LitElement {
  @property({ attribute: false }) hass: any;

  @state() private movies: Movie[] = [];
  @state() private currentIndex = 0;
  @state() private nextIndex = 1;
  @state() private transitioning = false;
  @state() private overlayVisible = true;
  @state() private errorMsg: string | null = null;
  @state() private toast: string | null = null;
  @state() private clockStr = '';

  private cfg!: CardConfig;
  private client!: TmdbClient;

  private cycleHandle = 0;
  private progressHandle = 0;
  private toastHandle = 0;
  private clockHandle = 0;
  private progressEl: HTMLElement | null = null;
  private progressStart = 0;

  private touchStartX = 0;
  private touchStartY = 0;
  private touchStartTime = 0;
  private tapPending = false;
  private tapHandle = 0;
  private paused = false;

  setConfig(raw: Partial<CardConfig>) {
    if (!raw.tmdb_api_key) throw new Error('movie-poster-card: tmdb_api_key is required');
    this.cfg = { ...DEFAULT_CONFIG, ...raw } as CardConfig;
    if (raw.watchlist_entity && !raw.double_tap_action) {
      this.cfg.double_tap_action = { action: 'add-to-watchlist' };
    }
    this.client = new TmdbClient(this.cfg.tmdb_api_key, this.cfg.cache_hours);
  }

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.teardown();
  }

  private async load() {
    this.errorMsg = null;
    try {
      this.movies = await this.client.getMovies(this.cfg.source, this.cfg.region);
      this.currentIndex = 0;
      this.nextIndex = 1 % this.movies.length;
      this.startCycle();
      if (this.cfg.show_clock) this.startClock();
    } catch (e: any) {
      this.errorMsg = e.message ?? 'Failed to load movies';
    }
  }

  private startCycle() {
    clearInterval(this.cycleHandle);
    this.progressStart = Date.now();
    this.animateProgress();
    this.cycleHandle = window.setInterval(() => {
      if (!this.paused) this.advance();
    }, this.cfg.display_time * 1000);
  }

  private advance() {
    if (this.movies.length < 2 || this.transitioning) return;
    this.nextIndex = (this.currentIndex + 1) % this.movies.length;
    this.doTransition();
  }

  private retreat() {
    if (this.movies.length < 2 || this.transitioning) return;
    this.nextIndex = (this.currentIndex - 1 + this.movies.length) % this.movies.length;
    this.doTransition();
  }

  private doTransition() {
    if (this.cfg.transition === 'none') {
      this.currentIndex = this.nextIndex;
      this.resetProgress();
      return;
    }
    this.transitioning = true;
    const dur = (this.cfg.transition_duration ?? 1) * 1000;
    setTimeout(() => {
      this.currentIndex = this.nextIndex;
      this.transitioning = false;
      this.resetProgress();
    }, dur);
  }

  private resetProgress() {
    this.progressStart = Date.now();
    if (this.progressEl) {
      this.progressEl.style.transition = 'none';
      this.progressEl.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (this.progressEl) {
            this.progressEl.style.transition = `width ${this.cfg.display_time}s linear`;
            this.progressEl.style.width = '100%';
          }
        });
      });
    }
  }

  private animateProgress() {
    clearInterval(this.progressHandle);
    if (!this.cfg.show_progress_bar) return;
    // Drive via CSS transition; just capture the element reference after first render
    this.updateComplete.then(() => {
      this.progressEl = this.renderRoot?.querySelector('.progress-fill') as HTMLElement | null;
      if (this.progressEl) {
        this.progressEl.style.transition = `width ${this.cfg.display_time}s linear`;
        this.progressEl.style.width = '100%';
      }
    });
  }

  private startClock() {
    const tick = () => {
      const now = new Date();
      if (this.cfg.clock_format === '12h') {
        this.clockStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      } else {
        this.clockStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
      }
    };
    tick();
    this.clockHandle = window.setInterval(tick, 10_000);
  }

  private teardown() {
    clearInterval(this.cycleHandle);
    clearInterval(this.progressHandle);
    clearInterval(this.clockHandle);
    clearTimeout(this.toastHandle);
    clearTimeout(this.tapHandle);
  }

  // --- Gesture handling ---

  private onTouchStart(e: TouchEvent) {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.touchStartTime = Date.now();
  }

  private onTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    const dy = e.changedTouches[0].clientY - this.touchStartY;
    const dt = Date.now() - this.touchStartTime;
    const threshold = this.cfg.swipe_threshold ?? 50;

    if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      clearTimeout(this.tapHandle);
      this.tapPending = false;
      const action = dx < 0 ? this.cfg.swipe_left_action : this.cfg.swipe_right_action;
      this.execute(action);
      return;
    }

    if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && dt < 500) {
      // Tap — check for double
      if (this.tapPending) {
        clearTimeout(this.tapHandle);
        this.tapPending = false;
        this.execute(this.cfg.double_tap_action);
      } else {
        this.tapPending = true;
        this.tapHandle = window.setTimeout(() => {
          this.tapPending = false;
          this.execute(this.cfg.tap_action);
        }, DOUBLE_TAP_MS);
      }
    }
  }

  private onMouseEnter() {
    if (this.cfg.pause_on_hover) this.paused = true;
  }

  private onMouseLeave() {
    this.paused = false;
  }

  // --- Action execution ---

  private execute(action: Action) {
    switch (action.action) {
      case 'none': break;
      case 'next': {
        clearInterval(this.cycleHandle);
        this.advance();
        this.startCycle();
        break;
      }
      case 'previous': {
        clearInterval(this.cycleHandle);
        this.retreat();
        this.startCycle();
        break;
      }
      case 'navigate':
        if (action.navigation_path) {
          history.pushState(null, '', action.navigation_path);
          window.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true }));
        }
        break;
      case 'call-service':
        if (action.service && this.hass) {
          const [domain, svc] = action.service.split('.');
          this.hass.callService(domain, svc, action.service_data ?? {});
        }
        break;
      case 'url':
        if (action.url_path) window.open(action.url_path, '_blank');
        break;
      case 'toggle-info':
        this.overlayVisible = !this.overlayVisible;
        break;
      case 'add-to-watchlist':
        this.addToWatchlist();
        break;
    }
  }

  private async addToWatchlist() {
    const entity = this.cfg.watchlist_entity;
    if (!entity || !this.hass) {
      this.showToast('No watchlist configured');
      return;
    }
    const movie = this.movies[this.currentIndex];
    if (!movie) return;

    const item = this.cfg.watchlist_item_format
      .replace('{title}', movie.title)
      .replace('{year}', (movie.release_date ?? '').slice(0, 4) || '?')
      .replace('{rating}', movie.vote_average?.toFixed(1) ?? '?')
      .replace('{overview}', movie.overview ?? '');

    if (this.cfg.watchlist_no_duplicates) {
      const entityState = this.hass.states[entity];
      const existing: any[] = entityState?.attributes?.items ?? [];
      const alreadyAdded = existing.some(i =>
        (i.summary ?? i.name ?? '').toLowerCase().includes(movie.title.toLowerCase())
      );
      if (alreadyAdded) {
        this.showToast(`Already on your list`);
        return;
      }
    }

    try {
      await this.hass.callService('todo', 'add_item', { item }, { entity_id: entity });
      if (this.cfg.watchlist_confirm) this.showToast(`Added: ${movie.title}`);
    } catch {
      this.showToast('Could not add to watchlist');
    }
  }

  private showToast(msg: string) {
    this.toast = msg;
    clearTimeout(this.toastHandle);
    this.toastHandle = window.setTimeout(() => { this.toast = null; }, 3000);
  }

  // --- Render ---

  render() {
    if (this.errorMsg) return this.renderError();
    if (!this.movies.length) return this.renderLoading();

    const current = this.movies[this.currentIndex];
    const next = this.movies[this.nextIndex];
    const dur = `${this.cfg.transition_duration ?? 1}s`;
    const transitioning = this.transitioning && this.cfg.transition === 'fade';

    return html`
      <div class="root"
        @touchstart=${this.onTouchStart}
        @touchend=${this.onTouchEnd}
        @mouseenter=${this.onMouseEnter}
        @mouseleave=${this.onMouseLeave}>

        <!-- Background layers: two divs crossfade between them -->
        <div class="layer current"
          style=${styleMap({
            backgroundImage: `url(${this.client.posterUrl(current.poster_path)})`,
            opacity: transitioning ? '0' : '1',
            transition: transitioning ? `opacity ${dur} ease` : `opacity ${dur} ease`,
          })}></div>

        <div class="layer next"
          style=${styleMap({
            backgroundImage: next ? `url(${this.client.posterUrl(next.poster_path)})` : 'none',
            opacity: transitioning ? '1' : '0',
            transition: `opacity ${dur} ease`,
          })}></div>

        ${this.cfg.show_overlay && this.overlayVisible ? this.renderOverlay(current) : nothing}

        ${this.cfg.show_progress_bar ? this.renderProgressBar() : nothing}

        ${this.toast ? html`<div class="toast">${this.toast}</div>` : nothing}
      </div>
    `;
  }

  private renderOverlay(movie: Movie) {
    const textShadow = this.cfg.text_shadow ? '0 1px 4px rgba(0,0,0,0.8)' : 'none';
    const titleSize = TITLE_SIZES[this.cfg.title_size] ?? TITLE_SIZES.lg;
    const year = (movie.release_date ?? '').slice(0, 4);
    const rating = movie.vote_average?.toFixed(1) ?? '?';

    const overlayBg = this.overlayBackground();

    return html`
      <div class="overlay" style=${styleMap({ background: overlayBg })}>
        <div class="overlay-content">
          ${this.cfg.show_clock && this.clockStr
            ? html`<div class="clock" style=${styleMap({ color: this.cfg.meta_color, textShadow })}>${this.clockStr}</div>`
            : nothing}

          ${this.cfg.show_title
            ? html`<div class="title" style=${styleMap({
                color: this.cfg.title_color,
                fontSize: titleSize,
                fontWeight: this.cfg.title_weight,
                textShadow,
              })}>${movie.title}</div>`
            : nothing}

          ${(this.cfg.show_year || this.cfg.show_rating)
            ? html`<div class="meta" style=${styleMap({ color: this.cfg.meta_color, textShadow })}>
                ${this.cfg.show_year && year ? html`<span>${year}</span>` : nothing}
                ${this.cfg.show_year && year && this.cfg.show_rating ? html`<span class="sep">·</span>` : nothing}
                ${this.cfg.show_rating ? html`<span>⭐ ${rating}</span>` : nothing}
              </div>`
            : nothing}

          ${this.cfg.show_synopsis && movie.overview
            ? html`<div class="synopsis" style=${styleMap({
                color: this.cfg.synopsis_color,
                WebkitLineClamp: String(this.cfg.synopsis_lines),
                textShadow,
              })}>${movie.overview}</div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private overlayBackground(): string {
    const { overlay_style, overlay_color, overlay_opacity, overlay_position } = this.cfg;
    const hex = overlay_color ?? '#000000';
    // Build rgba from hex
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = overlay_opacity ?? 0.7;
    const rgba = `rgba(${r},${g},${b},${a})`;
    const transparent = `rgba(${r},${g},${b},0)`;

    if (overlay_style === 'solid') return rgba;

    // Gradient direction based on position
    const dir = overlay_position === 'top' ? 'to bottom' : 'to top';
    return `linear-gradient(${dir}, ${rgba} 0%, ${rgba} 30%, ${transparent} 100%)`;
  }

  private renderProgressBar() {
    const atTop = this.cfg.progress_bar_position === 'top';
    return html`
      <div class="progress-track ${atTop ? 'progress-top' : 'progress-bottom'}">
        <div class="progress-fill"></div>
      </div>
    `;
  }

  private renderLoading() {
    return html`<div class="state-screen"><div class="spinner"></div></div>`;
  }

  private renderError() {
    return html`
      <div class="state-screen error">
        <div class="error-icon">⚠️</div>
        <div>${this.errorMsg}</div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: hidden;
    }

    .root {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 200px;
      background: #111;
      border-radius: inherit;
      overflow: hidden;
      cursor: default;
      -webkit-user-select: none;
      user-select: none;
    }

    /* Poster layers */
    .layer {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center top;
      will-change: opacity;
    }

    /* Overlay */
    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-end;
      pointer-events: none;
    }

    .overlay-content {
      padding: 20px 18px 14px;
      width: 100%;
    }

    .clock {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
      margin-bottom: 8px;
      opacity: 0.8;
    }

    .title {
      line-height: 1.2;
      letter-spacing: -0.01em;
      margin-bottom: 6px;
      text-wrap: balance;
    }

    .meta {
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    }

    .sep { opacity: 0.4; }

    .synopsis {
      font-size: 13px;
      line-height: 1.55;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Progress bar */
    .progress-track {
      position: absolute;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255,255,255,0.15);
    }
    .progress-top { top: 0; }
    .progress-bottom { bottom: 0; }

    .progress-fill {
      height: 100%;
      width: 0%;
      background: rgba(255,255,255,0.7);
    }

    /* Toast */
    .toast {
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.75);
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 20px;
      white-space: nowrap;
      pointer-events: none;
      animation: toast-in 0.25s ease;
    }

    @keyframes toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    /* Loading / error states */
    .state-screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      height: 100%;
      min-height: 200px;
      color: #888;
      font-size: 14px;
    }

    .error { color: #e57373; }
    .error-icon { font-size: 28px; }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255,255,255,0.1);
      border-top-color: rgba(255,255,255,0.5);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
}

customElements.define('movie-poster-card', MoviePosterCard);

// Register with HA card picker
(window as any).customCards = (window as any).customCards ?? [];
(window as any).customCards.push({
  type: 'movie-poster-card',
  name: 'Movie Poster Screensaver',
  description: 'Cycles TMDB movie posters with title, rating, and synopsis overlay.',
  preview: false,
});
