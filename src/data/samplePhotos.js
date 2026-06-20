// Demo photo set — stable seeded placeholder images (Lorem Picsum)
// so the gallery has something beautiful to show before real uploads happen.
// Replace / delete these once real client photos are uploaded.

const img = (seed, w = 1200, h = 1500) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const samplePhotos = [
  // 2026
  {
    id: 'sample-2026-1',
    year: 2026,
    src: img('aurora-peak-26', 1200, 1500),
    title: 'Aurora Peak',
    caption: 'First light over the ridgeline, mid-winter ascent.',
    date: '2026-01-12',
    isSample: true,
  },
  {
    id: 'sample-2026-2',
    year: 2026,
    src: img('glass-harbor-26', 1400, 1100),
    title: 'Glass Harbor',
    caption: 'Low tide, long exposure, six minutes before sunrise.',
    date: '2026-03-04',
    isSample: true,
  },
  {
    id: 'sample-2026-3',
    year: 2026,
    src: img('quiet-orchard-26', 1200, 1600),
    title: 'Quiet Orchard',
    caption: 'Blossom season, the week it finally turned warm.',
    date: '2026-04-22',
    isSample: true,
  },
  {
    id: 'sample-2026-4',
    year: 2026,
    src: img('paper-lanterns-26', 1300, 1300),
    title: 'Paper Lanterns',
    caption: 'Street festival, second night, hand-held at f/1.8.',
    date: '2026-05-30',
    isSample: true,
  },

  // 2025
  {
    id: 'sample-2025-1',
    year: 2025,
    src: img('salt-flats-25', 1400, 1000),
    title: 'Salt Flats',
    caption: 'Mirror sky after the rare desert rain.',
    date: '2025-02-18',
    isSample: true,
  },
  {
    id: 'sample-2025-2',
    year: 2025,
    src: img('terracotta-stairwell-25', 1100, 1500),
    title: 'Terracotta Stairwell',
    caption: 'Old town, late afternoon, every wall a different warm tone.',
    date: '2025-06-09',
    isSample: true,
  },
  {
    id: 'sample-2025-3',
    year: 2025,
    src: img('night-market-25', 1300, 1300),
    title: 'Night Market',
    caption: 'Steam, neon, the smell of charcoal three streets over.',
    date: '2025-08-21',
    isSample: true,
  },
  {
    id: 'sample-2025-4',
    year: 2025,
    src: img('cedar-ridge-25', 1200, 1600),
    title: 'Cedar Ridge',
    caption: 'First snow, two hours hiking in before the light broke.',
    date: '2025-11-30',
    isSample: true,
  },
  {
    id: 'sample-2025-5',
    year: 2025,
    src: img('low-tide-pier-25', 1400, 1100),
    title: 'Low Tide Pier',
    caption: 'Barnacle line and broken light, shot from the waterline.',
    date: '2025-09-14',
    isSample: true,
  },

  // 2024
  {
    id: 'sample-2024-1',
    year: 2024,
    src: img('amber-vineyard-24', 1300, 1300),
    title: 'Amber Vineyard',
    caption: 'Harvest week, the rows still wet from morning fog.',
    date: '2024-09-02',
    isSample: true,
  },
  {
    id: 'sample-2024-2',
    year: 2024,
    src: img('blue-hour-skyline-24', 1400, 1000),
    title: 'Blue Hour Skyline',
    caption: 'Twelve floors up, fifteen minutes before the lights came on.',
    date: '2024-04-11',
    isSample: true,
  },
  {
    id: 'sample-2024-3',
    year: 2024,
    src: img('wildflower-field-24', 1200, 1600),
    title: 'Wildflower Field',
    caption: 'A short detour off the highway that turned into an hour.',
    date: '2024-05-27',
    isSample: true,
  },
  {
    id: 'sample-2024-4',
    year: 2024,
    src: img('foundry-light-24', 1100, 1500),
    title: 'Foundry Light',
    caption: 'Old industrial quarter, shaft of light through a broken roof panel.',
    date: '2024-10-19',
    isSample: true,
  },

  // 2023
  {
    id: 'sample-2023-1',
    year: 2023,
    src: img('coastal-fog-23', 1400, 1100),
    title: 'Coastal Fog',
    caption: 'The lighthouse only appeared for about ninety seconds.',
    date: '2023-03-08',
    isSample: true,
  },
  {
    id: 'sample-2023-2',
    year: 2023,
    src: img('market-portraits-23', 1100, 1400),
    title: 'Market Portraits',
    caption: 'A series of quick, candid frames, all asked for first.',
    date: '2023-07-16',
    isSample: true,
  },
  {
    id: 'sample-2023-3',
    year: 2023,
    src: img('autumn-canopy-23', 1300, 1300),
    title: 'Autumn Canopy',
    caption: 'Looking straight up, the one frame that made the whole roll worth it.',
    date: '2023-10-25',
    isSample: true,
  },
];

export default samplePhotos;
