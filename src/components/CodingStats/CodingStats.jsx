import { ArrowUpRight, RefreshCw, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import useCodingStats from '../../hooks/useCodingStats';
import SectionHeading, { Reveal } from '../Sketch/SectionHeading';
const number = value => Number.isFinite(value) ? Math.round(value).toLocaleString() : '—';
function Status({ sources }) {
  const states = sources.map(source => source.status);
  const text = states.every(s => s === 'live') ? 'Live from profile' : states.includes('loading') ? 'Fetching live data' : states.includes('cached') ? 'Saved data · refresh unavailable' : states.includes('live') ? 'Some data unavailable' : 'Temporarily unavailable';
  return <span className="stats-status" role="status"><i className={states.every(s => s === 'live') ? 'live' : ''} />{text}</span>;
}
export default function CodingStats() {
  const { stats, refresh } = useCodingStats();
  const lc = stats.leetcode.data, contest = stats.contest.data, cf = stats.codeforces.data, sub = stats.submissions.data;
  const loading = Object.values(stats).some(value => value.status === 'loading');
  return <section id="profiles" className="section coding-section"><span id="stats" className="anchor-alias" />
    <div className="section-inner">
      <SectionHeading number="02" label="THINK. SOLVE. REPEAT." title="CODING." note="a work in progress. always." />
      <Reveal className="stats-grid">
        <article className="stat-card">
          <div className="stat-card-header"><h3>LEETCODE</h3><a href={PERSONAL_INFO.links.leetcode} target="_blank" rel="noreferrer" aria-label="View LeetCode profile"><ArrowUpRight size={22} /></a></div>
          <Status sources={[stats.leetcode, stats.contest]} />
          <div className="stat-primary"><strong>{number(lc?.totalSolved)}</strong><span>PROBLEMS<br />SOLVED</span></div>
          <dl className="stat-triple"><div><dt>Easy</dt><dd>{number(lc?.easySolved)}</dd></div><div><dt>Medium</dt><dd>{number(lc?.mediumSolved)}</dd></div><div><dt>Hard</dt><dd>{number(lc?.hardSolved)}</dd></div></dl>
          <dl className="stat-details"><div><dt>Global rank</dt><dd>{number(lc?.ranking)}</dd></div><div><dt>Contest rating</dt><dd>{number(contest?.contestRating)}</dd></div><div><dt>Contests attended</dt><dd>{number(contest?.contestAttend)}</dd></div><div><dt>Top percentage</dt><dd>{contest?.contestTopPercentage != null ? `${contest.contestTopPercentage}%` : '—'}</dd></div></dl>
        </article>
        <article className="stat-card">
          <div className="stat-card-header"><h3>CODEFORCES</h3><a href={PERSONAL_INFO.links.codeforces} target="_blank" rel="noreferrer" aria-label="View Codeforces profile"><ArrowUpRight size={22} /></a></div>
          <Status sources={[stats.codeforces, stats.submissions]} />
          <div className="stat-primary"><strong>{number(sub?.solvedCount)}</strong><span>PROBLEMS<br />SOLVED</span></div>
          <dl className="stat-triple"><div><dt>Rating</dt><dd>{cf ? (cf.rating ?? 'Unrated') : '—'}</dd></div><div><dt>Peak rating</dt><dd>{cf ? (cf.maxRating ?? 'Unrated') : '—'}</dd></div><div><dt>Submissions</dt><dd>{number(sub?.totalSubmissions)}</dd></div></dl>
          <dl className="stat-details"><div><dt>Rank</dt><dd>{cf ? (cf.rank ?? 'Unrated') : '—'}</dd></div><div><dt>Hardest problem solved</dt><dd>{number(sub?.maxProblemRating)}</dd></div><div><dt>Contribution</dt><dd>{number(cf?.contribution)}</dd></div><div><dt>Handle</dt><dd>abhiilekhborah</dd></div></dl>
        </article>
      </Reveal>
      <div className="stats-footer"><p>A small window into my daily practice.</p><button className="text-link" onClick={refresh} disabled={loading}><RefreshCw size={13} />{loading ? 'Updating…' : 'Refresh stats'}</button></div>
      <a className="compiler-callout" href="#/compiler"><span><Terminal size={18} /> MORE OF A HANDS-ON PERSON?</span><span>Try the code runner <ArrowUpRight size={18} /></span></a>
    </div>
  </section>;
}
