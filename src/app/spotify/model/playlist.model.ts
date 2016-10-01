import { Image } from './image.model';
import { Tracks } from './tracks.model';
import { Owner } from "./owner.model";
import {Track} from "./track.model";

export interface Playlist {
    id: string,
    name: string;
    images: Image[];
    items: PlaylistItem[];
    owner: Owner;
}

export interface PlaylistItem {
    track: Track;
}
