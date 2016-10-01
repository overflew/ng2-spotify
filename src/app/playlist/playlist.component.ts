import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { SpotifyService } from "../spotify/spotify.service";
import {Playlist} from "../spotify/model/playlist.model";

@Component({
    template: `
        <md-card>
            <md-card-title-group>
                <md-card-title>Playlist</md-card-title>
            </md-card-title-group>
            <md-list>
                <md-list-item *ngFor="let track of playlist.items.track">
                    <img md-list-avatar [src]="track.album.images[2].url">
                    <h3 md-line> {{track.name}} </h3>
                </md-list-item>
            </md-list>
        </md-card>
    `
})
export class PlaylistComponent implements OnInit {
    public playlist: Playlist;

    public constructor(private spotify: SpotifyService, private route: ActivatedRoute) {
        route.params.forEach((params: Params) => {
            let userId = params['userId'];
            let playlistId = params['playlistId'];
            this.spotify.playlist(userId, playlistId)
                .subscribe(playlist => {
                    console.log(playlist);
                    this.playlist = playlist;
                })
        });
    }

    ngOnInit() {

    }
}
