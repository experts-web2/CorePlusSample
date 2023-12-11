using Coreplus.Sample.Api.Common;
using Coreplus.Sample.Api.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Text.Json;

namespace Coreplus.Sample.Api.Services
{
	public class PractitionerReportService
	{
		public async Task<PagedResponse<PractitionerReport>> GetPractitionersReport(long practitionerId, DateTime startDate, DateTime endDate, int pageNo, int pageSize)
		{
			try
			{
				var data = await CommonUtility.ReadFileFromJson<Appointment>(@"./Data/appointments.json");

				int skipRecords = pageNo <= 1 ? 0 : (pageNo - 1) * pageSize;

				var filteredData = data.Where(x => x.practitioner_id == practitionerId && Convert.ToDateTime(x.date) >= startDate && Convert.ToDateTime(x.date) <= endDate);
				int totalCount = filteredData.Count();

				IEnumerable<PractitionerReport> responseToReturn = filteredData.OrderBy(x => Convert.ToDateTime(x.date))
						.GroupBy(x => Convert.ToDateTime(x.date).Month)
						.Skip(skipRecords).Take(pageSize).Select(pro => new PractitionerReport(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(pro.Key), pro.Sum(y => y.cost), pro.Sum(y => y.revenue)));
				return new PagedResponse<PractitionerReport>(responseToReturn, totalCount);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public async Task<PagedResponse<SinglePractitioner>> GetPractitionerById(long practitionerId, string month, int pageNo, int pageSize)
		{
			try
			{
				var data = await CommonUtility.ReadFileFromJson<Appointment>(@"./Data/appointments.json");

				int skipRecords = pageNo <= 1 ? 0 : (pageNo - 1) * pageSize;

				var filteredData = data.Where(x => x.practitioner_id == practitionerId && CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(Convert.ToDateTime(x.date).Month) == month);
				int totalCount = filteredData.Count();

				IEnumerable<SinglePractitioner> responseToReturn = filteredData.Skip(skipRecords).Take(pageSize)
				   .Select(y => new SinglePractitioner(y.id, y.cost, y.revenue));
				return new PagedResponse<SinglePractitioner>(responseToReturn, totalCount);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public async Task<Client> GetClientById(long id)
		{
			try
			{
				var data = await CommonUtility.ReadFileFromJson<Appointment>(@"./Data/appointments.json");

				return data.Where(x => x.id == id)
					.Select(y => new Client(y.id, y.date, y.client_name, y.appointment_type, y.duration)).FirstOrDefault();
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}