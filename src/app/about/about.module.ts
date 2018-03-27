import {NgModule} from '@angular/core'
import {AboutComponent} from './about.component'
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  {path: '', component: AboutComponent}
]

@NgModule({
  declarations:[AboutComponent],
  exports: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class AboutModule{}
