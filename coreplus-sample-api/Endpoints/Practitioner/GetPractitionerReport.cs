using Coreplus.Sample.Api.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace Coreplus.Sample.Api.Endpoints.Practitioner
{
	public static class GetPractitionerReport
	{
		public static RouteGroupBuilder MapGetPractitionerReport(this RouteGroupBuilder group)
		{
			group.MapGet("/{id}", async ([FromServices]PractitionerReportService practitionerReportService, [FromRoute]long id,[FromQuery] DateTime startDate, [FromQuery]DateTime endDate, [FromQuery]int pageNo , [FromQuery]int pageSize) =>
			{
				var practitioners = await practitionerReportService.GetPractitionersReport(id,startDate,endDate,pageNo,pageSize);
				
				return Results.Ok(practitioners);
			});

			return group;
		}
	}
}