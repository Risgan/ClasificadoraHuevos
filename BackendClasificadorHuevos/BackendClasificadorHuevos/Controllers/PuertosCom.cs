using BackendClasificadorHuevos.Models;
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
        private string _latestData = string.Empty;

        private readonly DataRegistry _dataRegistry;


        public PuertosCom(ISerialPortService serialPortService, DataRegistry dataRegistry)
        {
            _serialPortService = serialPortService;
            _serialPortService.DataReceived += OnDataReceived;
            _dataRegistry = dataRegistry;
        }

        private void OnDataReceived(string data)
        {
            if (!string.IsNullOrEmpty(data))
            {
                _dataRegistry.LatestData = data; // Almacenar el último dato recibido                
            }
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
            //return Ok(_serialPortService.ReadData());

            //return Ok(!string.IsNullOrEmpty(_latestData) ? _latestData : "No data received yet.");
            return Ok(new { data = !string.IsNullOrEmpty(_dataRegistry.LatestData) ? _dataRegistry.LatestData : "0" });

        }

        [HttpPost("write")]
        public ActionResult Write([FromBody] PuertosComModel data)
        {
            _serialPortService.WriteData(data.mensaje);
            return Ok();
        }

        [HttpGet("close")]
        public ActionResult Close()
        {            
            return Ok(_serialPortService.Close());
        }

        [HttpGet("connect/{portName}")]
        public ActionResult<string> ConnectToPort(string portName)
        {
            try
            {
                _serialPortService.Close();
                return Ok(_serialPortService.Connect(portName));
            }
            catch (Exception ex)
            {
                return BadRequest($"Error connecting to {portName}: {ex.Message}");
            }
        }
    }
}