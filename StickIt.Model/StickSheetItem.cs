namespace StickIt.Model
{
    public class StickSheetItem : ModelBase
    {
        public int StickSheetItemId { get; set; }
        public int StickSheetId { get; set; }

        public string Text { get; set; }

        //public virtual StickSheet StickSheet { get; set; }
    }
}
