export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  tags: string[];
  image: string | null;
  sold: boolean;
  createdAt: Date;
  userId: string;
}
