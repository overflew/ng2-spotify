import { Component } from "@angular/core";

@Component({
    template: `
        <app-search-box
            (playlists)="playlists = $event"
            (loading)="loading = $event"
            ></app-search-box>
        
        <md-card>
            <md-card-title-group>
                <md-card-title>Playlists</md-card-title>
            </md-card-title-group>
            <md-nav-list>
                <md-list-item [routerLink]="['/playlist/' + playlist.owner.id + '/' + playlist.id]" *ngFor="let playlist of playlists">
                    <img md-list-avatar [src]="playlist.images[0].url">
                    <h3 md-line> {{playlist.name}} </h3>
                </md-list-item>
            </md-nav-list>
        </md-card>
    `
})
export class SearchComponent {

}
