using Microsoft.AspNetCore.Hosting;
using System.Media;

namespace WorldFeed.Programming.Quiz.Services.Audios
{
    public class AudioService : IAudioService
    {
        private SoundPlayer player;
        private readonly IWebHostEnvironment webHostEnvironment;

        public AudioService(IWebHostEnvironment webHostEnvironment)
        {
            this.webHostEnvironment = webHostEnvironment;
        }

        public void Play(string src)
        {
            this.player = new SoundPlayer(this.webHostEnvironment.WebRootPath + src);
            this.player.Play();
        }
    }
}