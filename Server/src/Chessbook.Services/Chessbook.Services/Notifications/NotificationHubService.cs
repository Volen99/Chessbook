﻿using Microsoft.AspNetCore.Http.Connections.Client;
using Microsoft.AspNetCore.SignalR.Client; 
using System;
using System.Threading.Tasks;

namespace Chessbook.Services.Notifications
{
    public class NotificationHubService : INotificationHubService
    {
        public NotificationHubService()
        {
        }

        public Task NewUserRegistered(int userId)
        {
            throw new NotImplementedException();
        }

        public Task NotificationDataUpdate(int senderId, int receiverId)
        {
            throw new NotImplementedException();
        }
    }
}