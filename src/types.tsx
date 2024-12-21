export type Event = {
    id: string;
    thumbnail: string;
    title: string;
    date: string;
    performers?: Performer[];
    description?: string;
    visible: boolean;
    ticketUrl?: string;
  };

export type Performer = {
  id: string;
  name: string;
  instagram: string;
}