# Changelog

All notable changes to this project are documented here.

---

## [1.1.0] — 2026-08-19

### Added
- **Cinema Signage** — fully customisable HTML/CSS/JS sign floating above the poster. The default design is an amber LED-dot cinema marquee with a Cinzel-font title and rotating Dad-joke subtitles (shuffled). `host` is passed to the custom JS as the signage container element.
- **Restore cinema defaults** button in the visual editor resets the three signage fields back to the built-in design.
- `signage-defaults.ts` — default HTML, CSS, and JS for the cinema board are exported as named constants, making them easy to reference in both the card and the editor.
- **Hold gesture** (`hold_action`) — 600 ms longpress fires independently of tap and double-tap.
- **Colour pickers** for overlay, title, meta, and synopsis colours under *Banner appearance* in the visual editor.
- `watchlist_item_format` now shows variable examples (`{title} {year} {rating} {overview}`) as helper text in the editor.

### Changed
- Cinema Signage in the visual editor is now a standalone custom section (same pattern as *Banner appearance*) rather than an `ha-form` expandable — enables the Restore button and free-form textareas.
- `renderMarquee()` in the card is now a thin renderer — all visual styling comes from `marquee_custom_css`; no built-in fallback markup.
- Gestures section moved to the bottom of the visual editor menu.
- **Swipe gestures removed** — `swipe_left_action` / `swipe_right_action` conflicted with HA's browser navigation swipe. Fields kept in the type definition for YAML backwards-compat but removed from the editor UI.

### Fixed
- Watchlist **duplicate detection** now calls `todo.get_items` with `returnResponse: true` (HA 2024.4+) and falls back to entity state attributes — previously the live item list was often empty.
- Watchlist `watchlist_confirm: false` no longer showed a toast anyway — changed the gate from a truthy check to `!== false`.
- `<summary>` element browser-default left indent now removed via `padding-inline-start: 16px` and `::marker { display: none }` — fixes the misaligned *Banner appearance* heading.
- `color_rgb` ha-form selector was broken (label crashed into the colour swatch). Fixed by moving all colour fields out of `ha-form` into a custom `<details>` section with native `<input type="color">` elements.

### Deprecated
- `marquee_title`, `marquee_mode`, `marquee_subtitle`, `marquee_quotes` — no longer used by the card or shown in the editor. Retained as optional typed fields for YAML backwards-compat; they are silently ignored.

---

## [1.0.0] — 2026-08-07

### Added
- Initial release.
- Cycles TMDB movie posters from Now Playing, Popular, Top Rated, Trending (daily / weekly).
- Configurable region code for localised Now Playing results.
- Crossfade or instant transitions with configurable duration.
- Shuffle mode with no-repeat until the full list cycles.
- Overlay with title, year, rating, synopsis, progress bar, and clock.
- Fully configurable overlay style (gradient / solid), position (bottom / top / centre), colours, and typography.
- Pause on hover.
- Full visual editor via `ha-form` with expandable sections.
- Tap, double-tap, and swipe gesture actions (navigate, call-service, url, toggle-info, add-to-watchlist, next, previous).
- Watchlist integration using HA To-do lists — double-tap to add, with confirmation toast and duplicate prevention.
- TMDB response cache (configurable hours) to avoid repeated API calls.
- `getStubConfig()` for the HA card picker.
- `hacs.json` for HACS frontend distribution.
