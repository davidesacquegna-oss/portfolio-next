// types/project.ts

export interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  Description: string;
  ShortDescription: string;
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
  publishedAt: string; // ISO Date
  locale: string;
  // Se aggiungerai immagini in futuro, dovrai espandere qui
  Screenshot?: {
    id: number;
    url: string;
    alternativeText: string | null;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
  }[];
  types?: {
    id: number;
    Tipo: string;
  }[];
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}