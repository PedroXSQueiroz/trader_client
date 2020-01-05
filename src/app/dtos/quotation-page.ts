import QuotationModel from '../models/quotation-model';
import Page from './page';

class QuotationField
{
    public name:string;
    public description:string;
    public type:string;
}

export default class QuotationPage extends Page<QuotationModel>
{
    public contentProperties: QuotationField[];
}