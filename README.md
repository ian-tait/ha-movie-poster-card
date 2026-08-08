# Movie Poster Screensaver Card

A Lovelace custom card for Home Assistant that cycles TMDB movie posters with title, rating, and synopsis overlay. Designed for kiosk displays and wall tablets. Works standalone or paired with browser-mod for automation-driven screensaver control.

---

## Installation

### HACS (recommended)
Add this repository in HACS → Frontend, then install **Movie Poster Screensaver Card**.

### Manual
1. Copy `dist/movie-poster-card.js` to `config/www/`
2. In HA go to **Settings → Dashboards → Resources → Add resource**
3. URL: `/local/movie-poster-card.js` — Type: **JavaScript module**
4. Hard-refresh your browser (Cmd+Shift+R / Ctrl+Shift+R)

---

## TMDB API Key

**This card requires a free TMDB API key.** Without it the card will not load any posters.

1. Create a free account at [themoviedb.org](https://www.themoviedb.org)
2. Go to **Settings → API → Create → Developer**
3. Copy the **API Key (v3 auth)** — it looks like `a1b2c3d4e5f6...`
4. Paste it into your card config as `tmdb_api_key`

Your key is only used in your browser to call the TMDB API directly. It is never sent anywhere else.

---

## Minimum config

```yaml
type: custom:movie-poster-card
tmdb_api_key: "your_tmdb_api_key_here"
```

---

## Full configuration reference

### Source & data

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tmdb_api_key` | string | **required** | Your TMDB v3 API key. The card will not work without this. |
| `source` | string | `now_playing` | Movie list source. Options: `now_playing` · `popular` · `top_rated` · `trending_day` · `trending_week` |
| `region` | string | `US` | ISO 3166-1 country code. Affects `now_playing` results (e.g. `GB`, `AU`, `DE`). |
| `cache_hours` | number | `6` | How often to re-fetch the movie list from TMDB (hours). |

### Display & timing

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `display_time` | number | `30` | Seconds each poster is shown before cycling to the next. |
| `transition` | string | `fade` | Transition style between posters. Options: `fade` · `none` |
| `transition_duration` | number | `1.0` | Transition length in seconds. |
| `shuffle` | bool | `true` | Random poster order. No repeats until the full list has cycled. |
| `pause_on_hover` | bool | `true` | Pause the cycling timer while the card is hovered (desktop). |

### Overlay elements

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `show_overlay` | bool | `true` | Set to `false` to hide the entire text overlay — poster only. |
| `show_title` | bool | `true` | Show the movie title. |
| `show_year` | bool | `true` | Show the release year next to the title. |
| `show_rating` | bool | `true` | Show the TMDB vote average (e.g. ⭐ 8.2). |
| `show_synopsis` | bool | `true` | Show the movie overview text. |
| `synopsis_lines` | number | `3` | Maximum lines of synopsis before truncating. |
| `show_progress_bar` | bool | `true` | Thin bar showing time remaining on the current poster. |
| `progress_bar_position` | string | `bottom` | Options: `bottom` · `top` |
| `show_clock` | bool | `false` | Show the current time in the overlay. |
| `clock_format` | string | `24h` | Options: `24h` · `12h` |

### Banner & overlay appearance

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `overlay_style` | string | `gradient` | Overlay background style. Options: `gradient` (fades up from edge) · `solid` (flat bar) · `frosted` (blurred glass — Phase 2) |
| `overlay_color` | string | `#000000` | Base colour of the overlay background. Any CSS colour value. |
| `overlay_opacity` | number | `0.7` | Darkness of the overlay background. Range: `0.0` (invisible) to `1.0` (solid). |
| `overlay_position` | string | `bottom` | Where the text panel sits on the poster. Options: `bottom` · `top` · `center` |
| `title_color` | string | `#ffffff` | Movie title text colour. |
| `title_size` | string | `lg` | Title font size. Options: `sm` · `md` · `lg` · `xl` |
| `title_weight` | string | `bold` | Title font weight. Options: `normal` · `bold` |
| `meta_color` | string | `#cccccc` | Colour of the year and rating line. |
| `synopsis_color` | string | `#aaaaaa` | Colour of the synopsis text. |
| `text_shadow` | bool | `true` | Drop shadow on text for readability over bright poster areas. |

### Gestures & tap actions

All gesture options accept an action object. Available action types:

| Action | Description |
|--------|-------------|
| `none` | Do nothing (default for most gestures). |
| `next` | Advance to the next poster. |
| `previous` | Go back to the previous poster. |
| `navigate` | Navigate to a dashboard path. Requires `navigation_path`. |
| `call-service` | Call any HA service. Requires `service` and optionally `service_data`. |
| `url` | Open a URL in a new tab. Requires `url_path`. |
| `toggle-info` | Show or hide the text overlay. |
| `add-to-watchlist` | Add the current movie to your watchlist. Requires `watchlist_entity`. |

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tap_action` | action | `none` | Single tap anywhere on the card. |
| `double_tap_action` | action | `add-to-watchlist` | Double tap. Automatically set to `add-to-watchlist` when `watchlist_entity` is configured. |
| `swipe_left_action` | action | `next` | Swipe left — advances to the next poster. |
| `swipe_right_action` | action | `previous` | Swipe right — returns to the previous poster. |
| `swipe_threshold` | number | `50` | Minimum pixel travel before a touch is treated as a swipe rather than a tap. |

### Watchlist

Uses the HA [To-do list](https://www.home-assistant.io/integrations/todo/) integration. Create a to-do list in HA first (**Settings → Devices & Services → Add Integration → Local To-do**), then use its entity ID here.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `watchlist_entity` | string | — | HA to-do list entity ID, e.g. `todo.family_watchlist`. Required for `add-to-watchlist` action. |
| `watchlist_item_format` | string | `{title} ({year}) — {rating}/10` | Template for the item added to the list. Variables: `{title}` `{year}` `{rating}` `{overview}` |
| `watchlist_confirm` | bool | `true` | Show a brief on-screen toast when a movie is added. |
| `watchlist_no_duplicates` | bool | `true` | Check the list before adding — shows "Already on your list" if the title is already there. |

---

## Full example config

```yaml
type: custom:movie-poster-card

# Required
tmdb_api_key: "your_tmdb_api_key_here"

# Source
source: now_playing
region: GB
cache_hours: 6

# Timing
display_time: 30
transition: fade
transition_duration: 1.0
shuffle: true
pause_on_hover: true

# Overlay elements
show_overlay: true
show_title: true
show_year: true
show_rating: true
show_synopsis: true
synopsis_lines: 3
show_progress_bar: true
progress_bar_position: bottom
show_clock: true
clock_format: 24h

# Banner appearance
overlay_style: gradient
overlay_color: "#000000"
overlay_opacity: 0.65
overlay_position: bottom
title_color: "#ffffff"
title_size: lg
title_weight: bold
meta_color: "#cccccc"
synopsis_color: "#aaaaaa"
text_shadow: true

# Watchlist
watchlist_entity: todo.family_watchlist
watchlist_item_format: "{title} ({year}) — {rating}/10"
watchlist_confirm: true
watchlist_no_duplicates: true

# Gestures
tap_action:
  action: navigate
  navigation_path: /lovelace/home
double_tap_action:
  action: add-to-watchlist
swipe_left_action:
  action: next
swipe_right_action:
  action: previous
```

---

## browser-mod setup (recommended for kiosk use)

The card works standalone but pairs naturally with [browser-mod](https://github.com/thomasloven/hass-browser_mod). Create a dedicated **Screensaver** dashboard with this card fullscreen, then drive it from HA automations:

```yaml
# Go to screensaver after 5 minutes of no motion
automation:
  - alias: Screensaver on
    trigger:
      - platform: state
        entity_id: binary_sensor.lounge_motion
        to: "off"
        for: "00:05:00"
    action:
      - service: browser_mod.navigate
        data:
          path: /lovelace/screensaver

  - alias: Screensaver off
    trigger:
      - platform: state
        entity_id: binary_sensor.lounge_motion
        to: "on"
    action:
      - service: browser_mod.navigate
        data:
          path: /lovelace/home
```

---

## Getting a TMDB API key

1. Sign up free at [themoviedb.org](https://www.themoviedb.org/signup)
2. Go to your account **Settings → API**
3. Click **Create** and choose **Developer**
4. Fill in the form (use your home address, describe it as a personal HA integration)
5. Copy the **API Key (v3 auth)** string

Keys are approved instantly. The API is free for personal/non-commercial use.
