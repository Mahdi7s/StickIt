namespace StickIt.Model
{
    public class ModelBase
    {
        public int Order { get; set; }
        public virtual StickyStyle StickyStyle { get; set; }
    }
}