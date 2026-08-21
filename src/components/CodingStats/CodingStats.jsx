import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useScrollSection';

import { BarChart3, Sword, Flag, ExternalLink, RefreshCw } from 'lucide-react';

const FALLBACK_LC = {
  totalSolved: 842,
  easySolved: 500,
  mediumSolved: 328,
  hardSolved: 14,
  ranking: 54374,
  totalQuestions: 3977,
  totalEasy: 951,
  totalMedium: 2077,
  totalHard: 949,
  contributionPoint: 1350,
  reputation: 29,
  contestRating: 1738,
  contestGlobalRanking: 95433,
  contestAttend: 10,
  contestTopPercentage: 11.14
};

const FALLBACK_CF = {
  handle: 'abhiilekhborah',
  solvedCount: 157,
  totalSubmissions: 306,
  maxRating: 1200,
  rank: 'UNRATED',
  contribution: 0,
};

const BOOT_LOGS = [
  'CONNECTING TO LEETCODE API...',
  'CONNECTING TO CODEFORCES API...',
  'FETCHING CONTEST RATINGS...',
  'PARSING SUBMISSION DATA...',
  'COMPILING STATISTICS...',
  'DATA SYNCHRONIZED.'
];

export default function CodingStats() {
  const [sectionRef, isInView] = useInView(0.15);
  const [loading, setLoading] = useState(true);
  const [logIndex, setLogIndex] = useState(0);
  const [typedLogs, setTypedLogs] = useState([]);

  const [lcData, setLcData] = useState(() => {
    try {
      const cached = sessionStorage.getItem('lc_stats');
      return cached ? JSON.parse(cached) : FALLBACK_LC;
    } catch { return FALLBACK_LC; }
  });

  const [cfData, setCfData] = useState(() => {
    try {
      const cached = sessionStorage.getItem('cf_stats');
      return cached ? JSON.parse(cached) : FALLBACK_CF;
    } catch { return FALLBACK_CF; }
  });

  const fetchStats = async (force = false) => {
    if (!force) {
      const cachedLc = sessionStorage.getItem('lc_stats');
      const cachedCf = sessionStorage.getItem('cf_stats');
      if (cachedLc && cachedCf) return;
    }
    try {
      const lcPromise = fetch('https://leetcode-api-faisalshohag.vercel.app/abhiilekhborah')
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .catch(() => null);
      const lcContestPromise = fetch('https://alfa-leetcode-api.onrender.com/abhiilekhborah/contest')
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .catch(() => null);
      const cfInfoPromise = fetch('https://codeforces.com/api/user.info?handles=abhiilekhborah')
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .catch(() => ({ status: 'FAILED' }));
      const cfStatusPromise = fetch('https://codeforces.com/api/user.status?handle=abhiilekhborah')
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .catch(() => ({ status: 'FAILED' }));

      const [lcResult, lcContestResult, cfInfoResult, cfStatusResult] = await Promise.all([
        lcPromise, lcContestPromise, cfInfoPromise, cfStatusPromise
      ]);

      if (lcResult || lcContestResult) {
        const mergedLc = {
          totalSolved: lcResult?.totalSolved || FALLBACK_LC.totalSolved,
          easySolved: lcResult?.easySolved || FALLBACK_LC.easySolved,
          mediumSolved: lcResult?.mediumSolved || FALLBACK_LC.mediumSolved,
          hardSolved: lcResult?.hardSolved || FALLBACK_LC.hardSolved,
          ranking: lcResult?.ranking || FALLBACK_LC.ranking,
          totalQuestions: lcResult?.totalQuestions || FALLBACK_LC.totalQuestions,
          totalEasy: lcResult?.totalEasy || FALLBACK_LC.totalEasy,
          totalMedium: lcResult?.totalMedium || FALLBACK_LC.totalMedium,
          totalHard: lcResult?.totalHard || FALLBACK_LC.totalHard,
          contributionPoint: lcResult?.contributionPoint || FALLBACK_LC.contributionPoint,
          reputation: lcResult?.reputation || FALLBACK_LC.reputation,
          contestRating: lcContestResult?.contestRating || FALLBACK_LC.contestRating,
          contestGlobalRanking: lcContestResult?.contestGlobalRanking || FALLBACK_LC.contestGlobalRanking,
          contestAttend: lcContestResult?.contestAttend || FALLBACK_LC.contestAttend,
          contestTopPercentage: lcContestResult?.contestTopPercentage || FALLBACK_LC.contestTopPercentage
        };
        setLcData(mergedLc);
        sessionStorage.setItem('lc_stats', JSON.stringify(mergedLc));
      }

      let cfSolved = FALLBACK_CF.solvedCount;
      let cfMaxRating = FALLBACK_CF.maxRating;
      let cfTotalSub = FALLBACK_CF.totalSubmissions;
      let cfContribution = FALLBACK_CF.contribution;
      let cfRank = FALLBACK_CF.rank;

      if (cfInfoResult?.status === 'OK' && cfInfoResult.result[0]) {
        const info = cfInfoResult.result[0];
        cfContribution = info.contribution ?? 0;
        cfRank = info.rank ? info.rank.toUpperCase() : 'UNRATED';
      }
      if (cfStatusResult?.status === 'OK' && cfStatusResult.result) {
        const submissions = cfStatusResult.result;
        cfTotalSub = submissions.length;
        const uniqueSolved = new Set();
        let maxRated = 0;
        submissions.forEach(sub => {
          if (sub.verdict === 'OK') {
            uniqueSolved.add(`${sub.problem.contestId}-${sub.problem.index}`);
            if (sub.problem.rating) maxRated = Math.max(maxRated, sub.problem.rating);
          }
        });
        if (uniqueSolved.size > 0) cfSolved = uniqueSolved.size;
        if (maxRated > 0) cfMaxRating = maxRated;
      }

      const formattedCf = { handle: 'abhiilekhborah', solvedCount: cfSolved, totalSubmissions: cfTotalSub, maxRating: cfMaxRating, rank: cfRank, contribution: cfContribution };
      setCfData(formattedCf);
      sessionStorage.setItem('cf_stats', JSON.stringify(formattedCf));
    } catch (e) {
      console.warn('Stats sync error. Using fallback.', e);
    }
  };

  useEffect(() => {
    if (isInView && loading) {
      setTimeout(() => fetchStats(false).catch(console.warn), 0);
      let currentLog = 0;
      const interval = setInterval(() => {
        if (currentLog < BOOT_LOGS.length) {
          setTypedLogs(prev => [...prev, BOOT_LOGS[currentLog]]);
          currentLog++;
          setLogIndex(currentLog);
        } else {
          clearInterval(interval);
          setTimeout(() => { setLoading(false); }, 600);
        }
      }, 280);
      return () => clearInterval(interval);
    }
  }, [isInView, loading]);

  const handleResync = () => {

    setLoading(true);
    setTypedLogs([]);
    setLogIndex(0);
    fetchStats(true).then(() => {
      let currentLog = 0;
      const interval = setInterval(() => {
        if (currentLog < BOOT_LOGS.length) {
          setTypedLogs(prev => [...prev, BOOT_LOGS[currentLog]]);
          currentLog++;
          setLogIndex(currentLog);
        } else {
          clearInterval(interval);
          setTimeout(() => { setLoading(false); }, 500);
        }
      }, 200);
    });
  };

  const renderStatBar = (label, current, total, color, percentage) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-bold text-xs uppercase tracking-wider">{label}</span>
        <span className="font-bold text-xs">{current} / {total}</span>
      </div>
      <div className="neo-stat-track">
        <motion.div
          className="neo-stat-fill"
          style={{ background: color }}
          initial={{ width: '0%' }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  );

  return (
    <section id="stats" ref={sectionRef} className="relative bg-neo-muted/20" style={{ zIndex: 1 }}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-neo-secondary border-4 border-black p-2" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
              <BarChart3 size={20} strokeWidth={3} />
            </div>
            <h2 className="section-title mb-0">CODING STATS</h2>
          </div>
          <p className="section-subtitle mb-0">LIVE DATA FROM COMPETITIVE PLATFORMS</p>
        </motion.div>

        {loading ? (
          /* Terminal-style loader */
          <div className="max-w-xl mx-auto neo-card p-6 bg-black text-white" style={{ minHeight: '260px' }}>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-white/20">
              <div className="w-3 h-3 rounded-full bg-neo-accent border-2 border-white/30" />
              <div className="w-3 h-3 rounded-full bg-neo-secondary border-2 border-white/30" />
              <div className="w-3 h-3 rounded-full bg-neo-muted border-2 border-white/30" />
              <span className="ml-2 font-bold text-xs uppercase tracking-wider text-white/50">STATS_SYNC.EXE</span>
            </div>
            <div className="space-y-2 font-medium text-sm">
              {typedLogs.map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-neo-accent">&gt;</span>
                  <span className={log === 'DATA SYNCHRONIZED.' ? 'text-neo-secondary' : ''}>{log}</span>
                </div>
              ))}
              {logIndex < BOOT_LOGS.length && (
                <div className="flex items-center gap-1">
                  <span className="text-neo-accent">&gt;</span>
                  <span className="w-2 h-4 bg-neo-accent animate-blink-cursor" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* LeetCode Card */}
              <motion.div
                className="neo-card p-0 overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}

              >
                {/* Header */}
                <div className="bg-neo-accent border-b-4 border-black p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sword size={20} strokeWidth={3} />
                    <span className="font-bold text-sm uppercase tracking-wider">LEETCODE</span>
                  </div>
                  <span className="neo-badge bg-neo-secondary text-xs">● LIVE</span>
                </div>

                <div className="p-6">
                  {/* Top stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-neo-bg border-4 border-black p-3 text-center" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                      <div className="font-bold text-xs uppercase tracking-wider opacity-60">GLOBAL RANK</div>
                      <div className="text-2xl font-bold mt-1">#{lcData.ranking.toLocaleString()}</div>
                    </div>
                    <div className="bg-neo-bg border-4 border-black p-3 text-center" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                      <div className="font-bold text-xs uppercase tracking-wider opacity-60">TOTAL SOLVED</div>
                      <div className="text-2xl font-bold mt-1">{lcData.totalSolved}</div>
                    </div>
                  </div>

                  {/* Contest info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center p-3 border-4 border-black bg-neo-bg">
                      <span className="font-bold text-xs uppercase tracking-wider">CONTEST RATING</span>
                      <span className="text-xl font-bold text-neo-accent">{Math.round(lcData.contestRating)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-4 border-black bg-neo-bg">
                      <span className="font-bold text-xs uppercase tracking-wider">PERCENTILE</span>
                      <span className="text-xl font-bold">TOP {lcData.contestTopPercentage}%</span>
                    </div>
                  </div>

                  {/* Difficulty bars */}
                  {renderStatBar('EASY', lcData.easySolved, lcData.totalEasy, 'var(--color-neo-secondary)', (lcData.easySolved / lcData.totalEasy) * 100)}
                  {renderStatBar('MEDIUM', lcData.mediumSolved, lcData.totalMedium, 'var(--color-neo-muted)', (lcData.mediumSolved / lcData.totalMedium) * 100)}
                  {renderStatBar('HARD', lcData.hardSolved, lcData.totalHard, 'var(--color-neo-accent)', (lcData.hardSolved / lcData.totalHard) * 100)}

                  {/* Sub stats */}
                  <div className="mt-4 flex justify-between font-bold text-xs uppercase tracking-wider opacity-50">
                    <span>REPUTATION: {lcData.reputation}</span>
                    <span>CONTESTS: {lcData.contestAttend}</span>
                  </div>
                </div>

                {/* Profile link button */}
                <button
                  onClick={() => window.open('https://leetcode.com/u/abhiilekhborah/', '_blank')}
                  className="w-full neo-btn neo-btn-dark border-t-4 border-l-0 border-r-0 border-b-0 border-black flex items-center justify-center gap-2"
                  style={{ boxShadow: 'none' }}
                >
                  VIEW PROFILE <ExternalLink size={14} strokeWidth={3} />
                </button>
              </motion.div>

              {/* Codeforces Card */}
              <motion.div
                className="neo-card p-0 overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}

              >
                {/* Header */}
                <div className="bg-neo-secondary border-b-4 border-black p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag size={20} strokeWidth={3} />
                    <span className="font-bold text-sm uppercase tracking-wider">CODEFORCES</span>
                  </div>
                  <span className="neo-badge bg-neo-accent text-xs">● LIVE</span>
                </div>

                <div className="p-6">
                  {/* Top stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-neo-bg border-4 border-black p-3 text-center" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                      <div className="font-bold text-xs uppercase tracking-wider opacity-60">PROBLEMS SOLVED</div>
                      <div className="text-2xl font-bold mt-1">{cfData.solvedCount}</div>
                    </div>
                    <div className="bg-neo-bg border-4 border-black p-3 text-center" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                      <div className="font-bold text-xs uppercase tracking-wider opacity-60">SUBMISSIONS</div>
                      <div className="text-2xl font-bold mt-1">{cfData.totalSubmissions}</div>
                    </div>
                  </div>

                  {/* CF Metrics */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center p-3 border-4 border-black bg-neo-bg">
                      <span className="font-bold text-xs uppercase tracking-wider">MAX PROBLEM RATING</span>
                      <span className="text-xl font-bold text-neo-secondary">{cfData.maxRating}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-4 border-black bg-neo-bg">
                      <span className="font-bold text-xs uppercase tracking-wider">RANK</span>
                      <span className="text-xl font-bold">{cfData.rank}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-4 border-black bg-neo-bg">
                      <span className="font-bold text-xs uppercase tracking-wider">CONTRIBUTION</span>
                      <span className="text-xl font-bold">{cfData.contribution >= 0 ? `+${cfData.contribution}` : cfData.contribution}</span>
                    </div>
                  </div>
                </div>

                {/* Profile link button */}
                <button
                  onClick={() => window.open('https://codeforces.com/profile/abhiilekhborah', '_blank')}
                  className="w-full neo-btn neo-btn-dark border-t-4 border-l-0 border-r-0 border-b-0 border-black flex items-center justify-center gap-2"
                  style={{ boxShadow: 'none' }}
                >
                  VIEW PROFILE <ExternalLink size={14} strokeWidth={3} />
                </button>
              </motion.div>
            </div>

            {/* Resync Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleResync}
                className="neo-btn neo-btn-outline flex items-center gap-2"

              >
                <RefreshCw size={14} strokeWidth={3} />
                SYNC DATA
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
