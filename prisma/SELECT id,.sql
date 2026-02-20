SELECT id,
       title,
       description,
       price,
       tags,
       image,
       sold,
       "createdAt",
       "userId"
FROM public."Ad"
LIMIT 1000;