import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, Http } from '@angular/http';
import { Response } from './model/response.model';
import { Playlist } from "./model/playlist.model";

@Injectable()
export class SpotifyService {
    private endpoint: string = 'https://api.spotify.com/v1/';

    constructor(private http: Http) {
    }

    public search(query: string): Observable<Playlist[]> {
        let url: string = `${this.endpoint}search/`;
        let params: URLSearchParams = new URLSearchParams();

        params.set('q', query);
        params.set('type', 'playlist');

        return this.http.get(url, { search: params })
            .map(response => (<Response>response.json()).playlists.items);
    }

    public playlist(userId: string, playlistId: string): Observable<Playlist> {
        let url: string = `${this.endpoint}users/${userId}/playlists/${playlistId}`;

        return this.http.get(url)
            .map(response => <Playlist>response.json());
    }

    // public album(id: string): Observable<Album> {
    //     let url: string = `${this.endpoint}albums/${id}`;
    //
    //     return this.http.get(url)
    //         .map(response => <Album>response.json());
    // }

}
