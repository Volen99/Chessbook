namespace Chessbook.Web.Api.Setup
{
    using System.Linq;
    using Microsoft.AspNetCore.Mvc.ApplicationModels;
    using Microsoft.AspNetCore.Mvc.Routing;

    public class CentralizedPrefixConvention : IApplicationModelConvention
    {
        private readonly AttributeRouteModel centralizedPrefix;

        public CentralizedPrefixConvention(IRouteTemplateProvider routeTemplateProvider)
        {
            centralizedPrefix = new AttributeRouteModel(routeTemplateProvider);
        }

        public void Apply(ApplicationModel app)
        {
            foreach (var controller in app.Controllers)
            {
                var matchedSelectors = controller.Selectors.Where(x => x.AttributeRouteModel != null).ToList();

                foreach (var selectorModel in matchedSelectors)
                {
                    selectorModel.AttributeRouteModel = AttributeRouteModel.CombineAttributeRouteModel(centralizedPrefix, selectorModel.AttributeRouteModel);
                }

                var unmatchedSelectors = controller.Selectors.Where(x => x.AttributeRouteModel == null).ToList();
                foreach (var selectorModel in unmatchedSelectors)
                {
                    selectorModel.AttributeRouteModel = centralizedPrefix;
                }
            }
        }
    }
}
