import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { SpotifyService } from './spotify/spotify.service';
import { routing } from './app.routing';
import { SearchComponent } from './search/search.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import {MaterialModule} from "@angular/material";
import {PlaylistComponent} from "./playlist/playlist.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        SearchComponent,
        SearchBoxComponent,
        PlaylistComponent
    ],
    providers: [
        SpotifyService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
