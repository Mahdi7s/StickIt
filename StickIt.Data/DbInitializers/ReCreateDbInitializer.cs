using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StickIt.Data.DbInitializers
{
    public sealed class ReCreateDbInitializer : DropCreateDatabaseIfModelChanges<StickItDbContext>
    {
        protected override void Seed(StickItDbContext context)
        {
            InitializerHelper.Seed(context);
        }
    }
}
