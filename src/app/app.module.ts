import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { FilteredSelectModule } from 'filtered-select';
import { FilterSelect2Component } from './filter-select2/filter-select2.component';

@NgModule({
  declarations: [AppComponent, FilterSelect2Component],
  imports: [BrowserModule, GraphQLModule, HttpClientModule, FilteredSelectModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
