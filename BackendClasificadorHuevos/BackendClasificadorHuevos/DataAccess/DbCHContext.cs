using BackendClasificadorHuevos.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendClasificadorHuevos.DataAccess
{
    public class DbCHContext : DbContext
    {
        public DbCHContext(DbContextOptions<DbCHContext> options) : base(options)
        {

        }

        public DbSet<HuevosModel> Huevos { get; set; }

    }
}
