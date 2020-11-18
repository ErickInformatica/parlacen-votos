import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [UserService]
})
export class SidebarComponent implements OnInit {
  public token
  constructor(public UserService: UserService) {
    this.token = this.UserService.getToken()
   }

  ngOnInit(): void {
  }

  COCharts(){
    this.UserService.COCharts(this.token).subscribe(
      res=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Graficas actualizadas con exito',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }

}
