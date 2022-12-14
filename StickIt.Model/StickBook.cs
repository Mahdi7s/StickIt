using System.Collections.Generic;

namespace StickIt.Model
{
    public class StickBook : ModelBase
    {
        public int StickBookId { get; set; }
        public int PlaceId { get; set; }

        public string Title { get; set; }

        public virtual Place Place { get; set; }
        public virtual List<StickSheet> StickSheets { get; set; }
    }
}
