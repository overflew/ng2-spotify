import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { PlaylistComponent } from "./playlist/playlist.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/search', pathMatch: 'full' },
    { path: 'search', component: SearchComponent },
    { path: 'playlist/:userId/:playlistId', component: PlaylistComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
