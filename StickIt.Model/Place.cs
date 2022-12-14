using System.Collections.Generic;

namespace StickIt.Model
{
    public class Place : ModelBase
    {
        //public int A { get; set; }
        public int PlaceId { get; set; }

        public string Name { get; set; }

        public virtual List<StickBook> StickBooks { get; set; }
    }
}