import { GalleryTypes } from "./enums";

export type Event = {
  id: string;
  thumbnail?: string;
  title: string;
  date: string;
  performers?: Performer[];
  description?: string;
  slug: string;
  visible: boolean;
  ticketUrl?: string;
};

export type Performer = {
  id: string;
  name: string;
  imageUrl?: string;
  instagram: string;
};

export type GalleryImage = {
  id: string;
  imageUrl: string;
  title: string;
  galleryType: GalleryTypes;
  description?: string;
}

export type WebsiteCopy = {
  id: string;
  page: string;
  section: string;
  content: string;
}