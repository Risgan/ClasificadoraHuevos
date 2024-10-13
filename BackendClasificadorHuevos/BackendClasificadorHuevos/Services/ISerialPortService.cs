namespace BackendClasificadorHuevos.Services
{
    public interface ISerialPortService
    {
        event Action<string> DataReceived;

        bool Connect(string portName); // Método para conectar a un puerto
        bool Close(); // Método para cerrar el puerto
        string ReadData(); // Método para leer datos del puerto
        void WriteData(string data); // Método para escribir datos al puerto
        bool IsOpen { get; } // Propiedad para verificar si el puerto está abierto
    }
}
