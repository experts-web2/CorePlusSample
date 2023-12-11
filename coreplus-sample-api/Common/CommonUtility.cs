using Coreplus.Sample.Api.Types;
using System.IO;
using System.Text.Json;

namespace Coreplus.Sample.Api.Common
{
	public static class CommonUtility
	{
		public static async Task<T[]> ReadFileFromJson<T>(string filePath) where T : class
		{
			using var fileStream = File.OpenRead(filePath);
			var data = await JsonSerializer.DeserializeAsync<T[]>(fileStream);
			return data;
		}
	}
}