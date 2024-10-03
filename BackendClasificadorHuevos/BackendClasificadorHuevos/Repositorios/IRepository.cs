namespace BackendClasificadorHuevos.Repositorios
{
    public interface IRepository<T> where T : class
    {
        Task<bool> Exist(int id);
        Task<IEnumerable<T>> GetAll();
        Task<T> Get(int id);
        Task<bool> Delete(int id);
        Task<bool> Update(int id, T element);
        Task<bool> Add(T element);
    }
}
