import React, { createContext, useContext, useState, useEffect } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  earned: boolean;
  earnedAt?: Date;
}

interface PointsContextType {
  points: number;
  level: number;
  badges: Badge[];
  addPoints: (amount: number) => void;
  checkBadges: () => void;
  storiesRead: number;
  gamesPlayed: number;
  puzzlesSolved: number;
  incrementStoriesRead: () => void;
  incrementGamesPlayed: () => void;
  incrementPuzzlesSolved: () => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

const initialBadges: Badge[] = [
  { id: 'first_story', name: 'قارئ مبتدئ', description: 'قرأت أول قصة', emoji: '📖', earned: false },
  { id: 'story_lover', name: 'محب القصص', description: 'قرأت 5 قصص', emoji: '📚', earned: false },
  { id: 'first_game', name: 'لاعب جديد', description: 'لعبت أول لعبة', emoji: '🎮', earned: false },
  { id: 'game_master', name: 'بطل الألعاب', description: 'لعبت 5 ألعاب', emoji: '🏆', earned: false },
  { id: 'first_puzzle', name: 'محلل مبتدئ', description: 'حللت أول لغز', emoji: '🧩', earned: false },
  { id: 'puzzle_genius', name: 'عبقري الألغاز', description: 'حللت 10 ألغاز', emoji: '🧠', earned: false },
  { id: 'points_100', name: 'نجم صاعد', description: 'جمعت 100 نقطة', emoji: '⭐', earned: false },
  { id: 'points_500', name: 'نجم لامع', description: 'جمعت 500 نقطة', emoji: '🌟', earned: false },
  { id: 'explorer', name: 'المستكشف', description: 'زرت جميع الأقسام', emoji: '🗺️', earned: false },
];

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem('kids_points');
    return saved ? parseInt(saved) : 0;
  });
  
  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('kids_badges');
    return saved ? JSON.parse(saved) : initialBadges;
  });

  const [storiesRead, setStoriesRead] = useState<number>(() => {
    const saved = localStorage.getItem('kids_stories_read');
    return saved ? parseInt(saved) : 0;
  });

  const [gamesPlayed, setGamesPlayed] = useState<number>(() => {
    const saved = localStorage.getItem('kids_games_played');
    return saved ? parseInt(saved) : 0;
  });

  const [puzzlesSolved, setPuzzlesSolved] = useState<number>(() => {
    const saved = localStorage.getItem('kids_puzzles_solved');
    return saved ? parseInt(saved) : 0;
  });

  const level = Math.floor(points / 100) + 1;

  useEffect(() => {
    localStorage.setItem('kids_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('kids_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('kids_stories_read', storiesRead.toString());
  }, [storiesRead]);

  useEffect(() => {
    localStorage.setItem('kids_games_played', gamesPlayed.toString());
  }, [gamesPlayed]);

  useEffect(() => {
    localStorage.setItem('kids_puzzles_solved', puzzlesSolved.toString());
  }, [puzzlesSolved]);

  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };

  const checkBadges = () => {
    setBadges(prev => prev.map(badge => {
      if (badge.earned) return badge;
      
      let shouldEarn = false;
      switch (badge.id) {
        case 'first_story': shouldEarn = storiesRead >= 1; break;
        case 'story_lover': shouldEarn = storiesRead >= 5; break;
        case 'first_game': shouldEarn = gamesPlayed >= 1; break;
        case 'game_master': shouldEarn = gamesPlayed >= 5; break;
        case 'first_puzzle': shouldEarn = puzzlesSolved >= 1; break;
        case 'puzzle_genius': shouldEarn = puzzlesSolved >= 10; break;
        case 'points_100': shouldEarn = points >= 100; break;
        case 'points_500': shouldEarn = points >= 500; break;
      }
      
      if (shouldEarn) {
        return { ...badge, earned: true, earnedAt: new Date() };
      }
      return badge;
    }));
  };

  const incrementStoriesRead = () => {
    setStoriesRead(prev => prev + 1);
    addPoints(5);
  };

  const incrementGamesPlayed = () => {
    setGamesPlayed(prev => prev + 1);
  };

  const incrementPuzzlesSolved = () => {
    setPuzzlesSolved(prev => prev + 1);
  };

  useEffect(() => {
    checkBadges();
  }, [points, storiesRead, gamesPlayed, puzzlesSolved]);

  return (
    <PointsContext.Provider value={{
      points,
      level,
      badges,
      addPoints,
      checkBadges,
      storiesRead,
      gamesPlayed,
      puzzlesSolved,
      incrementStoriesRead,
      incrementGamesPlayed,
      incrementPuzzlesSolved,
    }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const context = useContext(PointsContext);
  if (!context) throw new Error('usePoints must be used within PointsProvider');
  return context;
}
