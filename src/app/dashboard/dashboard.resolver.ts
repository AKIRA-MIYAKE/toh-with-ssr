import { Injectable } from '@angular/core';
import { Resolve }    from '@angular/router';

import { Hero }        from '../hero';
import { HeroService } from '../hero.service';

@Injectable()
export class DashboardResolver implements Resolve<Hero[]> {
  constructor(
    private heroService: HeroService,
  ) {}
  resolve(): Promise<Hero[]> {
    return this.heroService.getHeroes()
      .then(heroes => heroes.slice(1, 5));
  }
}
