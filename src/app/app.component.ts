import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm!: FormGroup;
  searchFrom!: FormGroup;
  modalRef!: BsModalRef;
  finalArray: any[] = [];
  showTable: boolean = false;
  selectedCompany: any;
  constructor(public fb: FormBuilder, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      clientOwner: [''],
    })
  }

  openModal(template: TemplateRef<any>) {
    this.searchFrom = this.fb.group({
      companyName: [''],
      companyId: ['']
    })
    this.finalArray = [];
    this.showTable = false;
    this.modalRef = this.modalService.show(template, {backdrop: 'static', class: 'modal-lg'});
  }

  search(obj: any) {
    let tempArr = [
      {
        "companyId" : "JPMC", 
        "companyName" : "JP Morgan Chase", 
        "crsLoginId": "client 1", 
        "emailAddr": "xyz@gmail.com"
      },
      {
        "companyId" : "GoldMan", 
        "companyName" : "Goldman sachs", 
        "crsLoginId": "client 2", 
        "emailAddr": "pqr@gmail.com"
      },
      {
        "companyId" : "Schwab", 
        "companyName" : "Charles Schwab", 
        "crsLoginId": "client 3", 
        "emailAddr": "mno@gmail.com"
      },
      {
        "companyId" : "Schwab1", 
        "companyName" : "Charles Schwab1", 
        "crsLoginId": "client 4", 
        "emailAddr": "mno1@gmail.com"
      },
      {
        "companyId" : "Ally", 
        "companyName" : "Ally Invest", 
        "crsLoginId": "client 5", 
        "emailAddr": "abc@gmail.com"
      }
    ];
    let filterArr: any[] = [];
    tempArr.forEach((val: any) => {
      Object.entries(obj.value).forEach(([key, value]) => {
        if (val[key].indexOf(value) != -1 && value) {
          filterArr.push(val);
        }
      })
    });
    this.showTable = true;
    this.finalArray = filterArr;
    this.resetFrom();
  }

  selectCompany(data: any) {
    this.selectedCompany = data;
  }

  submit() {
    this.modalRef?.hide();
    this.myForm.get('clientOwner')?.setValue(this.selectedCompany.companyName)
  }

  clearInput() {
    this.searchFrom.get('companyName')?.reset();
  }

  resetFrom() {
    this.searchFrom.reset();
  }

  closeModal() {
    this.modalRef?.hide();
  }
 }
