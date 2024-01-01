import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarPageRoutingModule } from './car-routing.module';

import { CarPage } from './car.page';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from 'src/@core/core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CarGridComponent } from './car-grid/car-grid.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'assets/i18n/', '.json');
}

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarPageRoutingModule,
    CoreModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [CarPage, CarGridComponent]
})
export class CarPageModule {}
