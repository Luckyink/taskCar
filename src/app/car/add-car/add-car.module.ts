import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCarPageRoutingModule } from './add-car-routing.module';

import { AddCarPage } from './add-car.page';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CoreModule } from 'src/@core/core.module';
import { HttpLoaderFactory } from '../car.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCarPageRoutingModule,
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
  declarations: [AddCarPage]
})
export class AddCarPageModule {}
