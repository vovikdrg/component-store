import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotToDoComponent } from './pages/not-to-do/not-to-do.component';
import { ListComponent } from './features/list/list/list.component';

const routes: Routes = [
  { path: 'not-to-do', component: NotToDoComponent },
  { path: 'to-do', component: ListComponent },
  { path: '**', redirectTo: '/not-to-do', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
