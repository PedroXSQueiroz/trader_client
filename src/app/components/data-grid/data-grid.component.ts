import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

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
    private _columns:Column[]
  )
  {
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
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit 
{
  private _dataSource:DataSource<any>;

  get rows():any[]
  {
    return this._dataSource.fetch();
  }
  
  private _config:Config;

  get columns():Column[]
  {
    return this._config.columns;
  }

  constructor(private _changeDetectorRef:ChangeDetectorRef) 
  { 
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
    this._changeDetectorRef.detectChanges();
    this._changeDetectorRef.markForCheck();
  }

}
