import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { NotificationService } from '../notification.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state(
        'hidden',
        style({
          opacity: 0,
          bottom: '0px'
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          bottom: '30px'
        })
      ),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {
  message: string = 'Hello There';

  snackVisibility: string = 'hidden';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifier
    .do(message => {
      this.message = message;
      this.snackVisibility = 'visible';
    }).switchMap(message => Observable.timer(3000))
    .subscribe(timer => this.snackVisibility = 'hidden')

    /**
     * o do operador permite fazer a alteracao no meio da cadeia (antes do subscribe)
     * o switch map troca o evento que eu emitiria
     *
     * No seu package.json na raiz do projeto, localize rxjs dependencies coloque
     * "rxjs": "5.4.3" e em devDepencies localize typescript e coloque
     * "typescript":"2.5.2"
     *
     */
  }

  toggleSnack() {
    this.snackVisibility =
      this.snackVisibility === 'hidden' ? 'visible' : 'hidden';
  }
}
