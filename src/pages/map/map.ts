import { Component } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { IPos, IMarker } from '../../store';
import { MapActions } from './../../actions';

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage2 {
    @select(state => state.map.zoom) zoom: Observable<number>;
    @select(state => state.map.center) center: Observable<IPos>;
    @select(state => state.map.markers) markers: Observable<Array<IMarker>>;
    @select(state => state.map.isLoadingPosition) isLoadingPosition: Observable<boolean>; 

    constructor(private mapActions: MapActions) {}

    public addClicked(){
        this.mapActions.addMarker({pos: {lat: 0, lng: 0}, content: "wtf?"});
    }

    public initialize(){
        this.mapActions.getMarkers();
    }

    public centerOnDevice(){
        this.mapActions.centerOnDevice();
    }

    public removeClicked(){
        this.mapActions.clearMarkers();
    }

    public centerChanged($event: IPos){
        this.mapActions.centerChanged($event);
    }

    public zoomChanged($event: number){
        this.mapActions.zoomChanged($event);
    }
}

