import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NamesGQL, NamesSubscriptionGQL, AddNameGQL, DelNameGQL, NameAndDiseaseGQL, NameAndDiseaseSubscriptionGQL, DiseasesGQL, Disease } from '../generated/types.graphql-gen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [
    `
      h3 {
        font-family: monospace;
        color: blue;
        margin-left: 40px;
      }
      p {
        font-family: monospace;
        margin-left: 40px;
      }
      ul,
      button,
      input {
        font-family: monospace;
        margin-right: 5px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  names$: Observable<string[]>;
  namesSub$: Observable<{}>;
  diseases$: Observable<Disease[]>;

  title = 'graphql-angular-learning';

  constructor(
    private diseasesGQL: DiseasesGQL,
    private namesGQL: NameAndDiseaseGQL,
    private namesSubscriptionGQL: NameAndDiseaseSubscriptionGQL,
    private addNameGQL: AddNameGQL,
    private delNameGQL: DelNameGQL) {
  }

  ngOnInit() {
    this.names$ = this.namesGQL.fetch({}).pipe(
      map(result => result.data.names.map(x => x.name))
    );
    this.namesSub$ = this.namesSubscriptionGQL.subscribe();
    this.diseases$ = this.diseasesGQL.fetch().pipe(map(result => result.data.disease));
  }

  addName(newName: string, newColor: string, newNumber: number) {
    this.addNameGQL.mutate({ name: newName, number: newNumber, color: newColor }).subscribe(x => console.log(JSON.stringify(x)));
  }

  delName(id: number | string) {
    this.delNameGQL.mutate({ id: id as number }).subscribe(x => console.log(JSON.stringify(x)));
  }
}
