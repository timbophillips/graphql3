import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AddNameGQL,
  DelNameGQL,
  NameAndDiseaseGQL,
  NameAndDiseaseSubscriptionGQL,
  DiseasesGQL,
  Disease,
  Names
} from '../generated/types.graphql-gen';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  names$: Observable<Partial<Names>[]>;
  namesSub$: Observable<Partial<Names>[]>;
  diseases$: Observable<Partial<Disease>[]>;

  title = 'graphql-angular-learning';

  colOptions: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];

  constructor(
    private diseasesGQL: DiseasesGQL,
    private namesGQL: NameAndDiseaseGQL,
    private namesSubscriptionGQL: NameAndDiseaseSubscriptionGQL,
    private addNameGQL: AddNameGQL,
    private delNameGQL: DelNameGQL
  ) {}

  ngOnInit() {
    this.names$ = this.namesGQL
      .fetch({})
      .pipe(map(result => result.data.names));
    this.namesSub$ = this.namesSubscriptionGQL
      .subscribe()
      .pipe(map(result => result.data.names));
    this.diseases$ = this.diseasesGQL
      .fetch()
      .pipe(map(result => result.data.disease));

    // debug
    this.namesGQL.fetch({}).subscribe(x => console.log(x));
  }

  addName(
    newName: string,
    newColor: string,
    newNumber: number,
    newDisease?: number
  ) {
    // tslint:disable-next-line: max-line-length
    this.addNameGQL
      .mutate({
        name: newName,
        number: newNumber,
        color: newColor,
        disease_id: newDisease
      })
      .subscribe(x => console.log(JSON.stringify(x)));
  }

  delName(id: number | string) {
    this.delNameGQL
      .mutate({ id: id as number })
      .subscribe(x => console.log(JSON.stringify(x)));
  }
}
