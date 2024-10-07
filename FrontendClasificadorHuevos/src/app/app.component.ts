import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { TerminalModule, TerminalService } from 'primeng/terminal';
import { MeterGroupModule } from 'primeng/metergroup';

const module = [
  MeterGroupModule,
  InputTextModule,
  TerminalModule,
  ChartModule,
  TableModule,
  SplitterModule,
  ButtonModule,
  DropdownModule,
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, module],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TerminalService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  clasification: string = ''
  selectChart: number = 1;
  type: any = 'bar';


  // para eliminar o cambiar
  cities: any[] | undefined;
  selectedCity: any | undefined;
  value: string | undefined;
  products!: any[];
  data: any;
  options: any;
  basicData: any;
  basicOptions: any;


  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  stream!: MediaStream;
  isBrowser: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';
    if (this.isBrowser) {
      // this.startCamera();
      this.basicChart();

    }

  }

  startCamera(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.stream = stream;
          this.videoElement.nativeElement.srcObject = stream;
          this.videoElement.nativeElement.play();
        })
        .catch(error => {
          console.error('Error accessing camera:', error);
        });
    }
  }
  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }

  basicChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }


  changeChart(event: any){
    // this.selectChart = event;
console.log(event, this.type);

    switch (event) {
      case 1:
        this.type = 'bar';
        break;
      case 2:
        this.type = 'line';
        break;
      case 3:
        this.basicChart();
        break;
      case 4:
        this.basicChart();
        break;
      case 5:
        this.basicChart();
        break;
      default:
        break;
    }
    this.basicChart();
    
    this.cdr.detectChanges();


  }

  // async getVideoDevices() {
  //   const devices = await navigator.mediaDevices.enumerateDevices();
  //   this.videoDevices = devices.filter(device => device.kind === 'videoinput');
  // }

  // async startCamera() {
  //   if (this.selectedCameraId) {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: this.selectedCameraId } });
  //     this.videoElement.nativeElement.srcObject = stream;
  //   } else {
  //     console.error('No camera selected!');
  //   }
  // }

  // takePicture() {
  //   const canvas = this.canvasElement.nativeElement;
  //   const video = this.videoElement.nativeElement;

  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;

  //   const ctx = canvas.getContext('2d');
  //   ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
  //   this.imageSrc = canvas.toDataURL('image/png');
  // }
}