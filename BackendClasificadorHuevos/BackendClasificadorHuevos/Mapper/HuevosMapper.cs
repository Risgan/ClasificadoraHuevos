using BackendClasificadorHuevos.Dto;
using BackendClasificadorHuevos.Models;

namespace BackendClasificadorHuevos.Mapper
{
    public class HuevosMapper
    {
        public static HuevosModel MapResponse(HuevosDto dto)
        {
            return new HuevosModel()
            {
                id = dto.id,
                sucio = dto.sucio,
                limpio = dto.limpio,
                clasificado = dto.clasificado,
                peso = dto.peso,
                imagen = dto.imagen,
            };
        }

        public static HuevosDto MapResponse(HuevosModel dto)
        {
            return new HuevosDto()
            {
                id = dto.id,
                sucio = dto.sucio,
                limpio = dto.limpio,
                clasificado = dto.clasificado,
                peso = dto.peso,
                imagen = dto.imagen,
            };
        }


        internal static IEnumerable<HuevosDto> MapResponse(IEnumerable<HuevosModel> enumerable)
        {
            IEnumerable<HuevosDto> response = enumerable.Select(MapResponse);
            return response;
        }

        internal static IEnumerable<HuevosModel> MapResponse(IEnumerable<HuevosDto> enumerable)
        {
            IEnumerable<HuevosModel> response = enumerable.Select(MapResponse);
            return response;
        }
    }
}
