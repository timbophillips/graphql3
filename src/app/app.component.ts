import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CasesGQL,
  CasesQuery,
  AddNameGQL,
  DelNameGQL,
  NameAndDiseaseGQL,
  NameAndDiseaseQuery,
  NameAndDiseaseSubscriptionGQL,
  DiseasesGQL,
  DiseasesQuery,
  NamesQuery,
  ProceduresQuery,
  ProceduresGQL,
} from '../generated/types.graphql-gen';

import { option } from 'filtered-select';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  selectedOption: option;

  names$: Observable<NamesQuery['names']>;
  namesSub$: Observable<NameAndDiseaseQuery['names']>;
  diseases$: Observable<DiseasesQuery['disease']>;
  procedures$: Observable<ProceduresQuery['procedures']>;
  cases$: Observable<CasesQuery['cases']>;

  title = 'graphql-angular-learning';

  colOptions: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];

  options: option[] = [
    { text: 'Tim', id: 'TP', group: 'Parents' },
    { text: 'Ben', id: 'BP', group: 'Parents' },
    { text: 'Katie', id: 'KP', group: 'Parents' },
    { text: 'John', id: 'JP', group: 'Grandparents' },
    { text: 'Sue', id: 'SP', group: 'Grandparents' },
    { text: 'Sarah', id: 'SR', group: 'Parents' },
    { text: 'Claire', id: 'CB', group: 'Parents' },
    { text: 'Drew', id: 'AM', group: 'Parents' },
    { text: 'Molly', id: 'MP', group: 'Kids' },
    { text: 'Lucy', id: 'LP', group: 'Kids' },
    { text: 'Jess', id: 'JP2', group: 'Kids' },
    { text: 'George', id: 'GP', group: 'Kids' },
    { text: 'Daisy', id: 'DM', group: 'Kids' },
    { text: 'Benny', id: 'BP', group: 'Nicknames' },
    { text: 'Timbo', id: 'TP', group: 'Nicknames' },
    { text: 'Richo', id: 'SR', group: 'Nicknames' },
  ];

  constructor(
    private diseasesGQL: DiseasesGQL,
    private namesGQL: NameAndDiseaseGQL,
    private namesSubscriptionGQL: NameAndDiseaseSubscriptionGQL,
    private addNameGQL: AddNameGQL,
    private delNameGQL: DelNameGQL,
    private proceduresGQL: ProceduresGQL,
    private casesGQL: CasesGQL
  ) {}

  ngOnInit() {
    this.names$ = this.namesGQL
      .fetch({})
      .pipe(map((result) => result.data.names));
    this.namesSub$ = this.namesSubscriptionGQL
      .subscribe()
      .pipe(map((result) => result.data.names));
    this.diseases$ = this.diseasesGQL
      .fetch()
      .pipe(map((result) => result.data.disease));
    this.procedures$ = this.proceduresGQL
      .fetch({})
      .pipe(map((result) => result.data.procedures));
    this.cases$ = this.casesGQL
      .fetch({})
      .pipe(map((result) => result.data.cases));
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
        disease_id: newDisease,
      })
      .subscribe((x) => console.log(JSON.stringify(x)));
  }

  delName(id: number | string) {
    this.delNameGQL
      .mutate({ id: id as number })
      .subscribe((x) => console.log(JSON.stringify(x)));
  }

  onResult(id: option) {
    this.selectedOption = id;
  }
}
