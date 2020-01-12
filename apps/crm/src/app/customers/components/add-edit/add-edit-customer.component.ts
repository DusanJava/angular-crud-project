import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {Country, Customer, CustomerStatus, CustomerType, IdentityType} from '@web-starter-kit/api-interfaces';
import { CustomerService } from '../../services/customer.service';
import { MessageService } from 'primeng/api';
import {Observable} from "rxjs";

@Component({
  selector: 'crm-example-add-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {

  countries$: Observable<Array<Country>>;

  customerForm: FormGroup;

  customerTypes: Array<{ label: string, value: string }>;
  identityTypes: Array<{ label: string, value: string }>;
  customerStatuses: Array<{ label: string, value: string }>;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {

    this.customerTypes = Object.keys(CustomerType)
      .map(key => ({label: CustomerType[key], value: key}));
    this.identityTypes = Object.keys(IdentityType)
      .map(key => ({label: IdentityType[key], value: key}));
    this.customerStatuses = Object.keys(CustomerStatus)
      .map(key => ({label: CustomerStatus[key], value: key}));

    this.countries$ = this.customerService.getAllCountries();

    this.activeRoute.params
      .subscribe(
        (params: Params) => {
          const customerId = +params['id'];
          this.customerService.getCustomerById(customerId)
            .subscribe(customer => this.populateCustomer(customer));
        });

    this.createForm();
  }

  saveCustomer(): void {

    if (this.customerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid form',
        detail: 'Please fill in required fields before submitting form.'
      });
      return;
    }
    const formValue = this.customerForm.value;
    this.customerService.saveCustomer(formValue)
      .subscribe(
        res => {
          this.customerForm.reset();
          this.goBackToList();
        },
        err => console.log(err)
      );
  }

  goBackToList(): void {
    this.location.back();
  }

  private createForm(): void {
    this.customerForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      customerType: [null, Validators.required],
      identityNumber: [null],
      identityType: [null],
      country: [null],
      citizen: [null],
      registrationDate: [null],
      status: [null, Validators.required]
    });
  }

  private populateCustomer(customer: Customer) {
    let formCustomer = {} as Customer;

    if (customer) {
      formCustomer = {
        ...customer,
        customerType: customer.customerType && Object.keys(CustomerType).find(key => customer.customerType === CustomerType[key]),
        identityType: customer.identityType && Object.keys(IdentityType).find(key => customer.identityType === IdentityType[key]),
        status: customer.status && Object.keys(CustomerStatus).find(key => customer.status === CustomerStatus[key]),
        registrationDate: customer.registrationDate && new Date(customer.registrationDate)
      } as Customer;
    }

    if (this.customerForm) {
      this.customerForm.patchValue(formCustomer);
    }
  }
}
