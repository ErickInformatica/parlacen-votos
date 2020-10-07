import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/filters';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  registerForm: FormGroup;
  public variablesModals = {
    edit: false,
    delete: false,
    add: false,
    pass: false
  }
  public addUser={
    email: '',
    password: ''
  }

  public newPassword = {
    password: ''
  };


  public users;
  public getUpdateUser;
  public token;


  constructor(private formBuilder: FormBuilder,private _userService: UserService) {
    this.token = this._userService.getToken()
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
    this.getUsers()
  }

  get f() { return this.registerForm.controls; }

  getUsers(){
    this._userService.getUsers(this.token).subscribe(
      res=>{
        this.users =res.datos

      }
    )
  }

  getUserId(id){
    this._userService.getUsersById(this.token,id).subscribe(
      res=>{
        this.getUpdateUser = res

      }
    )
  }

  updateUser(){
    this._userService.udpateUser(this.token, this.getUpdateUser.id, this.getUpdateUser.datos).subscribe(
      res=>{
        this.getUsers()
      }
    )
  }

  newUser(){
    this._userService.registerAdmin(this.token,this.addUser).subscribe(
      res=>{
        this.getUsers()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario añadido con exito',
          showConfirmButton: false,
          timer: 1500
        })
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  changePassword(id){
    if (this.registerForm.invalid) {
      return;
    }
    this._userService.changePasswordAdmin(this.token, id, this.newPassword).subscribe(
      res=>{
        this.getUsers()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Contraseña cambiada con exito',
          showConfirmButton: false,
          timer: 1500
        })
      }, err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

}
