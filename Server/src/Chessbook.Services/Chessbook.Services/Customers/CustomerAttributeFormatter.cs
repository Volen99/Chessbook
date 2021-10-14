using System.Net;
using System.Text;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Domain.Catalog;
using Chessbook.Core.Html;

namespace Chessbook.Services.Customers
{
    /// <summary>
    /// Customer attributes formatter
    /// </summary>
    public partial class CustomerAttributeFormatter : ICustomerAttributeFormatter
    {
        #region Fields

        private readonly ICustomerAttributeParser _customerAttributeParser;
        private readonly ICustomerAttributeService _customerAttributeService;
        private readonly IWorkContext _workContext;

        #endregion

        #region Ctor

        public CustomerAttributeFormatter(ICustomerAttributeParser customerAttributeParser,
            ICustomerAttributeService customerAttributeService,
            IWorkContext workContext)
        {
            _customerAttributeParser = customerAttributeParser;
            _customerAttributeService = customerAttributeService;
            _workContext = workContext;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Formats attributes
        /// </summary>
        /// <param name="attributesXml">Attributes in XML format</param>
        /// <param name="separator">Separator</param>
        /// <param name="htmlEncode">A value indicating whether to encode (HTML) values</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the attributes
        /// </returns>
        public virtual async Task<string> FormatAttributesAsync(string attributesXml, string separator = "<br />", bool htmlEncode = true)
        {
            var result = new StringBuilder();

            var attributes = await _customerAttributeParser.ParseCustomerAttributesAsync(attributesXml);
            for (var i = 0; i < attributes.Count; i++)
            {
                var attribute = attributes[i];
                var valuesStr = _customerAttributeParser.ParseValues(attributesXml, attribute.Id);
                for (var j = 0; j < valuesStr.Count; j++)
                {
                    var valueStr = valuesStr[j];
                    var formattedAttribute = string.Empty;
                    if (!attribute.ShouldHaveValues())
                    {
                        // no values
                        if (attribute.AttributeControlType == AttributeControlType.MultilineTextbox)
                        {
                            // multiline textbox
                            var attributeName = attribute.Name; // await _localizationService.GetLocalizedAsync(attribute, a => a.Name, (await _workContext.GetWorkingLanguageAsync()).Id);
                            // encode (if required)
                            if (htmlEncode)
                                attributeName = WebUtility.HtmlEncode(attributeName);
                            formattedAttribute = $"{attributeName}: {HtmlHelper.FormatText(valueStr, false, true, false, false, false, false)}";
                            // we never encode multiline textbox input
                        }
                        else if (attribute.AttributeControlType == AttributeControlType.FileUpload)
                        {
                            // file upload
                            // not supported for customer attributes
                        }
                        else
                        {
                            // other attributes (textbox, datepicker)
                            formattedAttribute = attribute.Name; // $"{await _localizationService.GetLocalizedAsync(attribute, a => a.Name, (await _workContext.GetWorkingLanguageAsync()).Id)}: {valueStr}";
                            // encode (if required)
                            if (htmlEncode)
                            {
                                formattedAttribute = WebUtility.HtmlEncode(formattedAttribute);
                            }
                        }
                    }
                    else
                    {
                        if (int.TryParse(valueStr, out var attributeValueId))
                        {
                            var attributeValue = await _customerAttributeService.GetCustomerAttributeValueByIdAsync(attributeValueId);
                            if (attributeValue != null)
                            {
                                formattedAttribute = attribute.Name; // $"{await _localizationService.GetLocalizedAsync(attribute, a => a.Name, (await _workContext.GetWorkingLanguageAsync()).Id)}: {await _localizationService.GetLocalizedAsync(attributeValue, a => a.Name, (await _workContext.GetWorkingLanguageAsync()).Id)}";
                            }
                            // encode (if required)
                            if (htmlEncode)
                            {
                                formattedAttribute = WebUtility.HtmlEncode(formattedAttribute);
                            }
                        }
                    }

                    if (string.IsNullOrEmpty(formattedAttribute))
                    {
                        continue;
                    }

                    if (i != 0 || j != 0)
                        result.Append(separator);

                    result.Append(formattedAttribute);
                }
            }

            return result.ToString();
        }

        #endregion
    }
}
