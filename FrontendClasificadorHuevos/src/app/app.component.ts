import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { Terminal, TerminalModule, TerminalService } from 'primeng/terminal';
import { MeterGroupModule } from 'primeng/metergroup';
import { StepperModule } from 'primeng/stepper';
import { DataService } from './data.service';
import { Clasificador } from './clasificador';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { EditorModule } from 'primeng/editor';

const module = [
  MeterGroupModule,
  EditorModule,
  InputTextModule,
  TerminalModule,
  ChartModule,
  TableModule,
  SplitterModule,
  ButtonModule,
  DropdownModule,
  TooltipModule,
  ConfirmDialogModule,
  DialogModule,
  ToastModule,
  StepperModule,
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, module],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TerminalService, MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  clasification: string = ''
  selectChart: number = 1;
  type: any = 'bar';
  dataColumn: any;
  dataLine: any;
  optionsColumn: any;
  optionsLine: any;

  dataTable: Clasificador[] = [];
  index = 0;
  ciclos = 0;
  cantidadCiclos = 0;


  selectCamara: any;
  selectUsb: any;
  usbDevices: any;
  camaraDevices: any;

  visible: boolean = false;

  cameras: MediaDeviceInfo[] = [];


  checkStart: boolean = false;
  checkReset: boolean = false;
  checkStop: boolean = false;
  checkPause: boolean = false;
  checkCamara: boolean = true;
  checkSettings: boolean = false;

  valorLimpio: number = 0;
  valorSucio: number = 0;
  valorResultado: string = 'N/A';

  text: string = "Consola de comandos";


  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement', { static: true }) canvasElement?: ElementRef<HTMLCanvasElement>;
  // @ViewChild('terminal') terminal!: Terminal;
  @ViewChild('editor') editor!: ElementRef;

  stream!: MediaStream;
  isBrowser: boolean = false;

  subscription!: Subscription;

  // private commandSubject = new Subject<string>();

  constructor(
    private cdr: ChangeDetectorRef,
    public dataService: DataService,
    private terminalService: TerminalService,
    private messageService: MessageService
  ) {
    // this.terminalService.sendResponse("response");

    // this.subscription = this.terminalService.commandHandler.subscribe((command) => {
    //   let response = command === 'date' ? new Date().toDateString() : 'Unknown command: ' + command;
    //   this.terminalService.sendResponse(response);
    // });

    // this.commandSubject.subscribe((command) => {
    //   this.terminalService.sendResponse(command);
    // });

  }

  ngOnInit() {

    this.dataService.closePuertosCom().subscribe((data: string) => {});

    this.isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';
    if (this.isBrowser) {
      // this.startCamera();
      // this.listCameras();
      // this.listPuertosCom();
      this.columnsChart();
      this.lineChart();


    }

  }

  listCameras(): void {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        // this.cameras = devices.filter(device => device.kind === 'videoinput');

        this.camaraDevices = devices.filter(device => device.kind === 'videoinput').map(device => ({
          label: device.label,
          value: device.deviceId
        }));
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontraron camaras disponibles' });
        console.error('Error listing cameras:', error);
      });

  }


  startCamera(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: { deviceId: this.selectCamara.value ? { exact: this.selectCamara.value } : undefined }
      })
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


  listPuertosCom() {
    this.usbDevices = [];
    this.dataService.getPuertosComList().subscribe((data: string[]) => {
      if (data.length === 0) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontraron puertos COM disponibles' });

      }
      else {
        this.usbDevices = data.map((item) => {
          console.log(item);

          return { label: item, value: item }

        });
      }
    });
  }

  columnsChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    const dataFromService = this.dataService.readAll();

    const conteo = dataFromService.reduce((acc: any, item) => {
      acc[item.categoria] = (acc[item.categoria] || 0) + 1;
      return acc;
    }, {});

    this.dataColumn = {
      labels: ['A', 'AA', 'Sucio'],
      datasets: [
        {
          label: 'Conteo',
          data: [conteo['A'] || 0, conteo['AA'] || 0, conteo['Sucio'] || 0],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)'],
          borderWidth: 1
        }
      ]
    };

    this.optionsColumn = {
      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor,
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            stepSize: 1
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

  lineChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    const labels = Array.from({ length: this.index + 1 }, (_, i) => i); console.log('Labels:', labels);

    const categories = ['A', 'AA', 'Sucio']; // Aquí defines las categorías que quieres graficar
    const chartData: { [key: string]: number[] } = {};

    // Inicializa el objeto con arrays vacíos
    categories.forEach(category => {
      chartData[category] = [];
    });

    let counts: { [key: string]: number } = {};

    this.dataService.readAll().forEach((item, index) => {
      const currentCategory = item.categoria;

      // Aumenta el conteo para la categoría actual
      counts[currentCategory] = (counts[currentCategory] || 0) + 1;

      // Asegúrate de que todos los arrays tengan el mismo tamaño
      for (let category of categories) {
        if (category === currentCategory) {
          chartData[category][index] = counts[category]; // Asigna el conteo actual
        } else {
          chartData[category][index] = counts[category] || 0; // Asigna 0 si no hay conteo
        }
      }
    });



    this.dataLine = {
      // labels: [1, 2, 3, 4, 5, 6, 7],
      labels: labels,
      datasets: [
        {
          label: 'A',
          data: chartData['A'],
          fill: true,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          backgroundColor: 'rgba(174,205,255,0.2)'

        },
        {
          label: 'AA',
          data: chartData['AA'],
          fill: true,
          // borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--teal-500'),
          backgroundColor: 'rgba(154,255,244,0.2)'

        },
        {
          label: 'Sucio',
          data: chartData['Sucio'],
          fill: true,
          borderColor: documentStyle.getPropertyValue('--orange-500'),
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };

    this.optionsLine = {
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
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };

  }

  changeChart(event: any) {

    this.selectChart = event
    this.cdr.detectChanges();
    this.columnsChart();
    this.lineChart();


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

  test() {

    this.dataService.create({ categoria: 'A', limpio: 1, sucio: 3 });
    this.dataService.create({ categoria: 'AA', limpio: 1, sucio: 3 });
    this.dataService.create({ categoria: 'Sucio', limpio: 1, sucio: 3 });
    this.dataService.create({ categoria: 'Sucio', limpio: 1, sucio: 3 });


    console.log(this.dataService.readAll(), this.dataService.getIndex());

    this.index = this.dataService.getIndex();

    this.cdr.detectChanges();

    this.columnsChart();
    this.lineChart();
  }

  start() {
    this.checkStart = true;
  }

  pause() {

  }

  stop() {
    this.checkStart = false;
    // this.checkReset = true;
    // this.checkStop = true;
    // this.checkPause = true;
  }

  reset() {

  }

  camara() {
    const canvas = this.canvasElement!.nativeElement;
    const video = this.videoElement.nativeElement;
    // Establecer el tamaño del canvas igual al del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      this.writeTerminal('Captura imagen...');
      // Dibujar el fotograma actual del video en el canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Obtener la imagen en formato base64
      const imageDataURL = canvas.toDataURL('image/png');

      // Remover el prefijo "data:image/png;base64,"
      const base64Image = imageDataURL.split(',')[1];
      console.log(base64Image);

      // Enviar la imagen base64 al backend
      this.writeTerminal('Analisando imagen');
      this.dataService.postImage(base64Image).subscribe((data: any) => {
        console.log('Respuesta del backend:', data);
        this.valorLimpio = data.limpio;
        this.valorSucio = data.sucio;
        this.valorResultado = data.resultado;
        this.writeTerminal("Analisis finalizado");
        // this.clasification = data.resultado;
        // this.dataService.create({ categoria: data.resultado, limpio: data.limpio, sucio: data.sucio });
        // this.index = this.dataService.getIndex();
        // this.columnsChart();
        // this.lineChart();
        // this.cdr.detectChanges();
      });
    }
  }

  ajustes() {
    this.listCameras();
    this.listPuertosCom();
    this.visible = true;
  }


  onCameraChange(event: any): void {
    debugger
    this.selectCamara = event.target.value;
    this.stopCamera();
    this.startCamera();
  }

  showDialog() {
    console.log('showDialog');

    this.visible = true;
  }

  selectSettings() {
    console.log('selectSettings');
    console.log(this.selectCamara, this.selectUsb);
    if (this.selectCamara && this.selectUsb) {
      this.checkSettings = true;
      this.startCamera();
    }
    else {
      this.checkSettings = false;
    }
    this.visible = false
  }

  disabledStart() {
    if (!this.checkStart && this.checkSettings) {
      return false
    }
    return true;
  }

  disabledPause() {
    if (this.checkStart && this.checkSettings) {
      return false
    }
    return true;
  }

  disabledStop() {
    if (this.checkStart && this.checkSettings) {
      return false
    }
    return true;
  }

  disabledReset() {
    if (!this.checkStart && this.checkSettings) {
      return false
    }
    return true;
  }

  disabledCamara() {
    if (!this.checkStart && this.checkSettings) {
      return false
    }
    // else if (this.checkSettings) {
    //   return false
    // } 
    return true;
  }

  disabledSetting() {
    if (!this.checkStart && !this.checkSettings) {
      return false
    }
    else if (!this.checkStart) {
      return false
    }
    return true;
  }

  async writeTerminal(comando: any) {
    
    // this.text += comando.map((line:string) => `<p>>${line}</p>`).join('')+ '<br/>';
    // this.text += comando.map((line:string) => `<p>>${line}</p>`).join('')+ '<br/>'; 
    this.text += `<p>>${comando}</p>`; 
  }
  
  // sendLines() {
  //   // Envía las líneas de código
  //   const lines = ['Code001', 'Code002asdfadfasdfadfasdf'];
  //   // this.text += lines.join('<br/>'); // Agrega las líneas al contenido del editor
  //   this.text += lines.map(line => `<p>>${line}</p>`).join('')+ '<br/>'; // Usa <p> para cada línea
    
  // }


}


