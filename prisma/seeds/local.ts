export const localUsers = [
  {
    email: "dev1@local.com",
    password: "123456",
    name: "Dev User One",
  },
  {
    email: "dev2@local.com",
    password: "123456",
    name: "Dev User Two",
  },
];

export const localAds = (user1Id: number, user2Id: number) => [
  {
    title: "[LOCAL] Teclado mecánico",
    description: "Teclado de prueba para desarrollo.",
    price: 99,
    tags: ["tecnología", "periféricos"],
    userId: user1Id,
  },
  {
    title: "[LOCAL] Monitor 4K",
    description: "Monitor de prueba, resolución 4K.",
    price: 299,
    tags: ["tecnología", "monitor"],
    userId: user1Id,
  },
  {
    title: "[LOCAL] Silla gaming",
    description: "Silla ergonómica para largas sesiones.",
    price: 180,
    tags: ["hogar", "gaming"],
    userId: user2Id,
  },
  {
    title: "[LOCAL] Auriculares Bluetooth",
    description: "Auriculares inalámbricos con cancelación de ruido.",
    price: 120,
    tags: ["tecnología", "audio"],
    userId: user2Id,
  },
];