import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/filters';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  registerForm: FormGroup;
  public variablesModals = {
    edit: false,
    delete: false,
    add: false,
    pass: false,
    cambioEstado: false,
    enviarEmail: false,
    setEmtidos: false,
    setEmitidosConf: false,
    masiveTrue: false,
    masiveFalse: false
  };
  public addUser = {
    email: '',
    password: '',
  };

  public newPassword = {
    password: '',
  };

  tokenEmail = 0;
  selected = [];

  public users;
  public getUpdateUser;
  public token;

  public getAbstinencia;
  public usuariosEmitidos;
  public usuariosActivos;
  public usuariosActivosTamano;
  public setVuelta = 'Vuelta 1';
  tiposRondas = [
    { nombre: 'Vuelta 1' },
    { nombre: 'Vuelta 2' },
    { nombre: 'Nuevo Votacion Vuelta 1' },
    { nombre: 'Nuevo Votacion Vuelta 2' },
    { nombre: 'Segunda Votacion Vuelta 1' },
    { nombre: 'Segunda Votacion Vuelta 2' },
    { nombre: 'Ganador' },
  ];
  public addNoEmtidos = {
    numEmitidos: 0,
    ronda: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private db: AngularFirestore
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
    this.getUsers();
  }

  get f() {
    return this.registerForm.controls;
  }

  verificacion(){
    this.variablesModals.setEmtidos = false;
    this.variablesModals.setEmitidosConf = true;
  }


  setAbstinencia() {
    this._userService
      .noEmitidos(this.token, this.setVuelta)
      .subscribe((res) => {
        console.log(res.datos);
        this.usuariosEmitidos = res.datos;

        this.usuariosActivos = this.users.filter((elem) => {
          if (elem.datos.rol === 'USER') {
            return elem.datos.activo == true;
          }
        });
        if (this.usuariosEmitidos.length === 0) {
          console.log(this.usuariosActivos);

          this.addNoEmtidos = {
            numEmitidos: this.usuariosActivos.length,
            ronda: this.setVuelta,
          };
          return this.db
            .collection('NoEmtidos')
            .add(this.addNoEmtidos)
            .then(() => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuarios a votar definidos exito',
                showConfirmButton: false,
                timer: 1500,
              });
              this.variablesModals.setEmitidosConf = false;
            });
        }

        if (this.usuariosEmitidos.length > 0) {
          this.addNoEmtidos = {
            numEmitidos: this.usuariosActivos.length,
            ronda: this.setVuelta,
          };
          return this.db
            .collection('NoEmtidos')
            .doc(this.usuariosEmitidos[0].id)
            .set(this.addNoEmtidos)
            .then(() => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuarios a votar actualizado con exito',
                showConfirmButton: false,
                timer: 1500,
              });
              this.variablesModals.setEmitidosConf = false;
            });
        }
      });
  }

  getUsers() {
    this._userService.getUsers(this.token).subscribe((res) => {
      this.users = res.datos;
      this.usuariosActivosTamano = this.users.filter((elem) => {
        if (elem.datos.rol === 'USER') {
          return elem.datos.activo == true;
        }
      });
    });
  }

  cambiarEstadoMasivoTrue() {
    let usersData = {
      usuarios: this.selected,
      activo: true,
    };
    this._userService.changeMasiveUsers(this.token, usersData).subscribe(
      res=>{
        this.getUsers();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario cambio de estado a activo con exito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.variablesModals.masiveTrue = false
      }
    )

  }

  cambiarEstadoMasivoFalse() {
    let usersData = {
      usuarios: this.selected,
      activo: false,
    };
    this._userService.changeMasiveUsers(this.token, usersData).subscribe(
      res=>{
        this.getUsers();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario cambio de estado a inactivo con exito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.variablesModals.masiveFalse = false
      }
    )
  }

  sendMails() {
    let emaildata = {
      dest: this.selected,
      token: this.tokenEmail,
    };
    console.log(this.selected);
    this._userService.sendMails(this.token, emaildata).subscribe((res) => {
      this.variablesModals.enviarEmail = false;
    });
  }

  cambiarEstado() {
    this._userService
      .cambiarEstado(
        this.token,
        this.getUpdateUser.id,
        this.getUpdateUser.datos
      )
      .subscribe((res) => {
        this.getUsers();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario cambio de estado con exito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.variablesModals.cambioEstado = false;
      });
  }

  deleteUser(id) {
    this._userService.deleteUser(this.token, id).subscribe((res) => {
      this.getUsers();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario eliminado con exito',
        showConfirmButton: false,
        timer: 1500,
      });

      this.variablesModals.delete = false;
    });
  }

  getUserId(id) {
    this._userService.getUsersById(this.token, id).subscribe((res) => {
      this.getUpdateUser = res;
    });
  }

  updateUser() {
    this._userService
      .udpateUser(this.token, this.getUpdateUser.id, this.getUpdateUser.datos)
      .subscribe((res) => {
        this.getUsers();
      });
  }

  newUser() {
    this._userService.registerAdmin(this.token, this.addUser).subscribe(
      (res) => {
        this.getUsers();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario añadido con exito',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  changePassword(id) {
    if (this.registerForm.invalid) {
      return;
    }
    this._userService
      .changePasswordAdmin(this.token, id, this.newPassword)
      .subscribe(
        (res) => {
          this.getUsers();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contraseña cambiada con exito',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }
}
