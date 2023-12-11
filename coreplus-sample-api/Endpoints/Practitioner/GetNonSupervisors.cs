using Coreplus.Sample.Api.Services;

namespace Coreplus.Sample.Api.Endpoints.Practitioner
{
	public static class GetNonSupervisors
	{
		public static RouteGroupBuilder MapGetNonSupervisorPractitioners(this RouteGroupBuilder group)
		{
			group.MapGet("/nonsupervisors", async (PractitionerService practitionerService) =>
			{
				var practitioners = await practitionerService.GetNonSupervisorPractitioners();
				return Results.Ok(practitioners);
			});

			return group;
		}
	}
}