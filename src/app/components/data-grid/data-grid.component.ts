import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, AfterViewChecked } from '@angular/core';

export class Column
{
  
  constructor(
    private _name:string, 
    private _property:string,
    private _description:string,
    private _templateName:string = null
    )
  {
  }
  
  get name():string
  {
    return this._name;
  }

  get property():string
  {
    return this._property;
  }

  get description():string
  {
    return this._description;
  }

  get templateName():string
  {
    return this._templateName;
  }

  set templateName(name:string)
  {
    this._templateName = name;
  }

}

export class Config
{
  constructor(
    private _columns:Column[],
    private _total:number
  )
  {
  }

  get total():number
  {
    return this._total;
  }

  get columns():Column[]
  {
    return this._columns;
  }
}

export interface DataSource<T>{
  fetch():T[];
}

@Component({
  selector: 'data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DataGridComponent implements OnInit
{
  private _dataSource:DataSource<any>;

  private _rows:any[];
  
  get rows():any[]
  {
    return this._rows;
  }
  
  private _config:Config;

  get columns():Column[]
  {
    return this._config.columns;
  }

  get total():number
  {
    return this._config.total;
  }

  private _currentPage:number;

  get currentPage():number
  {
    return this._currentPage;
  }

  set currentPage(page:number)
  {
    this._currentPage = page;
    this.refresh();
  }

  private _currentPageSize:number = 50;

  get currentPageSize():number
  {
    return this._currentPageSize;
  }

  set currentPageSize(size:number)
  {
    this._currentPageSize = size;
  }

  constructor(private _changeDetectorRef:ChangeDetectorRef) 
  { 
    this._currentPage = 1;
  }
  
  ngOnInit() 
  {
    this._changeDetectorRef.detach();
  }

  setConfig(config:Config)
  {
    this._config = config;
  }

  setSource(dataSource: DataSource<any>)
  {
    this._dataSource = dataSource;
  }

  refresh()
  {
    this._rows = this._dataSource.fetch();
    this._changeDetectorRef.detectChanges();
  }

}
