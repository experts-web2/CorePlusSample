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
				.GroupBy(x =>  Convert.ToDateTime(x.date).Month)
				.Select(pro => new PractitionerReport(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(pro.Key), pro.Sum(y => y.cost), pro.Sum(y => y.revenue)));
		}

		public async Task<IEnumerable<SinglePractitioner>> GetPractitionerById(long practitionerId, string month)
		{
			using var fileStream = File.OpenRead(@"./Data/appointments.json");
			var data = await JsonSerializer.DeserializeAsync<Appointment[]>(fileStream);
			if (data == null)
			{
				throw new Exception("Data read error");
			}

			return data.Where(x => x.practitioner_id == practitionerId && CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(Convert.ToDateTime(x.date).Month) == month)
				.Select(y =>  new SinglePractitioner(y.id,y.cost,y.revenue));	
		}

		public async Task<IEnumerable<Client>> GetClientById(long id)
		{
			using var fileStream = File.OpenRead(@"./Data/appointments.json");
			var data = await JsonSerializer.DeserializeAsync<Appointment[]>(fileStream);
			if (data == null)
			{
				throw new Exception("Data read error");
			}

			return data.Where(x => x.id == id)
				.Select(y => new Client(y.id,y.date, y.client_name, y.appointment_type,y.duration));
		}
	}
}