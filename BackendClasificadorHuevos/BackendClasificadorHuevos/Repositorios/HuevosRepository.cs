using BackendClasificadorHuevos.DataAccess;
using BackendClasificadorHuevos.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendClasificadorHuevos.Repositorios
{
    public class HuevosRepository : GenericRepository<HuevosModel>, IHuevosRepository
    {
        private readonly DbCHContext _context;

        public HuevosRepository(DbCHContext context) : base(context)
        {
            _context = context;
        }
    }
}
