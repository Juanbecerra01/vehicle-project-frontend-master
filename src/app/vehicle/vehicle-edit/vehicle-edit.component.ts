import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VehicleService} from '../vehicle.service';
import {Bus} from '../entity/bus.model';
import {Suv} from '../entity/suv.model';
import {SedanPost} from '../interfaces/sedanPost';
import {BusAndVanPost} from '../interfaces/busAndVanPost';
import {SuvPosts} from '../interfaces/suvPosts';
import {PostsService} from '../../posts.service';
import {CanComponentDeactivate} from '../changes-guard.services';
import {Observable} from 'rxjs';
import {Sedan} from '../entity/sedan.model';
import {Vehicle} from '../vehicle.model';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit, CanComponentDeactivate {
  id: number;
  editMode = false;
  vehicleForm: FormGroup;
  vehicleTypes: string[] = ['COUPE', 'VAN', 'SEDAN', 'SUV', 'HATCH', 'BUS'];
  selectedValue = null;
  changesSaved = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private vehicleService: VehicleService,
              private http: PostsService) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.formInit();
        }
      )
  }

  selectChangeHandler(event: any){
    if(!this.editMode){
      if(this.selectedValue === 'VAN' || this.selectedValue === 'BUS'){
        this.vehicleForm.addControl('numOfSeats', new FormControl('',Validators.required));
        this.vehicleForm.addControl('licenseType', new FormControl('',Validators.required));
      }else if(this.selectedValue === 'SUV'){
        this.vehicleForm.addControl('towingCapacity', new FormControl('',Validators.required));
      }
      if((this.selectedValue !== 'VAN' && this.selectedValue !== 'BUS') && this.vehicleForm.contains('numOfSeats')){
        this.vehicleForm.removeControl('numOfSeats');
        this.vehicleForm.removeControl('licenseType');
      }
      if(this.selectedValue !== 'SUV' && this.vehicleForm.contains('towingCapacity')){
        this.vehicleForm.removeControl('towingCapacity');
      }
    }
  }

  private formInit() {
    let vehicleYear = undefined;
    let vehicleMake = '';
    let vehicleModel = '';
    let numOfDoors = undefined;
    let price = undefined;
    let numOfSeats = undefined;
    let status = '';
    let licenseType = '';
    let imagePath = '';
    let description = '';
    let towingCapacity =  undefined;

    if(this.editMode){
      const vehicle = this.vehicleService.getVehicleById(this.id);
      vehicleYear = vehicle.year;
      vehicleMake = vehicle.make;
      vehicleModel = vehicle.model;
      numOfDoors = vehicle.numDoors;
      status = vehicle.status;
      this.selectedValue = vehicle.VEH_TYPE;
      price = vehicle.price;
      if(this.selectedValue === 'BUS' || this.selectedValue === 'VAN'){
        numOfSeats = (<Bus>vehicle).numbOfSeats;
        licenseType = (<Bus>vehicle).licenseType;
      }else if (this.selectedValue === 'SUV'){
        towingCapacity = (<Suv>vehicle).towingCapacity;
      }
      imagePath = vehicle.imgPath;
      description = vehicle.description;
    }


    this.vehicleForm = new FormGroup({
      'year': new FormControl(vehicleYear, Validators.required),
      'make': new FormControl(vehicleMake, Validators.required),
      'model': new FormControl(vehicleModel, Validators.required),
      'numOfDoors': new FormControl(numOfDoors, Validators.required),
      'price': new FormControl(price, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'status': new FormControl(status, Validators.required)
    });
    if(this.selectedValue === 'VAN' || this.selectedValue === 'BUS'){
      this.vehicleForm.addControl('numOfSeats', new FormControl(numOfSeats, Validators.required));
      this.vehicleForm.addControl('licenseType', new FormControl(licenseType, Validators.required));
    }else if(this.selectedValue === 'SUV'){
      this.vehicleForm.addControl('towingCapacity', new FormControl(towingCapacity, Validators.required));
    }

    if(this.editMode){
      this.vehicleForm.addControl(
        'type', new FormControl({value: 'type', disabled: true}, Validators.required));
    }else{
      this.vehicleForm.addControl(
        'type', new FormControl(this.selectedValue, Validators.required));
    }
  }

  async onSubmit() {
    this.changesSaved = true;
    let vType = this.selectedValue;

    if(this.editMode){
      let sedan: SedanPost = this.vehicleService.getVehicleById(this.id);
      switch (vType) {
        case 'SEDAN':
        case 'COUPE':
        case 'HATCH':
          sedan.year = +this.vehicleForm.value['year'];
          sedan.make = this.vehicleForm.value['make'];
          sedan.model = this.vehicleForm.value['model'];
          sedan.VEH_TYPE = this.selectedValue;
          sedan.numDoors = +this.vehicleForm.value['numOfDoors'];
          sedan.status = this.vehicleForm.value['status'];
          sedan.price = this.vehicleForm.value['price'];
          sedan.imgPath = this.vehicleForm.value['imagePath'];
          sedan.description = this.vehicleForm.value['description'];
          break;
        case 'VAN':
        case 'BUS':
          sedan.licenseType = this.vehicleForm.value['licenseType'];
          sedan.numSeats = +this.vehicleForm.value['numOfSeats'];
          sedan.year = +this.vehicleForm.value['year'];
          sedan.make = this.vehicleForm.value['make'];
          sedan.model = this.vehicleForm.value['model'];
          sedan.VEH_TYPE = this.selectedValue;
          sedan.numDoors = +this.vehicleForm.value['numOfDoors'];
          sedan.status = this.vehicleForm.value['status'];
          sedan.price = this.vehicleForm.value['price'];
          sedan.imgPath = this.vehicleForm.value['imagePath'];
          sedan.description = this.vehicleForm.value['description'];
          break;
        case 'SUV':
          sedan.towingCapacity = this.vehicleForm.value['towingCapacity'];
          sedan.year = +this.vehicleForm.value['year'];
          sedan.make = this.vehicleForm.value['make'];
          sedan.model = this.vehicleForm.value['model'];
          sedan.VEH_TYPE = this.selectedValue;
          sedan.numDoors = +this.vehicleForm.value['numOfDoors'];
          sedan.status = this.vehicleForm.value['status'];
          sedan.price = this.vehicleForm.value['price'];
          sedan.imgPath = this.vehicleForm.value['imagePath'];
          sedan.description = this.vehicleForm.value['description'];
          break;
      }
      await this.http.updatePost(sedan);
    }else {
      let vehicle: SedanPost;
      switch (vType) {
        case 'SEDAN':
        case 'COUPE':
        case 'HATCH':
          vehicle = {
            year: +this.vehicleForm.value['year'],
            make: this.vehicleForm.value['make'],
            model: this.vehicleForm.value['model'],
            VEH_TYPE: this.vehicleForm.value['type'],
            numDoors: +this.vehicleForm.value['numOfDoors'],
            status: this.vehicleForm.value['status'],
            price: this.vehicleForm.value['price'],
            imgPath: this.vehicleForm.value['imagePath'],
            description: this.vehicleForm.value['description']
          };
          break;
        case 'VAN':
        case 'BUS':
          (<BusAndVanPost> vehicle) = {
            licenseType: this.vehicleForm.value['licenseType'],
            numSeats: +this.vehicleForm.value['numOfSeats'],
            year: +this.vehicleForm.value['year'],
            make: this.vehicleForm.value['make'],
            model: this.vehicleForm.value['model'],
            VEH_TYPE: this.vehicleForm.value['type'],
            numDoors: +this.vehicleForm.value['numOfDoors'],
            status: this.vehicleForm.value['status'],
            price: this.vehicleForm.value['price'],
            imgPath: this.vehicleForm.value['imagePath'],
            description: this.vehicleForm.value['description']
          };
          break;
        case 'SUV':
          (<SuvPosts> vehicle) = {
            towingCapacity: this.vehicleForm.value['towingCapacity'],
            year: +this.vehicleForm.value['year'],
            make: this.vehicleForm.value['make'],
            model: this.vehicleForm.value['model'],
            VEH_TYPE: this.vehicleForm.value['type'],
            numDoors: +this.vehicleForm.value['numOfDoors'],
            status: this.vehicleForm.value['status'],
            price: this.vehicleForm.value['price'],
            imgPath: this.vehicleForm.value['imagePath'],
            description: this.vehicleForm.value['description']
          };
          break;
      }
      console.log(vehicle);
      await this.http.createPost(vehicle);
    }
    this.vehicleService.getVehiclesRest();
    await this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route});
  }

  canDeactivate():Observable<boolean> | Promise<boolean> | boolean {
    if((this.vehicleForm.get('year').dirty
      || this.vehicleForm.get('make').dirty
      || this.vehicleForm.get('model').dirty
      || this.vehicleForm.get('numOfDoors').dirty
      || this.vehicleForm.get('status').dirty
      || this.vehicleForm.get('price').dirty
      || this.vehicleForm.get('imagePath').dirty
      || this.vehicleForm.get('description').dirty)
      && !this.changesSaved){
      return confirm("Your changes will be discarded. Continue?");
    }
    if(this.vehicleForm.get('type').value === 'VAN' || this.vehicleForm.get('type').value === 'BUS'){
      if((this.vehicleForm.get('licenseType').dirty
        || this.vehicleForm.get('numOfSeats').dirty)
        && !this.changesSaved){
        return confirm("Your changes will be discarded. Continue?");
      }
    }else if(this.vehicleForm.get('type').value === "SUV"){
      if(this.vehicleForm.get('towingCapacity').dirty
        && !this.changesSaved){
        return confirm("Your changes will be discarded. Continue?");
      }
    }
    return true;
  }
}
