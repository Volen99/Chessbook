﻿namespace WorldFeed.AspNet.Public
{
    using System.Collections.Generic;

    using WorldFeed.AspNet.Modules;
    using WorldFeed.Common.InjectWorldFeed;

    public class AspNetPlugin : ITweetinviModule
    {
        public static ITweetinviContainer Container { get; private set; }

        private readonly List<ITweetinviModule> moduleCatalog;

        public AspNetPlugin()
        {
            this.moduleCatalog = new List<ITweetinviModule>();
        }

        public void Initialize(ITweetinviContainer container)
        {
            Container = container;

            InitializeModules(container);
        }

        private void InitializeModules(ITweetinviContainer container)
        {
            this.moduleCatalog.Add(new TweetinviAspNetModule());

            this.moduleCatalog.ForEach(module =>
            {
                module.Initialize(container);
            });
        }
    }
}