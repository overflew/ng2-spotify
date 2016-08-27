# Building an Angular 2 app

## Project setup

After doing some research I discovered that there are quite a few ways to get started with an Angular 2 project. In the 
list below you'll find some of the available options:
* The [Quickstart](https://angular.io/docs/ts/latest/quickstart.html) example at [angular.io](https://angular.io/) will 
give you a setup using [SystemJS](https://github.com/systemjs/systemjs).
* The [Webpack: An introduction](https://angular.io/docs/ts/latest/guide/webpack.html) guide at [angular.io](https://angular.io/)
will get you setup using the [Webpack module bundler](https://webpack.github.io/).
* [Angular CLI](https://cli.angular.io/) will enable a powerful command-line tool that allows you to generate, test and 
build your project using a set of simple commands.
* Googling "Angular 2 starter" will also give you a bunch of projects with an starter pack that will allow you to get 
started immediately.

After experimenting a bit with the first three options I've found that using Webpack gave me the most mature and elegant
 solution while leaving me in control of the build process. Webpack also feels a little more familiar than SystemJS when
used to working with grunt and gulp scripts. Angular CLI also seems like a nice solution that takes away most of the 
pain of setting up a new project. At the time of writing however Angular CLI doesn't come with the latest version of 
Angular 2 and also sets up the project using SystemJS.

To get a good feeling of the several ways to setup your project I suggest you just try all of the solutions. For this
tutorial however we'll stick with Webpack.

To get started you can follow allong with the [Webpack: An introduction](https://angular.io/docs/ts/latest/guide/webpack.html)
guide at [angular.io](https://angular.io/) or you can just clone the following repo and checkout the initial commit:
1. `git clone https://github.com/headfwd/ng2-spotify.git`
1. `git checkout 23ec991df5d888605517170aa59a83f5b7feccc0`

Run `npm install` from the root of the project after you've got the files in place. This will do 2 things:
* Install all dependencies defined in `package.json`
* Install the typescript definition files using the `typings install` command as defined in the `postinstall` script in
`package.json`

After the `npm install` command completes run `npm start` to get a development server running serving the project at
`localhost:8080`. Check it out!

## Building the album search page

The first page in our application will be an album search page. For this page we're going to need a few things:
* Some framework to help us make things look nice
* A search box
* A Spotify API service
* A way to display the search results

### Angular Material

If you're like me, you don't want be spending a lot of time styling the components. To make this a little easier we can 
use some kind of CSS framework like bootstrap or we can start by using the excellent [Angular Material 2](https://material.angular.io/) 
framework which gives us access to a comprehensive set of modern UI components based on the [Google Material](https://material.google.com/)
guidelines. Although the framework is still in alpha we can already use some really nice components so we can focus on 
functionality rather than styling.

To be able to use the components in our app we have to import the dependencies of the components we're going to use. I'm
 not sure which ones we'll need in our application but I've got some ideas so for now we'll import:
* @angular2-material/core
* @angular2-material/card
* @angular2-material/input
* @angular2-material/list
* @angular2-material/progress-circle
* @angular2-material/toolbar

_Take a look at the [list of published packages](https://www.npmjs.com/~angular2-material) to checkout which components
you can already start using._

Execute the following command to import the dependencies and save them to `packages.json`:

`npm install --save @angular2-material/core @angular2-material/input @angular2-material/card @angular2-material/list @angular2-material/progress-circle @angular2-material/toolbar`

At the time of writing there Angular Material 2 has a dependency to hammerjs which is not getting imported by default so
lets install that one too:

`npm install --save hammerjs`

Since HammerJS doesn't have it's own typescript definition files we have to install it using typings:

`typings install --save --global dt~hammerjs`

To make the library available in our code we have to import them at the bottom of `src/vendor.ts` like this:

**src/vendor.ts**

```typescript
// ...

import '@angular2-material/core';
import '@angular2-material/card';
import '@angular2-material/input';
import '@angular2-material/list';
import '@angular2-material/progress-circle';
import '@angular2-material/toolbar';
```

And to be able to use them in out Angular components we also add them to the imports section in our AppModule:

**src/app/app.module.ts**

```typescript
// ...
import { MdCardModule } from '@angular2-material/card';
import { MdListModule } from '@angular2-material/list';
import { MdInputModule } from '@angular2-material/input';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdToolbarModule } from '@angular2-material/toolbar';

@NgModule({
    imports: [
        // ...
        MdCardModule,
        MdInputModule,
        MdListModule,
        MdProgressCircleModule,
        MdToolbarModule,
    ],
// ...
```

Lets see if everything is still working by running `npm start` again and checking out `localhost:8080`. Nice! Although
nothing has changed, yet...

### The search page

Okay, we've got everything setup to actually build something. We're going to start with the search page which will 
contain quite a bit of functionality:

* Build a Spotify API service to be able to use the API in our application
* Build a search box component using Observables from RxJS to monitor the input and emit the actual search results
* Build a search results component that uses the output of the search box as input to actually display the results
* Build a search component that contains both the search box and the search results component and wires everything 
together
* Use the Angular 2 Routing system to route us to the search page by default

#### The Spotify API service

Lets take a a look at the [Spotify API](https://developer.spotify.com/web-api/endpoint-reference/). We'll be
using the [search](https://developer.spotify.com/web-api/search-item/) endpoint to search for albums and the 
[album/:id](https://developer.spotify.com/web-api/get-album/) endpoint to obtain the tracks for the album.

To make sure our application understands the responses from the Spotify API we're going to define a few TypeScript 
interfaces in the `src/app/spotify/model` directory. To save up a few lines of code I've only included the properties
that we're actually going to use in our application.

**src/app/spotify/model/album.model.ts**

```typescript
import { Image } from './image.model';

export interface Album {
    images: Image[];
    name: string;
}
```

**src/app/spotify/model/albums.model.ts**

```typescript
import { Album } from "./album.model";

export interface Albums {
    items: Album[];
}
```

**src/app/spotify/model/artist.model.ts**

```typescript
export interface Artist {
    name: string;
}
```

**src/app/spotify/model/image.model.ts**

```typescript
export interface Image {
    url: string;
}
```

**src/app/spotify/model/response.model.ts**

```typescript
import { Albums } from './albums.model';

export interface Response {
    albums?: Albums;
}
```

**src/app/spotify/model/track.model.ts**

```typescript
import { Artist } from './artist.model';

export interface Track {
    artists: Artist[];
    name: string;
}
```

These definitions make sure we can reference the properties defined in these files without getting any TypeScript 
compiler errors and another nice thing is that it enables an IDE to autocomplete on these properties.

To connect with the Spotify API we're going to use the Angular 2 HttpModule. This module includes an Http service which
we'll be making available in our application by adding it to the AppModule imports section:

**src/app/app.module.ts**

```typescript
// ...
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        // ...
        HttpModule
    ],
// ...
```

Next up is the Spotify service itself:

**src/app/spotify/spotify.service.ts**

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, Http } from '@angular/http';
import { Response } from './model/response.model';
import { Album } from './model/album.model';

@Injectable()
export class SpotifyService {
    private endpoint: string = 'https://api.spotify.com/v1/';

    constructor(private http: Http) {
    }

    public search(query: string): Observable<Album[]> {
        let url: string = `${this.endpoint}search/`;
        let params: URLSearchParams = new URLSearchParams();

        params.set('q', query);
        params.set('type', 'album');

        return this.http.get(url, { search: params })
            .map(response => (<Response>response.json()).albums.items);
    }

    public album(id: string): Observable<Album> {
        let url: string = `${this.endpoint}albums/${id}`;

        return this.http.get(url)
            .map(response => <Album>response.json());
    }

}
```

A few things to note here:

* Using the Angular 2 Depency Injection system we'll inject the Http service (which we made available to the 
  application by defining it in our AppModule) as a private property in the constructor Defining it as private makes 
  sure we can access this property in other methods in the service using `this.http`
* The search method takes a `query` parameter and returns an Observable of type `Album[]`
  * It builds the url by combining the private `endpoint` field with the search query and sets the type to album to make
    sure we only get albums in the response
  * By using the http service with the url and search params we get an Observable containing the response
  * To make sure we output an Observable<Album[]> we map the items (albums in this case) as the response.
* The album method takes an `id` as parameter, uses the http service to retrieve it from the Spotify API and returns it
  as an Observable<Album>

*I'd love to introduce some unit test here but since I'm a little short on time I'll be saving that for some other time*


  
