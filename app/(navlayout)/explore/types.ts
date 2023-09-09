export interface ResponseImage {
  id: number,
  url: string;
  desc: string | null;
  createdAt: Date;
  user: {
    image: string | null;
    name: string | null;
  } | null;
}

export interface ImagesResponse {
  images: ResponseImage[];
  hasMore: boolean;
  count: number;
}
