import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  public termino: string = '';

  heroeSeleccionado!: Heroe | undefined;

  heroes: Heroe[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => (this.heroes = heroes));
    console.log(this.termino);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (event.option.value != '') {
      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;

      this.heroesService
        .getHeroeById(heroe.id!)
        .subscribe((heroe) => (this.heroeSeleccionado = heroe));
    }
    else{
      this.heroeSeleccionado = undefined
    }
  }
}
