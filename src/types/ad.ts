export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  tags: string[];
  image: string | null;
  sold: boolean;
  createdAt: Date;
  userId: number;
}
