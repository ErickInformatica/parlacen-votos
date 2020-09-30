import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PaisService } from '../../services/pais.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss'],
  providers: [PaisService, UserService]
})
export class PaisComponent implements OnInit {


  public variablesModals = {
    edit: false,
    delete: false,
    add: false
  }
  public addPais ={
    nombrePais: '',
    image: ''
  }
  public paisesData;
  public getUpdateToken;
  public token;

  tiposRondas =[
    { nombre: 'Ronda 1'},
    { nombre: 'Ronda 2'},
    { nombre: 'Nuevo Votacion Ronda 1'},
    { nombre: 'Nuevo Votacion Ronda 2'}
  ]
  uploadPercent: Observable<number>
  urlImage: Observable<string>
  imageUrl;
  public file
  constructor(private _paisService: PaisService,private _userService: UserService, private storage: AngularFireStorage) {
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {
    this.getPaises()

  }

  getPaises(){
    this._paisService.getPaises(this.token).subscribe(
      res=>{
        this.paisesData = res.datos;
        console.log(res);

      }
    )
  }

  uploadFile(evn){
    this.file = evn.target.files[0]
    console.log(this.file);

  }

  async newToken(){
    console.log(this.file);

    if(this.file !== null){
      const id = Math.random().toString(36).substring(2)
      const filePath = `paises/pais_${id}`
      const ref = this.storage.ref(filePath)
      const task = this.storage.upload(filePath, this.file);
      this.uploadPercent = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.urlImage = ref.getDownloadURL();
            this.urlImage.subscribe(url => {
              if (url) {
                this.addPais.image = url.toString();
              }
              console.log(this.addPais.image);
            });
          })
        ).subscribe(url => {
          if (url) {
            console.log(url);
          }
        });

        await this._paisService.addPais(this.token, this.addPais).subscribe(
          res=>{
            this.getPaises()
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Pais añadido con exito',
              showConfirmButton: false,
              timer: 1500
            })
          }, err =>{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.error.message,
              showConfirmButton: false,
              timer: 2000
            })
          }
        )
    }

  }

}
