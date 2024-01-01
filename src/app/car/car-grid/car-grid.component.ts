import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DxDataGridComponent } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { takeWhile } from 'rxjs';
import { Car, CarModel, Color } from 'src/@core/entity/car/car.model';
import { DataService } from 'src/@core/services/data.service';

@Component({
  selector: 'app-car-grid',
  templateUrl: './car-grid.component.html',
  styleUrls: ['./car-grid.component.scss'],
})
export class CarGridComponent  implements OnInit, OnDestroy, OnChanges {
  @ViewChild("grid", {static: false}) grid: DxDataGridComponent;

  @Input() filter: any;

  screenWidth = 0; 
  rowCount = 1;
  labelPosition = "top"
  fieldGroupOneColumnSpan : number;

  gridDataSource: DataSource;
  selectedRows: Array<number>;

  page_no = 0;
  page_limit = 25;

  alive = true;

  colors : Array<Color> = [];

  saving = false;
  message = "";
  type = "success";
  
  constructor(private carService: CarModel, private toastController: ToastController) { }

  ngOnChanges(changes: SimpleChanges): void {
    const filter: SimpleChange = changes['filter'];

    if(typeof(filter.currentValue) !== 'undefined') {
      this.filter = filter.currentValue;

      this.updateCarListFormDb();
    }
    
  }

  ngOnInit() {
      // this.dataService.getData('companies', {}).subscribe(data => {
      //     this.gridDataSource = new DataSource({ store: { type: 'array', key: 'id', data: data }});
      //     this.selectedRows = [1];
      // });
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

      this.updateCarListFormDb();

      this.getCars();

      this.carService.getColors()
        .pipe(takeWhile(() => this.alive))
        .subscribe((data) => {
            this.colors = data;
        },
        error => {
          console.log(error)
        });

  }

  getCars()
  {
    this.carService.getCars()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        console.log(data);
          this.gridDataSource = new DataSource({ store: { type: 'array', key: 'CarNo', data: data }});
          this.selectedRows = [1];

          this.grid.instance.refresh(true);
      },
      error => {
        console.log(error)
      });
  }
  

  async updateCarListFormDb()
  {
    const toast = await this.presentToast('top', [], "Please wait, system is fetching data", 'success', null)

    await this.carService.updateCarListFromDB(this.page_no,this.page_limit, this.filter.cardNo, this.filter.color);

    await this.carService.updateColorListFromDB('100920000000');

    toast.dismiss();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  checkPageSize(e) {
    console.log(e)
    // if (e.fullName === "paging.pageSize") {
    //   if (isNaN(e.value)) {
    //     e.component.pageSize(0)
    //   }
    // }
  }

  logEvent(data)
  {
    console.log(data);
  }

  formData: Car[];
  isNewRecord = true;
  visible = false;

  showPopup = (isNewRecord, formData) => {
      this.formData = formData;
      this.isNewRecord = isNewRecord;
      this.visible = true;
  };

  hidePopup = () => { 
      this.visible = false;
  };

  confirmChanges = async () => {
    
    //
    const toast = await this.presentToast('top', [], "Please wait, request in progress", 'success', null)
    

    await this.carService.updateCar(this.formData);
    
    toast.dismiss();

    this.grid.instance.refresh(true);
    this.hidePopup();
  };

  addRow = () => {
      this.showPopup(true, {});
  };

  editRow = (e) => {
      this.showPopup(false, {...e.row.data});
  };

  deleteRow = async (e) => {
      const toastButtons = [
      {
        text: 'Confirm',
        role: 'info',
        handler: async () => {
          const toast1 = await this.presentToast('top', [], "Please wait, request in progress", 'success', null)
          await this.carService.deleteCar(e.row.data);
          toast1.dismiss();

          await this.updateCarListFormDb();

          this.getCars();

          this.grid.instance.refresh(true);

        },
      },
      {
        text: 'Dismiss',
        role: 'cancel',
        handler: () => {
          
        },
      },
    ];

    const toast = await this.presentToast('middle', toastButtons, "Are you sure?", 'danger', null)


  };

  async presentToast(position, toastButtons, message, color, duration) {
    
    const toast = await this.toastController.create({
      message: message,
      position: position,
      buttons : toastButtons,
      color : color,
      duration: duration
    });

    await toast.present();

    return toast;
  }

}

