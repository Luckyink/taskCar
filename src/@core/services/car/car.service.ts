import { Injectable } from '@angular/core';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { share } from 'rxjs/operators';
import * as moment from 'moment';
import { StorageService } from '../storage/storage.service';
import { Car, CarModel, Color } from 'src/@core/entity/car/car.model';



@Injectable({
  providedIn: 'root',
})
export class CarService extends CarModel {
    private cars  = new BehaviorSubject<Array<Car>>([]);
    private colors = new BehaviorSubject<Array<Color>>([]);
    private db;

    private lastCar  = new BehaviorSubject<any>(null);

    constructor(private storage: StorageService){
        super();
        this.db = this.storage.openConnection();
    }

    getCars(): Observable<Array<Car>> {
        return this.cars.pipe(share());
    }

    setCars(invoice_db)
    {
        this.cars.next(invoice_db);
    }

    setColors(colors)
    {
        this.colors.next(colors);
    }

    getColors(): Observable<Array<Color>> {
        return this.colors.pipe(share());
    }

    updateCarListFromDB(page = 0, limit = 25, search = null, color = null) 
    {
        this.updateCarList(page, limit, search, color);
    }
    
    async updateCarList(page, limit, search, color) {
        await this.db.then(data => {
            data.transaction(tx => {
                let query = `SELECT * FROM cars`;
                let query_parameter = [limit, page];

                if(search != null)
                {
                    query += ` WHERE CarNo LIKE ? `;

                    query_parameter = ['%'+search+ '%', limit, page];

                    if(color != null)
                    {
                        query += ` AND Color = ? `;
                        query_parameter = ['%'+search+ '%',color, limit, page];
                    }
                }
                else
                {
                    if(color != null)
                    {
                        query += ` WHERE Color = ? `;
                        query_parameter = [color, limit, page];
                    }
                }

                

                tx.executeSql(
                  query + ` LIMIT ? OFFSET ?`,
                  query_parameter,
                  async (_, res) => {
                    let temp = new Array<Car>();
                    
                    // process after extraction
                    for (let i = 0; i < res.rows.length; i++) {

                        
                        temp.push(res.rows.item(i));
                    }

                    this.setCars(temp)
                  }
                );
              });
        });
        
      }

    async createCar(value: any) {
        await this.db.then(data => {
            data.transaction(
                tx => {
                    
                    let insert_query = `INSERT INTO cars 
                    (
                        CarNo, UserNo, ArName, EnName, CardNo, Begindate, Enddate , Company, Color, 
                        Model
                    )
                    VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

                    tx.executeSql(insert_query, 
                        [
                            value.CarNo, value.UserNo, value.ArName, value.EnName,
                            value.CardNo,value.Begindate, value.Enddate,
                            value.Company, value.Color, value.Model
                        ], function(tx, rs) {
                        console.log('INSERT done: ');
                    },function(tx, error) {
                        console.log('INSERT error: ' + error.message);
                    });
                },
                null, 
                this.updateCarList(0,25,null, null)
              );
                
            });

            

    }

    deleteCar(value: any) {
        this.db.then(data => {
            data.transaction(
                tx => {
                    let insert_query = `DELETE FROM cars WHERE  CarNo = ?`

                    tx.executeSql(insert_query, 
                        [
                            value.CarNo
                        ], function(tx, rs) {
                        console.log('DELETE done: ');
                    },function(tx, error) {
                        console.log('DELETE error: ' + error.message);
                    });
                },
                null, 
                this.updateCarList(0,25,null, null)
              );
                
            });

            

    }


    async updateCar(value: any) {
        await this.db.then(data => {
            data.transaction(
                tx => {
                    
                    let insert_query = `UPDATE cars SET 
                        UserNo = ?, ArName = ?, EnName = ?, CardNo = ?, Begindate = ?, 
                        Enddate = ?, Company = ?, Color = ?, Model = ? WHERE CarNo = ?;`

                    tx.executeSql(insert_query, 
                        [
                            value.UserNo, value.ArName, value.EnName,
                            value.CardNo,value.Begindate, value.Enddate,
                            value.Company, value.Color, value.Model,value.CarNo
                        ], function(tx, rs) {
                        console.log('Update done: ');
                    },function(tx, error) {
                        console.log('Update error: ' + error.message);
                    });
                },
                null, 
                this.updateCarList(0,25,null, null)
              );
                
            });

            

    }

    updateColorListFromDB(domainModelTreeNo) 
    {
        this.updateColorList(domainModelTreeNo);
    }

    async updateColorList(domainModelTreeNo) 
    {
        let db = this.storage.openConnection();

        await this.db.then(data => {
            data.transaction(tx => {
                let query = `SELECT * FROM Met_DomainData WHERE domainModelTreeNo = ?`;
                let query_parameter = [domainModelTreeNo];
                
                tx.executeSql(
                  query,
                  query_parameter,
                  async (_, res) => {
                    let temp = new Array<Color>();
                    
                    // process after extraction
                    for (let i = 0; i < res.rows.length; i++) {
                        temp.push(res.rows.item(i));
                    }

                    this.setColors(temp);
                  },function(tx, error) {
                    console.log('SELECT error: ' + error.message);
                }
                );
              });
        });
    }

    
    async getLastCar(): Promise<Observable<Car>> {
        //set and get
        await this.setLastCar();

        return this.lastCar.pipe(share());
    }

    async setLastCar()
    {
        await this.db.then(data => {
            data.transaction(tx => {
                let query = `SELECT * FROM cars`;
                let query_parameter = [1, 0];
                
                tx.executeSql(
                  query + ` ORDER BY CarNo DESC LIMIT ? OFFSET ? `,
                  query_parameter,
                  async (_, res) => {
                    
                    // process after extraction
                    if(res.rows.length > 0)
                    {
                        this.lastCar.next(res.rows.item(0));
                    }
                    else
                    {
                        this.lastCar.next(null);
                    }

                  }
                );
              });
        });

        
    }



}
