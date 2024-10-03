using System.IO.Ports;

namespace BackendClasificadorHuevos.Services
{
    public class SerialPortService : ISerialPortService
    {
        private SerialPort _serialPort;

        public SerialPortService() { } // Constructor vacío

        public void Connect(string portName)
        {
            _serialPort = new SerialPort(portName)
            {
                BaudRate = 9600,
                Parity = Parity.None,
                StopBits = StopBits.One,
                DataBits = 8,
                Handshake = Handshake.None
            };
            _serialPort.Open();
        }

        public void Close()
        {
            if (_serialPort != null && _serialPort.IsOpen)
            {
                _serialPort.Close();
            }
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