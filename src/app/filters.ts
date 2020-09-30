import {ClrDatagridNumericFilterInterface, ClrDatagridStringFilterInterface} from "@clr/angular";
import { FormGroup } from '@angular/forms';

export class NameFilter implements ClrDatagridStringFilterInterface<any> {
  accepts(user: any, search: string):boolean {
      return "" + user.name == search
      || user.name.toLowerCase().indexOf(search) >= 0;
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

