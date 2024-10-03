using Microsoft.EntityFrameworkCore;

namespace BackendClasificadorHuevos.Repositorios
{
    public class GenericRepository<TEntity> where TEntity : class
    {
        protected readonly DbContext _context;

        public GenericRepository(DbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<bool> Add(TEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            await _context.Set<TEntity>().AddAsync(entity);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Delete(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(id), "El ID debe ser un número positivo");
            }

            var entidad = await _context.Set<TEntity>().FindAsync(id);
            if (entidad != null)
            {
                _context.Set<TEntity>().Remove(entidad);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public virtual async Task<bool> Exist(int id)
        {
            return await _context.Set<TEntity>().FindAsync(id) != null;
        }

        public virtual async Task<TEntity> Get(int id)
        {
            try
            {
                return await _context.Set<TEntity>().FindAsync(id);

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public virtual async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public async Task<bool> Update(int id, TEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            if (id <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(id), "El ID debe ser un número positivo");
            }

            var existingEntity = await _context.Set<TEntity>().FindAsync(id);
            if (existingEntity == null)
            {
                return false;
            }

            _context.Entry(existingEntity).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}