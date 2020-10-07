import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ClrDatagrid } from '@clr/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PaisService } from '../../services/pais.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss'],
  providers: [PaisService, UserService],
})
export class PaisComponent implements OnInit {
  @ViewChild(ClrDatagrid) dg: ClrDatagrid;
  @ViewChild('imagePais') inputPais: ElementRef
  public variablesModals = {
    edit: false,
    delete: false,
    add: false,
  };
  public addPais = {
    nombrePais: '',
    image: '',
  };
  public paisesData;
  public getUpdateData;
  public token;

  tiposRondas = [
    { nombre: 'Ronda 1' },
    { nombre: 'Ronda 2' },
    { nombre: 'Nuevo Votacion Ronda 1' },
    { nombre: 'Nuevo Votacion Ronda 2' },
  ];
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  imageUrl;
  public file;
  constructor(
    private _paisService: PaisService,
    private _userService: UserService,
    private storage: AngularFireStorage
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPaises();
  }

  getPaises() {
    this._paisService.getPaises(this.token).subscribe((res) => {
      this.paisesData = res.datos;
    });
  }

  getPais(id) {
    this._paisService.getPais(this.token, id).subscribe((res) => {
      this.getUpdateData = res;
    });
  }

  deletePais(id) {
    this.storage.storage.refFromURL(this.getUpdateData.datos.image).delete()
    this._paisService.deletePais(this.token, id).subscribe(
      (res) => {
        this.getPaises();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Pais eliminado con exito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.variablesModals.delete = false
        setTimeout(() => this.dg.resize());
      },
      (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    );
  }

  updatePais(id){
    if (this.file === undefined) {
      this._paisService.updatePais(this.token, id, this.getUpdateData.datos).subscribe(
        res=>{
          this.getPaises();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pais actualizado con exito',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => this.dg.resize());
        },
        (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );

      }else{
      this.storage.storage.refFromURL(this.getUpdateData.datos.image).delete()
      const idf = Math.random().toString(36).substring(2);
      const filePath = `paises/pais_${idf}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.file);
      this.uploadPercent = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.urlImage = ref.getDownloadURL();
            this.urlImage.subscribe((url) => {
              if (url) {
                this.getUpdateData.datos.image = url.toString();
              }
              this._paisService.updatePais(this.token, id, this.getUpdateData.datos).subscribe(
                res=>{
                  this.getPaises();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Pais actualizado con exito',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  this.variablesModals.edit = false
                  setTimeout(() => this.dg.resize());
                },
                (err) => {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: err.error.message,
                    showConfirmButton: false,
                    timer: 2000,
                  });
                }
              );
            });
          })
        )
        .subscribe((url) => {
          if (url) {
          }
        });
      }
  }

  uploadFile(evn) {
    this.file = evn.target.files[0];
  }

  newToken() {
    if (this.file !== null) {
      const id = Math.random().toString(36).substring(2);
      const filePath = `paises/pais_${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.file);
      this.uploadPercent = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.urlImage = ref.getDownloadURL();
            this.urlImage.subscribe((url) => {
              if (url) {
                this.addPais.image = url.toString();
              }
              this._paisService.addPais(this.token, this.addPais).subscribe(
                (res) => {
                  this.getPaises();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Pais añadido con exito',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  this.variablesModals.add= false
                  setTimeout(() => this.dg.resize());
                },
                (err) => {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: err.error.message,
                    showConfirmButton: false,
                    timer: 2000,
                  });
                }
              );
            });
          })
        )
        .subscribe((url) => {});
    }
  }
}
