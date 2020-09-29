import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public variablesModals = {
    edit: false,
    delete: false,
    add: false
  }
  public addUser={
    email: '',
    password: ''
  }
  public users;
  public getUpdateUser;



  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      res=>{
        this.users =res.datos
        console.log(res);

      }
    )
  }

  getUserId(id){
    this._userService.getUsersById(id).subscribe(
      res=>{
        this.getUpdateUser = res
        console.log(res);

      }
    )
  }

  updateUser(){
    this._userService.udpateUser(this.getUpdateUser.id, this.getUpdateUser.datos).subscribe(
      res=>{
        console.log(res);
        this.getUsers()
      }
    )
  }

  newUser(){
    this._userService.register(this.addUser).subscribe(
      res=>{
        console.log(res);
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

}
