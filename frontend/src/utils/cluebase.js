const pickByIndex = (seed, pool) => {
  const index = Math.abs(seed) % pool.length;
  return pool[index];
};

let _clueCache = null;
let _loadPromise = null;

// Decodes the compact record shape written by generate-slim-data.js:
//   r: "j" | "d" | "f"  →  round: "jeopardy" | "double" | "final"
//   dd: 1 (present) or omitted (false)
//   val: number or omitted (0)
const ROUND_DECODE = { j: "jeopardy", d: "double", f: "final" };

const toAppShape = (clue) => ({
  category:    clue.cat,
  clue:        clue.q,
  response:    clue.a,
  dailyDouble: clue.dd === 1,
  round:       ROUND_DECODE[clue.r],
  value:       clue.val || 0,
});

const loadAllClues = () => {
  if (_clueCache) return Promise.resolve(_clueCache);
  if (_loadPromise) return _loadPromise;

  _loadPromise = fetch(`${process.env.PUBLIC_URL}/jeopardy_slim.json`)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load question data: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      _clueCache = data;
      _loadPromise = null;
      return _clueCache;
    });

  return _loadPromise;
};

// "Daily Double" — picks from clues marked dd: 1.
export const fetchSelectedDouble = (seed) => {
  return loadAllClues().then((allClues) => {
    const ddClues = allClues.filter((c) => c.dd === 1);
    const pool    = ddClues.length > 0 ? ddClues : allClues;
    const clue    = pickByIndex(seed, pool);
    return { data: [toAppShape(clue)] };
  });
};

// "Daily Final" — picks from Final Jeopardy clues only (r: "f").
export const fetchSelectedFinal = (seed) => {
  return loadAllClues().then((allClues) => {
    const finalClues = allClues.filter((c) => c.r === "f");
    const pool       = finalClues.length > 0 ? finalClues : allClues;
    const clue       = pickByIndex(seed, pool);
    return { data: [toAppShape(clue)] };
  });
};

// "Daily Category" — picks today's category and returns all its clues sorted by value.
export const fetchDailyCategory = (seed) => {
  return loadAllClues().then((allClues) => {
    const gameClues = allClues.filter((c) => c.r !== "f");
    const uniqueCats = [...new Set(gameClues.map((c) => c.cat))];
    const pickedCat  = uniqueCats[Math.abs(seed) % uniqueCats.length];

    const clues = gameClues
      .filter((c) => c.cat === pickedCat)
      .sort((a, b) => (a.val || 0) - (b.val || 0))
      .map(toAppShape);

    return { category: pickedCat, clues };
  });
};
