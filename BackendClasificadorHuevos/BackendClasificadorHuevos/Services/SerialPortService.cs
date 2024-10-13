using System.IO.Ports;

namespace BackendClasificadorHuevos.Services
{
    public class SerialPortService : ISerialPortService
    {
        private SerialPort _serialPort;

        public event Action<string> DataReceived;

        public SerialPortService() { } // Constructor vacío

        public bool Connect(string portName)
        {
            try
            {
                _serialPort = new SerialPort(portName)
                {
                    BaudRate = 9600,
                    Parity = Parity.None,
                    StopBits = StopBits.One,
                    DataBits = 8,
                    Handshake = Handshake.None
                };
                _serialPort.DataReceived += SerialPort_DataReceived;
                _serialPort.Open();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            
        }

        private void SerialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            try
            {
                //if (_serialPort != null && _serialPort.IsOpen)
                //{
                    // Leer los datos disponibles en el buffer
                    string data = _serialPort.ReadExisting().ToString();

                    // Disparar el evento DataReceived y pasar los datos leídos
                    DataReceived?.Invoke(data);
                //}
            }
            catch (Exception ex)
            {
                // Manejo de errores (si es necesario)
                Console.WriteLine($"Error al leer los datos: {ex.Message}");
            }
        }

        public bool Close()
        {
            if (_serialPort != null && _serialPort.IsOpen)
            {
                _serialPort.Close();
                return true;
            }
            return false;
        }

        public string ReadData()
        {
            if (_serialPort != null && _serialPort.IsOpen)
            {
                return _serialPort.ReadLine();
            }
            return string.Empty;
        }

        public void WriteData(string data)
        {
            if (_serialPort != null && _serialPort.IsOpen)
            {
                _serialPort.WriteLine(data);
            }
        }

        public bool IsOpen => _serialPort?.IsOpen ?? false; // Propiedad para saber si está abierto
    }
}