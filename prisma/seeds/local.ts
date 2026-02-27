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

export const localAds = (user1Id: string, user2Id: string) => [
  // Dev1 - electrónica barata para testing
  {
    title: "[DEV] Teclado USB básico",
    description: "Teclado de membrana USB para pruebas de desarrollo.",
    price: 15,
    tags: ["tecnología", "periféricos"],
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
    userId: user1Id,
  },
  {
    title: "[DEV] Ratón inalámbrico",
    description: "Ratón inalámbrico básico, funciona bien.",
    price: 12,
    tags: ["tecnología", "periféricos"],
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    userId: user1Id,
  },
  {
    title: "[DEV] Cable HDMI 2m",
    description: "Cable HDMI 2 metros, compatible 4K.",
    price: 8,
    tags: ["tecnología", "cables"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    userId: user1Id,
  },
  {
    title: "[DEV] Hub USB 4 puertos",
    description: "Hub USB 3.0 con 4 puertos, alimentación externa.",
    price: 20,
    tags: ["tecnología", "periféricos"],
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    userId: user1Id,
  },
  {
    title: "[DEV] Webcam 1080p",
    description: "Webcam Full HD con micrófono integrado.",
    price: 35,
    tags: ["tecnología", "cámara"],
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    userId: user1Id,
  },
  {
    title: "[DEV] Auriculares con cable",
    description: "Auriculares básicos jack 3.5mm.",
    price: 10,
    tags: ["tecnología", "audio"],
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=300&fit=crop",
    userId: user1Id,
  },
  {
    title: "[DEV] SSD externo 500GB",
    description: "SSD externo USB-C 500GB, velocidad 500MB/s.",
    price: 55,
    tags: ["tecnología", "almacenamiento"],
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    userId: user1Id,
  },
  {
    title: "[DEV] Lámpara escritorio LED",
    description: "Lámpara escritorio LED con puerto USB carga.",
    price: 25,
    tags: ["hogar", "iluminación"],
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    userId: user1Id,
  },
  {
    title: "[DEV] Soporte portátil aluminio",
    description: "Soporte para portátil de aluminio, regulable en altura.",
    price: 30,
    tags: ["tecnología", "accesorios"],
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
    userId: user1Id,
  },
  {
    title: "[DEV] Regleta 6 enchufes",
    description: "Regleta con 6 enchufes y 2 USB, protección sobretensión.",
    price: 18,
    tags: ["hogar", "electricidad"],
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    userId: user1Id,
  },
  // Dev2 - libros y material variado
  {
    title: "[DEV] Clean Code - Robert Martin",
    description: "Libro Clean Code en español, muy buen estado.",
    price: 18,
    tags: ["libros", "programación"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    userId: user2Id,
  },
  {
    title: "[DEV] The Pragmatic Programmer",
    description: "Edición 20 aniversario, en inglés.",
    price: 22,
    tags: ["libros", "programación"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    userId: user2Id,
  },
  {
    title: "[DEV] Mochila portátil 15",
    description: "Mochila para portátil 15 pulgadas, varios compartimentos.",
    price: 40,
    tags: ["accesorios", "mochila"],
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
    userId: user2Id,
  },
  {
    title: "[DEV] Libreta Moleskine A5",
    description: "Pack 3 libretas Moleskine A5 rayadas, nuevas.",
    price: 25,
    tags: ["papelería", "libreta"],
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop",
    userId: user2Id,
  },
  {
    title: "[DEV] Silla ergonómica",
    description: "Silla de oficina ergonómica con soporte lumbar.",
    price: 120,
    tags: ["hogar", "muebles"],
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    userId: user2Id,
  },
  {
    title: "[DEV] Botella térmica 500ml",
    description: "Botella térmica acero inoxidable, mantiene temperatura 24h.",
    price: 15,
    tags: ["accesorios", "botella"],
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop",
    userId: user2Id,
  },
  {
    title: "[DEV] Altavoz Bluetooth pequeño",
    description: "Altavoz Bluetooth portátil, resistente al agua IPX5.",
    price: 35,
    tags: ["tecnología", "audio"],
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
    userId: user2Id,
  },
  {
    title: "[DEV] Alfombrilla escritorio XL",
    description: "Alfombrilla de escritorio XL 80x40cm, superficie suave.",
    price: 20,
    tags: ["tecnología", "periféricos"],
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    userId: user2Id,
  },
  {
    title: "[DEV] Curso Udemy React",
    description: "Cuenta con acceso a curso completo React en Udemy.",
    price: 5,
    tags: ["formación", "programación"],
    image:
      "https://images.unsplash.com/photo-1547483238-f400e65ccd56?w=400&h=300&fit=crop",
    userId: user2Id,
  },
  {
    title: "[DEV] Taza programador",
    description: "Taza cerámica con mensaje de programador, 350ml.",
    price: 8,
    tags: ["accesorios", "taza"],
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop",
    userId: user2Id,
  },
];
