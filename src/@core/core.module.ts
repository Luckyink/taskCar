import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DxButtonModule, DxDataGridModule, DxDropDownBoxModule, DxFormModule, DxPopupModule, DxResponsiveBoxModule, DxSelectBoxModule, DxTemplateModule, DxTextAreaModule, DxTileViewModule, DxToastModule, DxTooltipModule } from 'devextreme-angular';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { StorageService } from './services/storage/storage.service';
import { CarModel } from './entity/car/car.model';
import { CarService } from './services/car/car.service';
import { CarFormGroupService } from './services/car/form/car-formgroup.service';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const DEVEXPRESS_MODULES = [
  DxButtonModule,
  DxResponsiveBoxModule,
  DxTileViewModule,
  DxFormModule,
  DxDropDownBoxModule,
  DxDataGridModule ,
  DxToastModule,
  DxTooltipModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxTooltipModule,
  DxDataGridModule,
  DxTemplateModule,
  DxButtonModule
];

const DATA_SERVICES = [
  { provide: CarModel, useClass: CarService },
  DataService,
  CarFormGroupService,
  SQLite,
  StorageService
];

export const CORE_PROVIDERS = [
  ...DATA_SERVICES
];

const THEME_PROVIDERS = [
];

@NgModule({
  imports: [
    ...DEVEXPRESS_MODULES,...BASE_MODULES
    
  ],
  exports: [
    ...DEVEXPRESS_MODULES,...BASE_MODULES
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...CORE_PROVIDERS,
      ],
    };
  }
}
