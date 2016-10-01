import { Artist } from './artist.model';

export interface Track {
    artists: Artist[];
    name: string;
}
