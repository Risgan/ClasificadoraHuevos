using BackendClasificadorHuevos.Dto;
using BackendClasificadorHuevos.Models;

namespace BackendClasificadorHuevos.Services
{
    public interface IHuevosServices
    {
        Task<IEnumerable<HuevosDto>> GetAll();
        Task<HuevosDto> GetById(int id);
        Task<bool> Create(HuevosDto rol);
        Task<bool> Update(int id, HuevosDto rol);
        Task<bool> Delete(int id);
    }
}
