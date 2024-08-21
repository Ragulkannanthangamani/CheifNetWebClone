import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Devicesservice } from './devices.service';
import { Toast } from 'bootstrap';
import { Observable, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './AppStatus/app.status';
import { ActivatedRoute } from '@angular/router';
import { selectPagination } from './store/pageNum/selectors/page.selectors';
import { setPagination } from './store/pageNum/actions/page.action';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent implements OnInit, OnDestroy {
  issidebarvisible = true;
  devices: any[] = [];
  errorMessage: string | null = null;
  isLoading = true;
  selectedDeviceId: string = '';
  buttondisable: boolean = false;
  currentPage: number = 1;
  perPage = 10;
  pagination: any = {};
  private paginationSubscription: Subscription;

  constructor(private router: Router, private deviceservice: Devicesservice, private store: Store<AppState>, private route: ActivatedRoute) {
    this.paginationSubscription =  this.store.select(selectPagination).subscribe((data) => this.pagination = data);
    console.log(this.pagination);

  }
  ngOnInit(): void {
    this.fetchdata(this.pagination.current_page);
  }

  ngOnDestroy(): void {
    if (this.paginationSubscription) {
      this.paginationSubscription.unsubscribe();
    }
  }
   
  

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  toggleSidebar() {
    this.issidebarvisible = !this.issidebarvisible;
  }

  fetchdata(page: number): void {
    console.log('fetching device list');

    this.deviceservice.getdevice(page, this.perPage).subscribe({
      next: Response => {
        // console.log('devices retrived', Response);
        // console.log('device pagination', Response.pagination);

        this.devices = Response.devices
        // this.pagination = Response.pagination;
        this.currentPage = page;
        this.isLoading = false;
        const devicejson = JSON.stringify(Response.devices);
        this.deviceservice.savelocalstorage(devicejson);
        this.store.dispatch(setPagination({ pagination: Response.pagination }));
      },
      error: err => {
        console.error('Error fetching data', err);
        this.errorMessage = 'Error fetching data. Please try again later.';
        this.isLoading = false;
      }
    })
  }

  //  goToPage(page: number): void {
  //   if (page >= 1 && page <= this.pagination.total_pages) {
  //     this.fetchdata(page);
  //   }
  // }

  nextPage(): void {
    this.fetchdata(this.pagination.next_page);

  }


  prevPage(): void {
    this.fetchdata(this.pagination.prev_page)
  }
  selectDevice(id: string) {
    this.selectedDeviceId = id;
    this.buttondisable = true;
  }
  editdevice() {
    this.router.navigate(['/Editdevice', this.selectedDeviceId]);
  }

  adddevice() {
    this.router.navigate(['/AddDevices']);
  }

  Delectdevice() {
    this.deviceservice.Delectdevice(this.selectedDeviceId).subscribe({
      next: Response => {
        console.log('Organization deleted successfully', Response);
        this.showdeleteToast();
        this.fetchdata(this.currentPage);
      },
      error: err => {
        console.error('Error deleting organization', err);
        this.showdeleteErrToast();
      }
    })
  }
  showdeleteToast() {
    const toastElement = document.getElementById('deleteToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    } else {
      console.error('Toast element not found');
    }
  }
  showdeleteErrToast() {
    const toastElement = document.getElementById('deleteErrToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    } else {
      console.error('Toast element not found');
    }
  }
}
