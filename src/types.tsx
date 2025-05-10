import { GalleryTypes } from "./enums";

export type Event = {
  id: string;
  thumbnail?: string;
  title: string;
  contactEmail?: string;
  date: string;
  performers?: Performer[];
  description?: string;
  slug: string;
  visible: boolean;
  hasEventPassed: boolean;
  ticketUrl?: string;
  isInArchive?: boolean;
  eventImages?: EventImage[];
  smsListId?: string;
  additionalImages?: EventImage[];
};

export type EventImage = {
  id: string;
  imageUrl: string;
}
export type Performer = {
  id: string;
  name: string;
  imageUrl?: string;
  instagram: string;
  isHost: boolean;
};

export type GalleryObject = {
  id: string;
  imageUrl: string;
  title: string;
  galleryType: GalleryTypes;
  description?: string;
};

export type WebsiteCopy = {
  id: string;
  page: string;
  section?: string;
  title?: string;
  content: string | React.ReactNode;
  image?: string;
}