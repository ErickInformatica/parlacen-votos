import {ClrDatagridNumericFilterInterface, ClrDatagridStringFilterInterface} from "@clr/angular";
import { User } from './models/user.model';

export class NameFilter implements ClrDatagridStringFilterInterface<any> {
  accepts(user: any, search: string):boolean {
      return "" + user.name == search
      || user.name.toLowerCase().indexOf(search) >= 0;
  }
}



