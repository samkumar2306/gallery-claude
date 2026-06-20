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
];

export default samplePhotos;
