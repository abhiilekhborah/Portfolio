import { useEffect, useState } from 'react';

const HANDLE = 'abhiilekhborah';
const SOURCES = {
  leetcode: `https://leetcode-api-faisalshohag.vercel.app/${HANDLE}`,
  contest: `https://alfa-leetcode-api.onrender.com/${HANDLE}/contest`,
  codeforces: `https://codeforces.com/api/user.info?handles=${HANDLE}`,
  submissions: `https://codeforces.com/api/user.status?handle=${HANDLE}`,
};
function readCache(key) {
  try { const value = JSON.parse(sessionStorage.getItem(`portfolio-stats-v2-${key}`)); return value?.updatedAt ? { ...value, status: 'cached' } : { data: null, status: 'loading' }; }
  catch { return { data: null, status: 'loading' }; }
}
function normalize(key, result) {
  if (key === 'leetcode') { if (!Number.isFinite(result.totalSolved)) throw new Error('No statistics returned'); return result; }
  if (key === 'contest') { if (!Number.isFinite(result.contestAttend)) throw new Error('No contest statistics returned'); return result; }
  if (result.status !== 'OK' || !Array.isArray(result.result)) throw new Error('Platform unavailable');
  if (key === 'codeforces') { if (!result.result[0]) throw new Error('Profile unavailable'); return result.result[0]; }
  const solved = new Set();
  let maxProblemRating = null;
  result.result.forEach(sub => {
    if (sub.verdict === 'OK' && sub.problem) {
      solved.add(`${sub.problem.contestId ?? sub.problem.problemsetName}-${sub.problem.index}`);
      if (Number.isFinite(sub.problem.rating)) maxProblemRating = Math.max(maxProblemRating ?? 0, sub.problem.rating);
    }
  });
  return { solvedCount: solved.size, totalSubmissions: result.result.length, maxProblemRating };
}
export default function useCodingStats() {
  const [stats, setStats] = useState(() => Object.fromEntries(Object.keys(SOURCES).map(key => [key, readCache(key)])));
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const fetchOne = async ([key, url]) => {
      const timeout = new AbortController();
      const timer = setTimeout(() => timeout.abort(), 20000);
      const abort = () => timeout.abort();
      controller.signal.addEventListener('abort', abort);
      try {
        const response = await fetch(url, { signal: timeout.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = normalize(key, await response.json());
        const value = { data, status: 'live', updatedAt: Date.now() };
        if (active) {
          setStats(previous => ({ ...previous, [key]: value }));
          try { sessionStorage.setItem(`portfolio-stats-v2-${key}`, JSON.stringify(value)); } catch { /* Storage is optional. */ }
        }
      } catch {
        if (active) setStats(previous => ({ ...previous, [key]: { ...previous[key], status: previous[key].data ? 'cached' : 'error' } }));
      } finally { clearTimeout(timer); controller.signal.removeEventListener('abort', abort); }
    };
    // Keep each endpoint independent so a slow contest service cannot block solved counts.
    Object.entries(SOURCES).forEach(fetchOne);
    return () => { active = false; controller.abort(); };
  }, [revision]);
  const refresh = () => {
    setStats(previous => Object.fromEntries(Object.entries(previous).map(([key,value]) => [key, { ...value, status: 'loading' }])));
    setRevision(value => value + 1);
  };
  return { stats, refresh };
}
