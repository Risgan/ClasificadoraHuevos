using BackendClasificadorHuevos.Dto;
using BackendClasificadorHuevos.Mapper;
using BackendClasificadorHuevos.Models;
using BackendClasificadorHuevos.Repositorios;

namespace BackendClasificadorHuevos.Services
{
    public class HuevosServices : IHuevosServices
    {
        private readonly IHuevosRepository _huevosRepository;

        public HuevosServices(IHuevosRepository huevosRepository)
        {
            _huevosRepository = huevosRepository;
        }

        public async Task<bool> Create(HuevosDto huevosModel)
        {
            return await _huevosRepository.Add(HuevosMapper.MapResponse(huevosModel));
        }

        public async Task<bool> Delete(int id)
        {
            return await _huevosRepository.Delete(id);
        }

        public async Task<IEnumerable<HuevosDto>> GetAll()
        {
            var response = await _huevosRepository.GetAll();
            return HuevosMapper.MapResponse(response);
        }

        public async Task<HuevosDto> GetById(int id)
        {
            return HuevosMapper.MapResponse(await _huevosRepository.Get(id));
        }

        public async Task<bool> Update(int id, HuevosDto huevosModel)
        {
            return await _huevosRepository.Update(id, HuevosMapper.MapResponse(huevosModel));
        }
    }
}
