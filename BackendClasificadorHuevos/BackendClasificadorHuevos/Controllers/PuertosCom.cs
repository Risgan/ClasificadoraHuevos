using BackendClasificadorHuevos.Services;
using Microsoft.AspNetCore.Mvc;
using System.IO.Ports;


namespace BackendClasificadorHuevos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PuertosCom : ControllerBase
    {
        private readonly ISerialPortService _serialPortService;

        public PuertosCom(ISerialPortService serialPortService)
        {
            _serialPortService = serialPortService;
        }

        [HttpGet("list")]
        public ActionResult<string[]> ListAvailablePorts()
        {
            string[] ports = SerialPort.GetPortNames();
            return Ok(ports); // Retorna la lista de puertos
        }

        [HttpGet("read")]
        public ActionResult<string> Read()
        {
            return _serialPortService.ReadData();
        }

        [HttpPost("write")]
        public ActionResult Write([FromBody] string data)
        {
            _serialPortService.WriteData(data);
            return Ok();
        }

        [HttpPost("close")]
        public ActionResult Close()
        {
            _serialPortService.Close();
            return Ok();
        }

        [HttpPost("connect")]
        public ActionResult<string> ConnectToPort([FromBody] string portName)
        {
            try
            {
                _serialPortService.Connect(portName); // Conéctate al puerto seleccionado
                return Ok($"Connected to {portName}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error connecting to {portName}: {ex.Message}");
            }
        }
    }
}