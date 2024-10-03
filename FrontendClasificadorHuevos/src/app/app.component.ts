import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { TerminalModule, TerminalService } from 'primeng/terminal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputTextModule, TerminalModule, ChartModule, TableModule, SplitterModule, ButtonModule, DropdownModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TerminalService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  cities: any[] | undefined;

  selectedCity: any | undefined;

  value: string | undefined;

  products!: any[];

  data: any;

  options: any;


  // @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  // @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  // videoDevices: MediaDeviceInfo[] = [];
  // selectedCameraId: string | undefined;
  // imageSrc: string | null = null;

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];



    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
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
    // this.getVideoDevices();
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