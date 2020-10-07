import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [UserService]
})
export class SidebarComponent implements OnInit {

  constructor(public UserService: UserService) { }

  ngOnInit(): void {
  }

}
