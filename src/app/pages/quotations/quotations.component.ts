import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataGridComponent, Config, Column } from 'src/app/components/data-grid/data-grid.component';
import { QuotationsService } from 'src/app/services/quotations.service';
import QuotationModel from 'src/app/models/quotation-model';
import BindableDataSource from 'src/app/components/data-grid/data-sources/bindable-data-source';
import QuotationPage from 'src/app/dtos/quotation-page';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.css']
})
export class QuotationsComponent implements OnInit, AfterViewInit {
  
  private _quotationsPage: QuotationPage;

  get quotations(): QuotationModel[] 
  {
    return this._quotationsPage ? this._quotationsPage.content : [];
  }

  @ViewChild(DataGridComponent, {static: false}) grid : DataGridComponent;
  
  constructor(private _quotationsService: QuotationsService) { }

  private async load()
  {
    this._quotationsPage = await this._quotationsService.list();

    let columns:Column[] = this._quotationsPage.contentProperties.map( prop => new Column(prop.name, prop.name, prop.description) );

    this.grid.setConfig( new Config(
      columns
    ));

    this.grid.refresh();
  }

  async ngOnInit() {
    
  }
  
  async ngAfterViewInit() {
    
    this.grid.setSource( new BindableDataSource(this.grid, this, 'quotations') );
    
    await this.load();
    
  }

}
