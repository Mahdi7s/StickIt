using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StickIt.Model;

namespace StickIt.Data
{
    public sealed class StickItDbContext : DbContext
    {
        public DbSet<Place> Places { get; set; }
        public DbSet<StickBook> StickBooks { get; set; }
        public DbSet<StickSheet> StickSheets { get; set; }
        public DbSet<StickSheetItem> StickSheetItems { get; set; }
        public DbSet<StickyStyle> StickyStyles { get; set; }
    }
}
