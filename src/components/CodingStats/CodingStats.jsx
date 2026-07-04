import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useScrollSection';
import { playMenuHover, playMenuSelect, playCoinSound } from '../../utils/sounds';
import PixelIcon from '../UI/PixelIcon';

// Default static fallback statistics matching user's profile
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
  'CONTACTING ANCIENT SCRIBE ORACLES...',
  'UNROLLING LEETCODE.SYS SCROLL RECORDS...',
  'UNROLLING CODEFORCES.EXE API SCROLLS...',
  'FETCHING REAL-TIME CONTEST RATINGS...',
  'TRANSCRIBING DSA BATTLE RECORDS...',
  'LOGBOOK SYNCHRONIZED. CHRONICLES LOADED.'
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
    } catch {
      return FALLBACK_LC;
    }
  });

  const [cfData, setCfData] = useState(() => {
    try {
      const cached = sessionStorage.getItem('cf_stats');
      return cached ? JSON.parse(cached) : FALLBACK_CF;
    } catch {
      return FALLBACK_CF;
    }
  });

  // Stats Caching using SessionStorage
  const fetchStats = async (force = false) => {
    if (!force) {
      const cachedLc = sessionStorage.getItem('lc_stats');
      const cachedCf = sessionStorage.getItem('cf_stats');
      if (cachedLc && cachedCf) {
        return;
      }
    }

    try {
      // 1. Fetch LeetCode General Data
      const lcPromise = fetch('https://leetcode-api-faisalshohag.vercel.app/abhiilekhborah')
        .then(res => {
          if (!res.ok) throw new Error('LC fetch failed');
          return res.json();
        })
        .catch(() => null);

      // 2. Fetch LeetCode Contest Rating Data
      const lcContestPromise = fetch('https://alfa-leetcode-api.onrender.com/abhiilekhborah/contest')
        .then(res => {
          if (!res.ok) throw new Error('LC contest fetch failed');
          return res.json();
        })
        .catch(() => null);

      // 3. Fetch Codeforces Info
      const cfInfoPromise = fetch('https://codeforces.com/api/user.info?handles=abhiilekhborah')
        .then(res => {
          if (!res.ok) throw new Error('CF Info failed');
          return res.json();
        })
        .catch(() => ({ status: 'FAILED' }));

      // 4. Fetch Codeforces Status
      const cfStatusPromise = fetch('https://codeforces.com/api/user.status?handle=abhiilekhborah')
        .then(res => {
          if (!res.ok) throw new Error('CF Status failed');
          return res.json();
        })
        .catch(() => ({ status: 'FAILED' }));

      const [lcResult, lcContestResult, cfInfoResult, cfStatusResult] = await Promise.all([
        lcPromise,
        lcContestPromise,
        cfInfoPromise,
        cfStatusPromise
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

      // Process Codeforces data if successful
      let cfSolved = FALLBACK_CF.solvedCount;
      let cfMaxRating = FALLBACK_CF.maxRating;
      let cfTotalSub = FALLBACK_CF.totalSubmissions;
      let cfContribution = FALLBACK_CF.contribution;
      let cfRank = FALLBACK_CF.rank;

      if (cfInfoResult && cfInfoResult.status === 'OK' && cfInfoResult.result[0]) {
        const info = cfInfoResult.result[0];
        cfContribution = info.contribution ?? 0;
        cfRank = info.rank ? info.rank.toUpperCase() : 'UNRATED';
      }

      if (cfStatusResult && cfStatusResult.status === 'OK' && cfStatusResult.result) {
        const submissions = cfStatusResult.result;
        cfTotalSub = submissions.length;
        
        const uniqueSolved = new Set();
        let maxRated = 0;
        submissions.forEach(sub => {
          if (sub.verdict === 'OK') {
            const key = `${sub.problem.contestId}-${sub.problem.index}`;
            uniqueSolved.add(key);
            if (sub.problem.rating) {
              maxRated = Math.max(maxRated, sub.problem.rating);
            }
          }
        });

        if (uniqueSolved.size > 0) {
          cfSolved = uniqueSolved.size;
        }
        if (maxRated > 0) {
          cfMaxRating = maxRated;
        }
      }

      const formattedCf = {
        handle: 'abhiilekhborah',
        solvedCount: cfSolved,
        totalSubmissions: cfTotalSub,
        maxRating: cfMaxRating,
        rank: cfRank,
        contribution: cfContribution,
      };

      setCfData(formattedCf);
      sessionStorage.setItem('cf_stats', JSON.stringify(formattedCf));

    } catch (e) {
      console.warn('Real-time stats sync error. Using cached/fallback stats.', e);
    }
  };

  // Triggers boot loader text when section enters view
  useEffect(() => {
    if (isInView && loading) {
      setTimeout(() => {
        fetchStats(false).catch(console.warn);
      }, 0);
      
      let currentLog = 0;
      const interval = setInterval(() => {
        if (currentLog < BOOT_LOGS.length) {
          setTypedLogs(prev => [...prev, BOOT_LOGS[currentLog]]);
          currentLog++;
          setLogIndex(currentLog);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            playCoinSound();
          }, 600);
        }
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isInView, loading]);

  const handleResync = () => {
    playMenuSelect();
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
          setTimeout(() => {
            setLoading(false);
            playCoinSound();
          }, 500);
        }
      }, 250);
    });
  };

  // Helper component to render progress bars
  const renderStatBar = (label, current, total, color, percentage) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1" style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
          <span style={{ color }}>{label}</span>
          <span style={{ color: 'var(--color-text-muted)' }}>{current} / {total}</span>
        </div>
        <div className="stat-bar-track" style={{ height: '14px', border: '2px solid var(--color-panel-border)' }}>
          <motion.div
            className="stat-bar-fill"
            style={{ background: color, height: '100%' }}
            initial={{ width: '0%' }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, ease: 'linear' }}
          />
        </div>
      </div>
    );
  };

  return (
    <section id="stats" ref={sectionRef} className="relative" style={{ zIndex: 1 }}>
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span style={{ color: 'var(--color-amber)' }}><PixelIcon name="gamepad" size={24} color="var(--color-amber)" /> </span>
          <span>BATTLE STATS</span>
          <span style={{ color: 'var(--color-amber)' }}> <PixelIcon name="gamepad" size={24} color="var(--color-amber)" /></span>
        </motion.div>

        <motion.div
          className="text-center mb-10"
          style={{ fontFamily: 'var(--font-vt)', fontSize: '20px', color: 'var(--color-text-muted)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          LIVE DATA CHRONICLES FROM THE CODING GUILDS
        </motion.div>

        {loading ? (
          /* Retro scroll scribe loader */
          <div className="max-w-xl mx-auto dialogue-box p-6" style={{ background: '#f0e6d3', border: '4px solid #6b5a3e', minHeight: '260px' }}>
            <div className="absolute top-0 left-0 right-0 px-4 py-2 flex items-center justify-between" style={{
              borderBottom: '2px dashed rgba(107, 90, 62, 0.4)',
            }}>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: '#3a2820' }}>SCRIBE_SCROLL.LOG</span>
              <div className="flex gap-1 text-[#6b5a3e]">
                <span className="font-pixel text-[8px]">✦</span>
              </div>
            </div>

            <div className="mt-8 font-vt text-[18px] text-[#3a2820] space-y-2">
              {typedLogs.map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span style={{ color: 'var(--color-rust)' }}>{'>'}</span>
                  <span>{log}</span>
                </div>
              ))}
              {logIndex < BOOT_LOGS.length && (
                <div className="flex items-center gap-1">
                  <span style={{ color: 'var(--color-rust)' }}>{'>'}</span>
                  <span className="w-2.5 h-4 bg-var(--color-rust) animate-blink" style={{ backgroundColor: 'var(--color-rust)' }} />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Loaded double logbook stats view */
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* LeetCode Logbook */}
              <motion.div
                className="pixel-border-pink p-6 flex flex-col justify-between"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => playMenuHover()}
                whileHover={{ y: -6, boxShadow: '0 0 20px rgba(199, 91, 57, 0.3)' }}
              >
                <div>
                  {/* Cabinet Header */}
                  <div className="flex justify-between items-center mb-6 pb-2" style={{ borderBottom: '2px dashed rgba(199, 91, 57, 0.3)' }}>
                    <div className="flex items-center gap-2">
                      <PixelIcon name="sword" size={24} color="var(--color-rust)" />
                      <span className="text-rust" style={{ fontFamily: 'var(--font-pixel)', fontSize: '11px', letterSpacing: '1px' }}>
                        LEETCODE CHRONICLES
                      </span>
                    </div>
                    <span className="animate-blink-soft" style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px', color: 'var(--color-forest-light)' }}>
                      ● ACTIVE
                    </span>
                  </div>

                  {/* High Level Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="p-3 bg-[rgba(199,91,57,0.05)] border border-[rgba(199,91,57,0.2)] text-center">
                      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px', color: 'var(--color-text-muted)' }}>GLOBAL RANK</div>
                      <div className="text-rust mt-1 text-[24px] font-bold" style={{ fontFamily: 'var(--font-vt)' }}>
                        #{lcData.ranking.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 bg-[rgba(199,91,57,0.05)] border border-[rgba(199,91,57,0.2)] text-center">
                      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px', color: 'var(--color-text-muted)' }}>TOTAL SOLVED</div>
                      <div className="text-rust mt-1 text-[24px] font-bold" style={{ fontFamily: 'var(--font-vt)' }}>
                        {lcData.totalSolved}
                      </div>
                    </div>
                  </div>

                  {/* LeetCode Contest Ranking Details */}
                  <div className="space-y-2 mb-5 font-vt text-[16px]">
                    <div className="flex justify-between items-center p-3 border border-dashed border-[rgba(199,91,57,0.2)] bg-[rgba(199,91,57,0.02)]">
                      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: 'var(--color-rust)' }}>CONTEST RATING</span>
                      <span className="text-[22px] font-bold" style={{ color: 'var(--color-amber)' }}>
                        {Math.round(lcData.contestRating)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-dashed border-[rgba(199,91,57,0.2)] bg-[rgba(199,91,57,0.02)]">
                      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: 'var(--color-rust)' }}>PERCENTILE STATUS</span>
                      <span className="text-[20px] font-bold" style={{ color: 'var(--color-forest-light)' }}>
                        TOP {lcData.contestTopPercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Difficulty Progress Bars */}
                  <div className="space-y-2">
                    {renderStatBar(
                      'EASY LABORS',
                      lcData.easySolved,
                      lcData.totalEasy,
                      'var(--color-forest-light)',
                      (lcData.easySolved / lcData.totalEasy) * 100
                    )}
                    {renderStatBar(
                      'MEDIUM TRIALS',
                      lcData.mediumSolved,
                      lcData.totalMedium,
                      'var(--color-gold)',
                      (lcData.mediumSolved / lcData.totalMedium) * 100
                    )}
                    {renderStatBar(
                      'HARD QUESTS',
                      lcData.hardSolved,
                      lcData.totalHard,
                      'var(--color-rust)',
                      (lcData.hardSolved / lcData.totalHard) * 100
                    )}
                  </div>

                  {/* Sub stats */}
                  <div className="mt-4 flex justify-between px-1" style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px', color: 'var(--color-text-dim)' }}>
                    <span>REPUTATION: {lcData.reputation}</span>
                    <span>CONTESTS: {lcData.contestAttend}</span>
                  </div>
                </div>

                {/* Profile Link Button */}
                <button
                  onClick={() => { playMenuSelect(); window.open('https://leetcode.com/u/abhiilekhborah/', '_blank'); }}
                  className="mt-6 w-full py-2.5 cursor-pointer text-center"
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '8px',
                    color: '#000',
                    background: 'var(--color-rust)',
                    border: 'none',
                    transition: 'all 0.1s',
                  }}
                  onMouseEnter={(e) => e.target.style.filter = 'brightness(1.2)'}
                  onMouseLeave={(e) => e.target.style.filter = 'none'}
                >
                  EXAMINE SCROLL ▶
                </button>
              </motion.div>

              {/* Codeforces Logbook */}
              <motion.div
                className="pixel-border p-6 flex flex-col justify-between"
                style={{ borderColor: 'var(--color-panel-border)', background: 'var(--color-panel-bg)' }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => playMenuHover()}
                whileHover={{ y: -6, boxShadow: '0 0 20px rgba(107, 90, 62, 0.4)' }}
              >
                <div>
                  {/* Cabinet Header */}
                  <div className="flex justify-between items-center mb-6 pb-2" style={{ borderBottom: '2px dashed rgba(107, 90, 62, 0.4)' }}>
                    <div className="flex items-center gap-2">
                      <PixelIcon name="flag" size={24} color="var(--color-gold)" />
                      <span className="text-gold" style={{ fontFamily: 'var(--font-pixel)', fontSize: '11px', letterSpacing: '1px' }}>
                        CODEFORCES CHRONICLES
                      </span>
                    </div>
                    <span className="animate-blink-soft" style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px', color: 'var(--color-forest-light)' }}>
                      ● ACTIVE
                    </span>
                  </div>

                  {/* High Level Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-[rgba(212,166,85,0.05)] border border-[rgba(212,166,85,0.2)] text-center">
                      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px', color: 'var(--color-text-muted)' }}>SOLVED QUESTS</div>
                      <div className="text-gold mt-1 text-[24px] font-bold" style={{ fontFamily: 'var(--font-vt)' }}>
                        {cfData.solvedCount}
                      </div>
                    </div>
                    <div className="p-3 bg-[rgba(212,166,85,0.05)] border border-[rgba(212,166,85,0.2)] text-center">
                      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px', color: 'var(--color-text-muted)' }}>TOTAL SUBMISSIONS</div>
                      <div className="text-gold mt-1 text-[24px] font-bold" style={{ fontFamily: 'var(--font-vt)' }}>
                        {cfData.totalSubmissions}
                      </div>
                    </div>
                  </div>

                  {/* Custom CF metrics */}
                  <div className="space-y-4 font-vt text-[18px] text-[#aaa]">
                    <div className="flex justify-between items-center p-3 border border-dashed border-[rgba(107,90,62,0.2)] bg-[rgba(107,90,62,0.02)]">
                      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: 'var(--color-text-muted)' }}>MAX SOLVED LEVEL</span>
                      <span className="text-[22px] font-bold" style={{ color: 'var(--color-forest-light)' }}>
                        {cfData.maxRating}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 border border-dashed border-[rgba(107,90,62,0.2)] bg-[rgba(107,90,62,0.02)]">
                      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: 'var(--color-text-muted)' }}>GUILD RANK STATUS</span>
                      <span className="text-[20px] font-bold" style={{ color: cfData.rank === 'UNRATED' ? 'var(--color-text-dim)' : 'var(--color-gold)' }}>
                        {cfData.rank}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 border border-dashed border-[rgba(107,90,62,0.2)] bg-[rgba(107,90,62,0.02)]">
                      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: 'var(--color-text-muted)' }}>INFLUENCE POINT</span>
                      <span className="text-[20px] font-bold" style={{ color: 'var(--color-amber)' }}>
                        {cfData.contribution >= 0 ? `+${cfData.contribution}` : cfData.contribution}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Link Button */}
                <button
                  onClick={() => { playMenuSelect(); window.open('https://codeforces.com/profile/abhiilekhborah', '_blank'); }}
                  className="mt-6 w-full py-2.5 cursor-pointer text-center"
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '8px',
                    color: '#000',
                    background: 'var(--color-gold)',
                    border: 'none',
                    transition: 'all 0.1s',
                  }}
                  onMouseEnter={(e) => e.target.style.filter = 'brightness(1.2)'}
                  onMouseLeave={(e) => e.target.style.filter = 'none'}
                >
                  EXAMINE SCROLL ▶
                </button>
              </motion.div>
            </div>

            {/* Sync Controls */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleResync}
                className="pixel-border px-5 py-3 cursor-pointer text-center flex items-center gap-2"
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '8px',
                  color: 'var(--color-gold)',
                  border: '3px solid var(--color-gold)',
                  background: 'rgba(30, 22, 48, 0.85)',
                  transition: 'transform 0.1s',
                }}
                onMouseEnter={(e) => { e.target.style.background = 'rgba(212, 166, 85, 0.08)'; playMenuHover(); }}
                onMouseLeave={(e) => { e.target.style.background = 'rgba(30, 22, 48, 0.85)'; }}
              >
                <PixelIcon name="reload" size={14} color="var(--color-gold)" />
                SYNC DATA RECORD
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
