using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using Chessbook.Common.Feedback;
using Microsoft.Extensions.Options;

namespace Chessbook.Services.Feedback
{
    /// <summary>CustomerFeedbackService provides functionality for sending an email that contains the customer feedback.</summary>
    public class UserFeedbackService : IUserFeedbackService
    {
        private readonly IOptions<FeedbackFormSettings> feedbackFormSettings;

        private readonly int smtpPort;
        private readonly string smtpServer;
        private readonly string appBuilderUser;
        private readonly string user;
        private readonly string password;

        private readonly MailAddress to;
        private readonly MailAddress email;
        private readonly NetworkCredential credentials;

        private readonly string subject;
        private readonly string sentMassageResourceStr;
        private readonly string customerSatisfactionResourceStr;

        public UserFeedbackService(IOptions<FeedbackFormSettings> formSettings)
        {
            feedbackFormSettings = formSettings;

            smtpServer = feedbackFormSettings.Value.MailServer;
            smtpPort = feedbackFormSettings.Value.MailPort;
            appBuilderUser = feedbackFormSettings.Value.ChessbookUser;
            user = feedbackFormSettings.Value.Email;
            password = feedbackFormSettings.Value.Password;

            to = new MailAddress(appBuilderUser);
            email = new MailAddress(user);
            credentials = new NetworkCredential(user, password);

            subject = "User Feedback Message";
            sentMassageResourceStr = "sent the following message:&lt;br/&gt;&lt;br/&gt;";
            customerSatisfactionResourceStr = "&lt;br/&gt;&lt;br/&gt;&lt;b&gt;Satisfaction rating:&lt;/b&gt;";
        }

        // Creates and sends an email containing the customer feedback together with a screenshot of the web page
        public async Task SendFeedback(UserFeedback feedback)
        {
            string htmlMessage = feedback.Message.Replace("\n", "<br/>", StringComparison.InvariantCulture);
            string body = $"{feedback.Email} {sentMassageResourceStr}{htmlMessage}";
            if (!string.IsNullOrEmpty(feedback.Rating))
            {
                body += $"{customerSatisfactionResourceStr} {feedback.Rating}";
            }

            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("e23423@gmail.com"); // email;
                mail.To.Add(new MailAddress("chessbook.comm@gmail.com")); //mail.To.Add(to);
                mail.Subject = subject;
                mail.IsBodyHtml = true;
                mail.Body = body;

                if (feedback.Screenshot != null)
                {
                    string validStr = feedback.Screenshot.Replace("data:image/jpeg;base64,", string.Empty, StringComparison.InvariantCulture);
                    byte[] imageBytes = Convert.FromBase64String(validStr);

                    using (MemoryStream stream = new MemoryStream(imageBytes, 0, imageBytes.Length))
                    {
                        ContentType contentType = new ContentType()
                        {
                            MediaType = MediaTypeNames.Image.Jpeg,
                        };
                        mail.Attachments.Add(new Attachment(stream, contentType));
                        await SendMail(mail);
                    }
                }
                else
                {
                    await SendMail(mail);
                }
            }
        }

        private async Task SendMail(MailMessage mailMessage)
        {
            using (SmtpClient smtp = new SmtpClient(smtpServer, smtpPort))
            {
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.UseDefaultCredentials = false;
                smtp.EnableSsl = true;
                smtp.Credentials = credentials;

               await smtp.SendMailAsync(mailMessage);
            }
        }
    }
}
