using Coreplus.Sample.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Coreplus.Sample.Api.Endpoints.Practitioner
{
	public static class GetClient
	{
		public static RouteGroupBuilder MapGetClientById(this RouteGroupBuilder group)
		{
			group.MapGet("/client/{id}", async ([FromServices] PractitionerReportService practitionerReportService, [FromRoute] long id) =>
			{
				var practitioners = await practitionerReportService.GetClientById(id);

				return Results.Ok(practitioners);
			});

			return group;
		}
	}
}