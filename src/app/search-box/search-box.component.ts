import { Component, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { Observable } from 'rxjs';
import { Playlist } from "../spotify/model/playlist.model";

@Component({
    selector: 'app-search-box',
    template: `<md-input></md-input>`
})
export class SearchBoxComponent implements OnInit {
    @Output() loading = new EventEmitter<boolean>();
    @Output() playlists = new EventEmitter<Playlist[]>();

    constructor(private spotify: SpotifyService, private element: ElementRef) {

    }

    ngOnInit(): void {
        Observable.fromEvent(this.element.nativeElement, 'keyup')
            .map((event: any) => event.target.value)
            .filter((text: string) => text.length > 1)
            .debounceTime(250)
            .do(() => this.loading.emit(true))
            .map((query: string) => this.spotify.search(query))
            .switch()
            .subscribe(
                (playlists: Playlist[]) => {
                    this.loading.emit(false);
                    this.playlists.emit(playlists);
                },
                (error: any) => {
                    console.log(error);
                    this.loading.emit(false);
                },
                () => this.loading.emit(false)
            );
    }
}
