using Coreplus.Sample.Api.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace Coreplus.Sample.Api.Endpoints.Practitioner
{
	public static class GetPractitionerReport
	{
		public static RouteGroupBuilder MapGetPractitionerReport(this RouteGroupBuilder group)
		{
			group.MapGet("/{id}", async ([FromServices]PractitionerReportService practitionerReportService, [FromRoute]long id,[FromQuery] DateTime startDate, [FromQuery]DateTime endDate) =>
			{
				var practitioners = await practitionerReportService.GetPractitionersReport(id,startDate,endDate);
				
				return Results.Ok(practitioners);
			});

			return group;
		}
	}
}