import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  Associate,
  Division,
  Executive,
  Organization,
  Position
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private db = {
    associates: new Array<Associate>(
      {
        id: 1,
        executiveId: 1,
        positionId: 6,
        lastName: 'Nielson',
        firstName: 'Ryan',
        middleName: 'David',
        jobTitle: 'Business Development Lead',
        email: 'ryan.nielson@simulation.com',
        phone: '555.111.1234',
        isActive: true,
        address: {
          street: '2162 Silverado Cir.',
          city: 'Palm Springs',
          state: 'CA',
          zip: 92264
        }
      } as Associate,
      {
        id: 2,
        executiveId: 2,
        positionId: 5,
        lastName: 'Daniels',
        firstName: 'James',
        middleName: 'Christopher',
        jobTitle: 'Principle Agile Coach',
        email: 'james.christopher@simulation.com',
        phone: '555.111.9876',
        isActive: true,
        address: {
          street: '2150 Silverado Cir.',
          city: 'Palm Springs',
          state: 'CA',
          zip: 92264
        }
      } as Associate
    ),
    divisions: new Array<Division>(
      {
        id: 1,
        value: 'Development'
      } as Division,
      {
        id: 2,
        value: 'DevOps'
      } as Division
    ),
    executives: new Array<Executive>(
      {
        id: 1,
        organizationId: 1,
        positionId: 1,
        lastName: 'Still',
        firstName: 'Jaime',
        middleName: 'Phillip',
        jobTitle: 'Lead Software Engineer',
        ssn: '111-11-1111',
        isActive: true,
        address: {
          street: '123 Sunny Ln.',
          city: 'Dallas',
          state: 'TX',
          zip: 75104
        }
      } as Executive,
      {
        id: 2,
        organizationId: 2,
        positionId: 1,
        lastName: 'Perry',
        firstName: 'Philip',
        middleName: 'Michael',
        jobTitle: 'Software Engineer',
        ssn: '222-22-2222',
        isActive: true,
        address: {
          street: '987 Stella Dr.',
          city: 'Pinehurst',
          state: 'NC',
          zip: 28374
        }
      } as Executive
    ),
    organizations: new Array<Organization>(
      {
        id: 1,
        value: 'Microsoft'
      } as Organization,
      {
        id: 2,
        value: 'Apple'
      } as Organization,
      {
        id: 3,
        value: 'Google'
      } as Organization
    ),
    positions: new Array<Position>(
      {
        id: 1,
        divisionId: 1,
        value: 'Software Engineer'
      } as Position,
      {
        id: 2,
        divisionId: 1,
        value: 'UI / UX Designer'
      } as Position,
      {
        id: 3,
        divisionId: 1,
        value: 'Database Administrator'
      } as Position,
      {
        id: 4,
        divisionId: 2,
        value: 'Platform Engineer'
      } as Position,
      {
        id: 5,
        divisionId: 2,
        value: 'Agile Coach'
      } as Position,
      {
        id: 6,
        divisionId: 2,
        value: 'Business Analyst'
      } as Position
    )
  }

  private associates = new BehaviorSubject<Associate[]>(null);
  private divisions = new BehaviorSubject<Division[]>(null);
  private executives = new BehaviorSubject<Executive[]>(null);
  private organizations = new BehaviorSubject<Organization[]>(null);
  private positions = new BehaviorSubject<Position[]>(null);

  associates$ = this.associates.asObservable();
  divisions$ = this.divisions.asObservable();
  executives$ = this.executives.asObservable();
  organizations$ = this.organizations.asObservable();
  positions$ = this.positions.asObservable();

  getAssociates = (executive: Executive) => this.associates.next(
    this.db
      .associates
      .filter(associate => associate.executiveId === executive.id)
  );

  getDivisions = () => this.divisions.next(this.db.divisions);

  getExecutives = () => this.executives.next(this.db.executives);

  getOrganizations = () => this.organizations.next(this.db.organizations);

  getPositions = (division: Division) => this.positions.next(
    this.db
      .positions
      .filter(position => position.divisionId === division.id)
  );

  addExecutive = (executive: Executive) => this.db.executives.push(executive);

  updateExecutive = (executive: Executive) => {
    const index = this.db.executives.findIndex(ex => ex.id === executive.id);

    if (index)
      this.db.executives[index] = executive;
  }

  addAssociate = (associate: Associate) => this.db.associates.push(associate);

  updateAssociate = (associate: Associate) => {
    const index = this.db.associates.findIndex(ass => ass.id === associate.id);

    if (index)
      this.db.associates[index] = associate;
  }
}
