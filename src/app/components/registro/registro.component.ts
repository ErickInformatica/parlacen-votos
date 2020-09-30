import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MustMatch } from '../../filters';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UserService],
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup;

  public variablesModals = {
    token: false,
  };
  public user = {
    email: '',
    password: '',
    token: '',
  };
  public identity;
  public token;
  constructor(
    public _userService: UserService,
    public _router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  get f() { return this.registerForm.controls; }

  register(){

    if (this.registerForm.invalid) {
      return;
    }
    this._userService.register(this.user).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Correo registrado con exito',
          showConfirmButton: false,
          timer: 2000
        })

          this._router.navigate(['/login'])


      },
      err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 4000
        })
      }
    )
  }


}
