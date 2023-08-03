import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotToDoComponent } from './pages/not-to-do/not-to-do.component';
import { ListComponent } from './features/list/list/list.component';
import { MatListItemIcon, MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { ExtendsComponent } from './features/extends/extends.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NotToDoComponent,
    ListComponent,
    ExtendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    MatProgressBarModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
