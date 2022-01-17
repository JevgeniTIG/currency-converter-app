import {Component, OnInit} from "@angular/core";
import {ConvertService} from "../service/convert.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

interface Currency {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'converter-app',
  templateUrl: 'converter.component.html',
  styleUrls: ['converter.component.scss']
})

export class ConverterComponent implements OnInit{

  // @ts-ignore
  public converterForm: FormGroup;

  constructor(private convertService: ConvertService,
              private formBuilder: FormBuilder) {
  }


  currencies: Currency[] = [
    {value: 'usd-0', viewValue: 'USD'},
    {value: 'eur-1', viewValue: 'EUR'},
    {value: 'gbp-2', viewValue: 'GBP'},
  ];

  ngOnInit(): void {
    this.converterForm = this.createConverterForm();
  }

  createConverterForm(): FormGroup {
    return this.formBuilder.group({
      fromAmount: ['', Validators.compose([Validators.required])],
      toAmount: ['', Validators.compose([Validators.required])],

    });
  }

  getRate() {

    this.convertService.getExchangeRate('USD_RUB').subscribe(data => {

    });

  }



}
