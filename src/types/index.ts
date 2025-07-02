export interface Wish {
  id: string;
  name: string;
  message: string;
  photo: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export type Page = 'entrance' | 'fullInvitation';

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  distance: string;
  type: 'restaurant' | 'hotel' | 'activity' | 'landmark';
}