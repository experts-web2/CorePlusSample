using Coreplus.Sample.Api.Types;
using Microsoft.AspNetCore.Http;
using System.Globalization;
using System.Text.Json;

namespace Coreplus.Sample.Api.Services
{
	public class PractitionerReportService
	{
		public async Task<IEnumerable<PractitionerReport>> GetPractitionersReport(long practitionerId, DateTime startDate, DateTime endDate)
		{
			using var fileStream = File.OpenRead(@"./Data/appointments.json");
			var data = await JsonSerializer.DeserializeAsync<Appointment[]>(fileStream);
			if (data == null)
			{
				throw new Exception("Data read error");
			}

			return data.Where(x => x.practitioner_id == practitionerId && Convert.ToDateTime(x.date) >= startDate && Convert.ToDateTime(x.date) <= endDate)
				.OrderBy(x => Convert.ToDateTime(x.date))
				.GroupBy(x => new {x.client_name, Convert.ToDateTime(x.date).Month })
				.Select(pro => new PractitionerReport(pro.Sum(y => y.cost), pro.Sum(y => y.revenue),pro.FirstOrDefault()?.client_name??string.Empty));
		}
	}
}