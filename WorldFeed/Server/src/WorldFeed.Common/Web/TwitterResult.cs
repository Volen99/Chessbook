namespace WorldFeed.Common.Web
{
    using System;

    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Public.Models.Interfaces;

    public interface ITwitterResultFactory
    {
        ITwitterResult Create(ITwitterRequest request, ITwitterResponse response);

        ITwitterResult<TDTO> Create<TDTO>(ITwitterRequest request, ITwitterResponse response)
            where TDTO : class;

        ITwitterResult<TDTO, TModel> Create<TDTO, TModel>(ITwitterRequest request, ITwitterResponse response, Func<TDTO, TModel> convert)
            where TDTO : class;

        ITwitterResult<TDTO, TModel> Create<TDTO, TModel>(ITwitterResult<TDTO> result, Func<TDTO, TModel> convert)
            where TDTO : class;
    }

    public class TwitterResultFactory : ITwitterResultFactory
    {
        private readonly IJsonObjectConverter jsonObjectConverter;

        public TwitterResultFactory(IJsonObjectConverter jsonObjectConverter)
        {
            this.jsonObjectConverter = jsonObjectConverter;
        }

        public ITwitterResult Create(ITwitterRequest request, ITwitterResponse response)
        {
            return new TwitterResult
            {
                Response = response,
                Request = request
            };
        }

        public ITwitterResult<T> Create<T>(ITwitterRequest request, ITwitterResponse response)
            where T : class
        {
            return new TwitterResult<T>(this.jsonObjectConverter)
            {
                Response = response,
                Request = request
            };
        }

        public ITwitterResult<TDTO, TModel> Create<TDTO, TModel>(ITwitterRequest request, ITwitterResponse response, Func<TDTO, TModel> convert)
            where TDTO : class
        {
            return new TwitterResult<TDTO, TModel>(this.jsonObjectConverter, convert)
            {
                Response = response,
                Request = request
            };
        }

        public ITwitterResult<TDTO, TModel> Create<TDTO, TModel>(ITwitterResult<TDTO> result, Func<TDTO, TModel> convert)
            where TDTO : class
        {
            return Create(result.Request, result.Response, convert);
        }
    }

    public interface ITwitterResult
    {
        ITwitterResponse Response { get; set; }

        ITwitterRequest Request { get; set; }

        string Content { get; }
    }

    public interface ITwitterResult<out TModel> : ITwitterResult
    {
        TModel Model { get; }
    }

    public interface ITwitterResult<out TDTO, out TModel> : ITwitterResult<TDTO>
    {
        TModel Result { get; }
    }

    public class TwitterResult : ITwitterResult
    {
        public ITwitterResponse Response { get; set; }

        public ITwitterRequest Request { get; set; }

        public string Content => Response?.Content;
    }

    public class TwitterResult<TDTO> : TwitterResult, ITwitterResult<TDTO>
    {
        private readonly IJsonObjectConverter jsonObjectConverter;

        private bool initialized;
        private TDTO result;

        public TwitterResult()
        {
        }

        public TwitterResult(IJsonObjectConverter jsonObjectConverter)
        {
            this.jsonObjectConverter = jsonObjectConverter;
        }

        public TDTO Model
        {
            get
            {
                if (this.initialized == false)
                {
                    this.initialized = true;

                    var json = Response?.Content;
                    var converters = Request.ExecutionContext.Converters;

                    this.result = this.jsonObjectConverter.Deserialize<TDTO>(json, converters);
                }

                return this.result;
            }
            set
            {
                this.initialized = true;
                this.result = value;
            }
        }
    }

    public class TwitterResult<TDTO, TModel> : TwitterResult<TDTO>, ITwitterResult<TDTO, TModel>
        where TDTO : class
    {
        private readonly Func<TDTO, TModel> convert;
        private TModel result;

        public TwitterResult(IJsonObjectConverter jsonObjectConverter, Func<TDTO, TModel> convert)
            : base(jsonObjectConverter)
        {
            this.convert = convert;
        }

        public TModel Result
        {
            get
            {
                var dto = Model;

                if (dto == null)
                {
                    return default;
                }

                if (this.result == null)
                {
                    this.result = this.convert(dto);
                }

                return this.result;
            }
        }
    }
}
