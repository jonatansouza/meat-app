import { Component, OnInit} from '@angular/core';
import {trigger, state ,style, transition, animate, group} from '@angular/animations'


import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
import { Observable } from 'rxjs/Observable'


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height':'70px',
        'margin-top':'20px'
      })),
      transition('* => *', animate('200ms 0s ease-in-out')
    )])
  ]
})

export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  searchBarState = 'hidden';
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantsService: RestaurantsService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.searchControl = this.fb.control('')

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .debounceTime(500) /* so pega a informacao apos 500ms*/
      .distinctUntilChanged() /* se for uma query igual, é ignorado */
      .switchMap(searchTerm => this.restaurantsService.restaurants(searchTerm)
        .catch(error => Observable.from([]))    )
      /* o Switch map é um guard para requisiçoes sequenciais ele ignora a requisicao anterior caso chegue uma nova */
      .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsService.restaurants().subscribe(restaurants => this.restaurants = restaurants );
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }
}
