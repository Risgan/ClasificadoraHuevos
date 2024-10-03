using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendClasificadorHuevos.Models
{
    [Table("huevos")]
    public class HuevosModel
    {
        [Key]
        public int id { get; set; }
        public string? sucio { get; set; }
        public string? limpio { get; set; }
        public string? peso { get; set; }
        public string? clasificado { get; set; }
        public string? imagen { get; set; }
    }
}
