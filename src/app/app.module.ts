import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { NgFilterSelectModule } from 'ng-filter-select';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GraphQLModule, HttpClientModule, NgFilterSelectModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
