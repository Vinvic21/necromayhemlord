// ✏️ Edit everything about the shop here.
export const SHOP = {
  name: 'NecroMayhemlord',
  whatsapp: '19367581151', // country code + number, digits only
  whatsappDisplay: '+1 (936) 758-1151',
  phone: '(862) 237-2122',
  phoneHref: '+18622372122',
  address: '216 Jefferson St, Newark, NJ 07105',
  rating: 4.8,
  reviewCount: 212,
}

export const MAPS_QUERY = encodeURIComponent('NecroMayhemlord 216 Jefferson St Newark NJ 07105')
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`

// ✏️ Paste your links. Empty ones stay hidden until you fill them in.
export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', url: '' },
  { id: 'facebook', label: 'Facebook', url: '' },
  { id: 'tiktok', label: 'TikTok', url: '' },
  { id: 'youtube', label: 'YouTube', url: '' },
]

// Hours in New York time, 24h. null = closed.
export const HOURS = [
  ['Sunday', [11, 17]], ['Monday', null], ['Tuesday', [11, 20]], ['Wednesday', null],
  ['Thursday', [11, 20]], ['Friday', [11, 20]], ['Saturday', [11, 20]],
]

export const WORK = [
  { src: 'dragon', alt: 'Green and red Japanese dragon on the ribs', tag: 'color', title: 'Japanese dragon' },
  { src: 'sleeve', alt: 'Black and grey sleeve with portrait and roses', tag: 'grey', title: 'Black & grey sleeve' },
  { src: 'owl', alt: 'Traditional color owl headdress portrait on the calf', tag: 'color', title: 'Owl headdress' },
  { src: 'tiger', alt: 'Tiger and orange lotus on the ribs', tag: 'color', title: 'Tiger & lotus' },
  { src: 'koi', alt: 'Koi fish and lotus back piece in progress', tag: 'grey', title: 'Koi back piece' },
  { src: 'script', alt: 'Fine line heart script with dove and rosary', tag: 'grey', title: 'Script & dove' },
  { src: 'anime', alt: 'Blue-haired anime character in color', tag: 'color', title: 'Anime in color' },
  { src: 'butterfly', alt: 'Butterfly portrait in a floral sleeve', tag: 'grey', title: 'Butterfly portrait' },
  { src: 'feather', alt: 'Blue and red feather with small birds on the shoulder', tag: 'color', title: 'Feather & birds' },
  { src: 'eye', alt: 'Realistic eye in black and grey on the forearm', tag: 'grey', title: 'Realism eye' },
]

export const SERVICES = [
  { t: 'Custom tattoos', d: 'Black & grey, color, traditional, realism, Japanese, script. Bring your idea and we draw it with you.' },
  { t: 'Cover-ups & rework', d: 'Old or faded ink reshaped into something you want to show off.' },
  { t: 'Piercings', d: 'Ear, belly, industrial and more. Clients say he is patient with first-timers.' },
  { t: 'Sleeves & large pieces', d: 'Back pieces, ribs and full sleeves planned across multiple sessions.' },
]

export const REVIEWS = [
  { q: 'He gave me a great price and a perfect tattoo.', n: 'Google review' },
  { q: 'Great place, he did great work on a king chess piece on my arm.', n: 'Google review' },
  { q: 'The pricing for the tattoos is very fair and the artwork is wonderful.', n: 'Google review' },
  { q: 'Best guy for your piercing or tats. Experienced, always booked and busy.', n: 'Lon' },
]
