namespace Coreplus.Sample.Api.Types
{
	public record PagedResponse<T>(IEnumerable<T> Data, int Count);
}
