import type { Movie } from './types';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';

export class TmdbClient {
  private cache: Movie[] = [];
  private shuffled: Movie[] = [];
  private lastFetch = 0;

  constructor(
    private readonly apiKey: string,
    private readonly cacheHours = 6,
  ) {}

  async getMovies(source: string, region: string): Promise<Movie[]> {
    const now = Date.now();
    const stale = now - this.lastFetch > this.cacheHours * 3_600_000;

    if (this.cache.length && !stale) return this.shuffled;

    const url = `${TMDB_BASE}${this.endpoint(source, region)}&api_key=${this.apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`TMDB ${res.status}: ${res.statusText}`);

    const data = await res.json();
    this.cache = (data.results as Movie[]).filter(m => m.poster_path);
    this.shuffled = this.shuffle(this.cache);
    this.lastFetch = now;
    return this.shuffled;
  }

  posterUrl(path: string): string {
    return `${IMAGE_BASE}${path}`;
  }

  private endpoint(source: string, region: string): string {
    switch (source) {
      case 'popular':       return '/movie/popular?language=en-US';
      case 'top_rated':     return '/movie/top_rated?language=en-US';
      case 'trending_day':  return '/trending/movie/day?language=en-US';
      case 'trending_week': return '/trending/movie/week?language=en-US';
      default:              return `/movie/now_playing?language=en-US&region=${region}`;
    }
  }

  private shuffle<T>(arr: T[]): T[] {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }
}
