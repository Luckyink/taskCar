import { Injectable } from '@angular/core';

// import { Storage } from '@ionic/storage-angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn:'root'
})
export class StorageService {
  constructor(private storage: SQLite) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.storage.create({
      name: 'car.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

          db.executeSql(`
              CREATE TABLE IF NOT EXISTS [cars](
                [CarNo] [decimal](28, 0) NOT NULL,
                [UserNo] [nvarchar](191) NULL,
                [ArName] [[nvarchar](191) NULL,
                [EnName] [nvarchar](191)  NULL,
                [CardNo] [nvarchar](191)  NULL,
                [Begindate] [date] NULL,
                [Enddate] [date] NULL,
                [Company] [nvarchar](191)  NULL,
                [Color] [nvarchar](191) NULL,
                [Model] [nvarchar](191) NULL,
                
              PRIMARY KEY 
              (
                [CarNo] ASC
              )
              )`, [])
              .then(() => console.log('Care Table Created SQL'))
          .catch(e => console.log(e));
          
          db.executeSql(`
              CREATE TABLE IF NOT EXISTS [Met_DomainData](
                [dataID] [nvarchar](191) NOT NULL,
                [aName] [nvarchar](250)  NULL,
                [eName] [nvarchar](250) NULL,
                [domainModelTreeNo] [decimal](18, 6)  NULL,
               PRIMARY KEY
              (
                [dataID] ASC
              )
              )`, [])
              .then(() => {
                console.log('Met_DomainData Table Created SQL')
                
                
              })
          .catch(e => console.log(e));
           
          

          //first run insert default values
      const checkView = localStorage.getItem('second_run');
      if (checkView) {}
      else
      {
        //
        localStorage.setItem('second_run', 'ok');
        
        //insert Met_DomainData
        db.transaction(
              tx => {
                  let insert_query = `INSERT INTO Met_DomainData 
                  (
                    dataID, aName, eName, domainModelTreeNo
                  )
                  VALUES
                  ( ?, ?, ?, ?),
                  ( ?, ?, ?, ?),
                  ( ?, ?, ?, ?)
                  ;`
  
                  tx.executeSql(insert_query, 
                      [
                        'red' , 'Red' , 'Red' , '100920000000',
                        'blue' , 'Blue' , 'Blue' , '100920000000',
                        'black' , 'Black' , 'Black' , '100920000000',
                      ], function(tx, rs) {
                      console.log('INSERT done: ');
                  },function(tx, error) {
                      console.log('INSERT error: ' + error.message);
                  });
              }
            );
              
        
      }

          
      })
      .catch(e => console.log(e));


      

      


  }

  openConnection()
  {
    return this.storage.create({
      name: 'car.db',
      location: 'default'
    });
  }

}