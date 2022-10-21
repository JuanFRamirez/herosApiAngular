import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    publisher: Publisher.DCComics,
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  constructor(
    private heroesServive: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesServive.getHeroeById(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroesServive.editarHeroe(this.heroe).subscribe((heroe) => {
        console.log('Actualizando', heroe);
        this.mostrarSnackBar('heroe actualizado');
      });
    } else {
      this.heroesServive.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['heroes/editar', heroe.id]);
        this.mostrarSnackBar('heroe agregado');
      });
    }
  }

  borrarHeroe() {
    let dialog = this.dialog.open(ConfirmarComponent, {
      width: '70%',
      data: this.heroe,
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.heroesServive.borrarHeroe(this.heroe.id!).subscribe((res) => {
          this.router.navigate(['heroes/']);
        });
      }
    });
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500,
    });
  }
}
