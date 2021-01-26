namespace Sharebook.Services.Mapping
{
    public static class Mapper
    {
        public static TResult MapTo<TResult>(this object source)
            where TResult : class
        {
            return AutoMapper.Mapper.Map<TResult>(source);
        }
    }
}
