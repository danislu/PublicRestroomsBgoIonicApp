import * as actionTypes from './../actiontypes';
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Http } from '@angular/http';
import { Geolocation } from 'ionic-native';

import { IAppState, IPos, IMarker } from '../store';

interface IDo {
    latitude: string,
    longitude: string,
    plassering?: string,
    pris?: string,
    pissoir_only?: string,
    rullestol?: string,
    stellerom?: string,
    adresse?: string,
    id?: string,
    tid_lordag?: string,
    tid_sondag?: string,
    tid_hverdag?: string,
    place?: string
}

@Injectable()
export class MapActions {

    constructor(private ngRedux : NgRedux<IAppState>, private http : Http){
        this.init();
    }

    private init(){
        this.getMarkers();
    }

    public centerOnDevice(){
        this.isLoadingChanged(true);
        Geolocation.getCurrentPosition()
            .then((pos: any) => this.centerChanged({lat: pos.coords.latitude, lng: pos.coords.longitude }))
            .then(() => this.isLoadingChanged(false));
    }

    private isLoadingChanged(loading: boolean){
        return this.ngRedux.dispatch({
            type: actionTypes.IS_LOADING_POS,
            payload: loading
        });
    }

    public centerChanged(center: IPos){
        return this.ngRedux.dispatch({
            type: actionTypes.CHANGE_CENTER,
            payload: center
        });
    }

    public zoomChanged(zoom: number){
        return this.ngRedux.dispatch({
            type: actionTypes.CHANGE_ZOOM,
            payload: zoom
        });
    }

    public clearMarkers() {
        return this.ngRedux.dispatch({
            type: actionTypes.CLEAR_MARKERS
        });
    }

    public addMarker(marker: IMarker){
        return this.ngRedux.dispatch({
            type: actionTypes.ADD_MARKER,
            payload: marker
        });
    }

    public getMarkers(){
        this.ngRedux.dispatch({
            type: actionTypes.CLEAR_MARKERS
        });

        const url = 'https://dl.dropboxusercontent.com/u/17093134/dokart.json';
        this.http.get(url).subscribe((r) => {
            const data : any = r.json();
            const entries = data.entries;
            entries.map((dass : IDo) => {
                const marker = {
                    pos: {
                        lat: parseFloat(dass.latitude),
                        lng: parseFloat(dass.longitude)
                    },
                    //icon: 'https://dl.dropboxusercontent.com/u/17093134/restroom.png',
                    content: `
                        <h2>${dass.plassering}</h2>
                        <ul>
                            <li>Pris: ${dass.pris === "NULL" ? "Gratis" : dass.pris + " kr" }</li>
                            ${dass.pissoir_only !== "NULL" ? `<li>Bare pissoir</li>` : ''}
                            ${dass.stellerom !== "NULL" ? `<li>Har stellerom</li>` : ''}
                            ${dass.rullestol !== "NULL" ? `<li>Rullestol tilgang</li>` : ''}
                        </ul>`
                }
                this.addMarker(marker);
            });
        },
        (error) => { this.ngRedux.dispatch({
            type: "ERROR",
            message: error
        })}, 
        () => {
            this.ngRedux.dispatch({
                type: actionTypes.INIT_UPDATE,
                payload: {
                    done: true
                }
            });
        });
    }
}
