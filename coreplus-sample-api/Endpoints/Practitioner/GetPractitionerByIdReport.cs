using Coreplus.Sample.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Coreplus.Sample.Api.Endpoints.Practitioner
{
	public static class GetPractitionerByIdReport
	{
		public static RouteGroupBuilder MapGetPractitionerByIdReport(this RouteGroupBuilder group)
		{
			group.MapGet("/report/{id}", async ([FromServices] PractitionerReportService practitionerReportService, [FromRoute] long id, [FromQuery] string month, [FromQuery] int pageNo, [FromQuery] int pageSize) =>
			{
				var practitioners = await practitionerReportService.GetPractitionerById(id, month,pageNo,pageSize);

				return Results.Ok(practitioners);
			});

			return group;
		}
	}
}