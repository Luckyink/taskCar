import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import DataSource from 'devextreme/data/data_source';
import { takeWhile } from 'rxjs';
import { Car, CarModel, Color } from 'src/@core/entity/car/car.model';
import notify from 'devextreme/ui/notify';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit, OnDestroy {
  alive = true;
  screenWidth = 0; 
  rowCount = 1;
  labelPosition = "top"
  fieldGroupOneColumnSpan : number;

  colors : Array<Color> = [];
  lastCar : Car;

  selectedRows: Array<number>;

  saving = false;
  message = "";
  type = "success";

  carForm =  {
      CarNo	: 1,
      UserNo	: null,
      ArName	: null,
      EnName	: null,
      CardNo : null,
      Begindate	: new Date(),
      Enddate	: new Date(),
      Company : null,
      Color : null,
      Model : null
  };

  constructor(private carService: CarModel) { 
    this.fieldGroupOneColumnSpan = 1;

  }

  @HostListener('window:resize', ['$event'])  
    onResize(event : any) {  
      this.screenWidth = window.innerWidth;  
      
      if(this.screenWidth < 993)
      {
        this.rowCount = 2;
        this.fieldGroupOneColumnSpan = 1;
        this.labelPosition = "top";

      }
      else
      {
        this.fieldGroupOneColumnSpan = 2;
        this.rowCount = 1;
        this.labelPosition = "left";

      }
    } 

    async ngOnInit() 
    {  
      this.screenWidth = window.innerWidth;
      
      this.screenWidth = window.innerWidth;  
      
      if(this.screenWidth < 993)
      {
        this.rowCount = 2;
        this.fieldGroupOneColumnSpan = 1;
        this.labelPosition = "top";

      }
      else
      {
        this.fieldGroupOneColumnSpan = 2;
        this.rowCount = 1;
        this.labelPosition = "left";

      }

      this.updateDataFromDB();
      
      (await this.carService.getLastCar())
        .pipe(takeWhile(() => this.alive))
        .subscribe((data) => {
          console.log(data);
          this.lastCar = data;
          
          if(this.lastCar)
          {
            this.carForm.CarNo = this.lastCar.CarNo + 1;
          }
    
        },
        error => {
          console.log(error)
        });

        this.carService.getColors()
        .pipe(takeWhile(() => this.alive))
        .subscribe((data) => {
            this.colors = data;
            this.selectedRows = [1];
        },
        error => {
          console.log(error)
        });

        
    } 

    ngOnDestroy(): void {
        this.alive = false;
    }

    editorItemChanged(e)
    {

    }

    updateDataFromDB()
    {
      this.carService.updateColorListFromDB('100920000000');
    }

    saveCar(e)
    {
      this.message = "Please wait, request in progress";

      this.saving = true;
      this.carService.createCar(this.carForm);

      this.saving = false;

      e.preventDefault();
    }

    showMessage(message, type) {
      return notify(
          {
              message: message, 
              width: 230,
              position: {
                  at: "bottom",
                  my: "bottom",
                  of: "#invoice-form"
              }
          }, 
          type
          
      );
  }

  submitButtonOptions = {
      text: "Save",
      useSubmitBehavior: true
  }
    
}
