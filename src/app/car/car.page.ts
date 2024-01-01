import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { CarModel, Color } from 'src/@core/entity/car/car.model';

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit, OnDestroy {
  
  colors : Array<Color> = [];
  selectedRows: Array<number>;

  alive = true;

  filter = {
      
      color: null,
      cardNo: null
  }

  constructor(private carService: CarModel) { 
    
  }

  ngOnInit() {

    this.updateDataFromDB();
      
    this.carService.getColors()
        .pipe(takeWhile(() => this.alive))
        .subscribe((data) => {
          console.log(data)
            this.colors = data;
            this.selectedRows = [1];
        },
        error => {
          console.log(error)
        });
  }

  updateDataFromDB()
  {
    this.carService.updateColorListFromDB('100920000000');
  }

  ngOnDestroy(): void {
      this.alive = false;
  }
 
}
