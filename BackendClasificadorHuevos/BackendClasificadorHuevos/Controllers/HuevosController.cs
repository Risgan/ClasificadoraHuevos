using BackendClasificadorHuevos.Dto;
using BackendClasificadorHuevos.Models;
using BackendClasificadorHuevos.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System;

namespace BackendClasificadorHuevos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HuevosController : Controller
    {
        private readonly IHuevosServices huevosServices;

        public HuevosController(IHuevosServices _huevosServices)
        {
            huevosServices = _huevosServices;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            return  Ok(await huevosServices.GetAll());
        }

        [HttpGet("lastId")]
        public async Task<ActionResult> GetLastId()
        {
            var response = await huevosServices.GetAll();
            if (response.Count() > 0)
            {
                return Ok(response.OrderByDescending(x => x.id).FirstOrDefault().id);
            }
            else
            {
                return Ok(0);
            }
        }

        [HttpGet("id")]
        public async Task<ActionResult> GetByIdAsync(int id)
        {
            return Ok(await huevosServices.GetById(id));
        }

        [HttpPost]
        public ActionResult Create([FromBody] HuevosDto data)
        {
            try
            {
                return Ok(huevosServices.Create(data));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("id")]
        public ActionResult Edit(int id, [FromBody] HuevosDto data)
        {
            return Ok(huevosServices.Update(id, data));

        }


        [HttpDelete("id")]
        public ActionResult Delete(int id)
        {
            return Ok(huevosServices.Delete(id));

        }

        [HttpPost("predict")]
        public async Task<ActionResult> predictResult([FromBody] SendBase64 data)
        {

            byte[] imageBytes = Convert.FromBase64String(data.base64);

            //var imageRead = File.ReadAllBytes(@"C:\Users\johnr\Downloads\istockphoto-1365194623-612x612.jpg");
            MLModel.ModelInput modelInput = new MLModel.ModelInput()
            {
                ImageSource = imageBytes,
            };

            var result = MLModel.Predict(modelInput);
            //return Ok(result);
            return Ok(new
            {             
                resultado = result.PredictedLabel,
                limpio = result.Score[1],
                sucio = result.Score[0]
            });
        }

    }
}
