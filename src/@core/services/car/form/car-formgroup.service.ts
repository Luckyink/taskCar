import { Injectable } from '@angular/core';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//I used this service to make car formgroup shareable between components and modules

@Injectable({
  providedIn: 'root',
})
export class CarFormGroupService {
    private carFormGroup  = new BehaviorSubject<FormGroup>(new FormGroup({}));

    constructor(private fb: FormBuilder){
        let formGroup = this.fb.group({
            "carNo": this.fb.control(null,[Validators.required]),
            "userNo": this.fb.control(null,[Validators.required]),
            "arName": this.fb.control(null,[Validators.required]),
            "enName": this.fb.control(null,[Validators.required]),
            "cardNo": this.fb.control(null,[Validators.required]),
            "beginDate": this.fb.control(new Date(), [Validators.required]),
            "endDate": this.fb.control(new Date(), [Validators.required]),
            "company": this.fb.control(null,[Validators.required]),
            "color": this.fb.control(null,[Validators.required]),
            "model": this.fb.control(null,[Validators.required])
      
          });

        this.carFormGroup.next(formGroup);
    }

    getCarFormGroup(): Observable<FormGroup> {
        return this.carFormGroup.pipe(share());
    }

    setCarFormGroup(invoice_db:FormGroup)
    {
        this.carFormGroup.next(invoice_db);
    }

}
