﻿using System;
using Chessbook.Core.Domain.Customers;
using Chessbook.Services.Tasks;

namespace Chessbook.Services.Customers
{
    /// <summary>
    /// Represents a task for deleting guest customers
    /// </summary>
    public partial class DeleteGuestsTask : IScheduleTask
    {
        #region Fields

        private readonly CustomerSettings _customerSettings;
        private readonly IUserService _customerService;

        #endregion

        #region Ctor

        public DeleteGuestsTask(CustomerSettings customerSettings,
            IUserService customerService)
        {
            _customerSettings = customerSettings;
            _customerService = customerService;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Executes a task
        /// </summary>
        public async System.Threading.Tasks.Task ExecuteAsync()
        {
            var olderThanMinutes = _customerSettings.DeleteGuestTaskOlderThanMinutes;
            // Default value in case 0 is returned.  0 would effectively disable this service and harm performance.
            olderThanMinutes = olderThanMinutes == 0 ? 1440 : olderThanMinutes;

            await _customerService.DeleteGuestCustomersAsync(null, DateTime.UtcNow.AddMinutes(-olderThanMinutes), true);
        }

        #endregion
    }
}
