export const cloudUsers = [
  {
    email: "carlos@marketplace.com",
    password: "123456",
    name: "Carlos García",
  },
  {
    email: "ana@marketplace.com",
    password: "123456",
    name: "Ana Martínez",
  },
];

export const cloudAds = (user1Id: number, user2Id: number) => [
  {
    title: "Bicicleta de montaña",
    description: "Bicicleta en perfecto estado, poco uso.",
    price: 350,
    tags: ["deporte", "bicicleta"],
    userId: user1Id,
  },
  {
    title: "iPhone 13 Pro",
    description: "iPhone 13 Pro 256GB, con caja original.",
    price: 750,
    tags: ["tecnología", "móvil"],
    userId: user1Id,
  },
  {
    title: "Mesa de madera",
    description: "Mesa de comedor de roble macizo para 6 personas.",
    price: 200,
    tags: ["hogar", "muebles"],
    userId: user2Id,
  },
  {
    title: "Guitarra Fender Stratocaster",
    description: "Guitarra eléctrica Fender, incluye funda.",
    price: 600,
    tags: ["música", "guitarra"],
    userId: user2Id,
  },
];