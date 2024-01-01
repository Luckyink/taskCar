import { Observable } from "rxjs";
                
export interface Car {
    CarNo	: number,
    UserNo	: string,
    ArName	: string,
    EnName	: string,
    CardNo : string,
    Begindate	: Date,
    Enddate	: Date,
    Company : string,
    Color : Color,
    Model : string
}

export interface Color 
{
    dataID	: number,
    aName	: string,
    eName	: string,
    domainModelTreeNo	: number
}

export abstract class CarModel {
    abstract createCar(data);
    abstract updateCar(data);
    abstract deleteCar(data);
    abstract getCars(): Observable<Array<Car>>;
    abstract getColors(): Observable<Array<Color>>;
    abstract updateCarListFromDB(page, limit, search, color);
    abstract updateColorListFromDB(domainModelTreeNo);
    abstract getLastCar(): Promise<Observable<Car>>;
}

