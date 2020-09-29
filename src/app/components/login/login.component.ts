import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public variablesModals= {
    token: false
  }
  public user = {
    email: '',
    password: '',
    token: 0
  }
  public identity
  public token
  constructor(public _userService: UserService, public _router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this._userService.login(this.user).subscribe(
      res=>{
        this.identity = res.user
        this.token =res.token
        localStorage.setItem('identity', JSON.stringify(this.identity));
        localStorage.setItem('token', JSON.stringify(this.token));
        this._router.navigate(['/home'])
      }
    )
  }

}
