using System.Collections.Generic;

namespace StickIt.Model
{
    public class StickSheet : ModelBase
    {
        public int StickSheetId { get; set; }
        public int StickBookId { get; set; }

        public string Title { get; set; }

        public virtual StickBook StickBook { get; set; }
        public virtual List<StickSheetItem> StickSheetItems { get; set; }
    }
}
