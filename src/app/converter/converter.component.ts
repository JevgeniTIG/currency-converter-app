import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {ConvertService} from "../service/convert.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

interface Currency {

  value: string;
}


@Component({
  selector: 'converter-app',
  templateUrl: 'converter.component.html',
  styleUrls: ['converter.component.scss']
})

export class ConverterComponent implements OnInit, OnChanges {

  // @ts-ignore
  public converterForm: FormGroup;


  constructor(private convertService: ConvertService,
              private formBuilder: FormBuilder) {
  }


  result = "0";
  exchangeRate = 0;
  minInputAmount = 0.000000001;
  selectedFromCurrency = "";
  selectedToCurrency = "";

  currencies: Currency[] = [
    {value: 'USD'},
    {value: 'EUR'},
    {value: 'GBP'},
  ];

  ngOnInit(): void {
    this.converterForm = this.createConverterForm(1, '0');
    localStorage.setItem('inputAmount', this.converterForm.value.fromAmount)

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.converterForm.value.fromAmount !== localStorage.getItem('inputAmount')) {
      this.convert()
    }

  }


  createConverterForm(amountFrom: number, result: string): FormGroup {
    const patternForAmount = '^[0-9]\\d*(\\.\\d{1,8})?$';
    return this.formBuilder.group({
      fromAmount: [amountFrom, Validators.compose([Validators.required, Validators.min(this.minInputAmount), Validators.pattern(patternForAmount)])],
      fromCurrency: ['', Validators.compose([Validators.required])],
      toAmount: [result],
      toCurrency: ['', Validators.compose([Validators.required])],
    });
  }

  convert() {

    const currencyPair = this.selectedFromCurrency + '_' + this.selectedToCurrency;
    this.convertService.getExchangeRate(currencyPair).subscribe(data => {
      this.exchangeRate = data[currencyPair];
      this.result = (this.exchangeRate * this.converterForm.value.fromAmount).toFixed(2);
    })

  }

  swap(): void {
    let tempFromCurrency = this.selectedFromCurrency;
    this.selectedFromCurrency = this.selectedToCurrency;
    this.selectedToCurrency = tempFromCurrency;
    this.convert();

  }


}




