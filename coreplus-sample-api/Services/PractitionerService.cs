using System.Text.Json;
using Coreplus.Sample.Api.Common;
using Coreplus.Sample.Api.Types;

namespace Coreplus.Sample.Api.Services;

public record PractitionerDto(long id, string name);

public class PractitionerService
{
    public async Task<IEnumerable<PractitionerDto>> GetPractitioners()
    {
		try
		{
			var data = await CommonUtility.ReadFileFromJson<Practitioner>(@"./Data/practitioners.json");
			return data.Select(prac => new PractitionerDto(prac.id, prac.name));
		}
		catch (Exception ex)
		{
			throw new Exception(ex.Message);
		}
	}

    public async Task<IEnumerable<PractitionerDto>> GetSupervisorPractitioners()
    {
		try
		{
			var data = await CommonUtility.ReadFileFromJson<Practitioner>(@"./Data/practitioners.json");
			return data.Where(practitioner => (int)practitioner.level <= 1).Select(prac => new PractitionerDto(prac.id, prac.name));
		}
		catch (Exception ex)
		{
			throw new Exception(ex.Message);
		}
	}

	public async Task<IEnumerable<PractitionerDto>> GetNonSupervisorPractitioners()
	{
		try
		{
			var data = await CommonUtility.ReadFileFromJson<Practitioner>(@"./Data/practitioners.json");
			return data.Where(practitioner => (int)practitioner.level >= 2).Select(prac => new PractitionerDto(prac.id, prac.name));
		}
		catch (Exception ex)
		{
			throw new Exception(ex.Message);
		}
	}
}