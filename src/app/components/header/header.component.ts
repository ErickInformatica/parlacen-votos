import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../filters';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService, TokenService]
})
export class HeaderComponent implements OnInit {
  registerForm: FormGroup;
  public openModalPass = false
  public modalTokens = false
  public token
  public modelPass = {
    password: '',
    newPassword: ''
  }
  public items
  public ChartStats

  constructor(
    private db: AngularFirestore,
    public userService: UserService,
    private _tokenService: TokenService,
    private formBuilder: FormBuilder,
    private _router: Router) {
      this.token = this.userService.getToken()
    }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword'),
      }
    );
    this.getChartStats()
  }

  get f() { return this.registerForm.controls; }

  getChartStats(){
    this.items = this.db.collection('ChartStats');
  this.items.valueChanges().subscribe((res) => {
    this.ChartStats = res;
    console.log(res);

  });
  }

  changePasswordUser(){
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.changePasswordUser(this.token, this.modelPass).subscribe(
      res=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Contraseña modificada con exito',
          showConfirmButton: false,
          timer: 1500
        })
        this.openModalPass = false
      },
      err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }

  cerrarTokens(){
    this._tokenService.cerrarTokens(this.token).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tokens Cerrados con Exito',
          showConfirmButton: false,
          timer: 1500
        })
        this.modalTokens = false
      },
      err =>{
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

  cerrarSesion(){
    sessionStorage.clear()
    this._router.navigate(['']);

  }

}
