import { DataSource, DataGridComponent } from '../data-grid.component';

export default class BindableDataSource<T> implements DataSource<T>
{
    private readonly _propertyDescriptor:PropertyDescriptor;
    
    constructor(
        private _grid:DataGridComponent, 
        private _container: any, 
        private _propertyName: string)
    {
        this._propertyDescriptor = Object.getOwnPropertyDescriptor( Object.getPrototypeOf(this._container), this._propertyName );
        
        let setPropertyFunction = this._propertyDescriptor.set;
        
        this._propertyDescriptor.set = (data) => {
            
            setPropertyFunction(data);

            this._grid.refresh();
        }

    }
    
    fetch(): any[] {
        return this._container[this._propertyName];
    }
    
}