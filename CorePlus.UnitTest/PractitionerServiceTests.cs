using Coreplus.Sample.Api.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorePlus.UnitTest
{
	public class PractitionerServiceTests
	{
		[Fact]
		public async Task GetPractitionersData() 
		{
			var service = new PractitionerService();
			var result = await service.GetPractitioners();

			Assert.NotNull(result);
			Assert.True(result.Count() == 10);
		}

		[Fact]
		public async Task GetSupervisorPractitioners()
		{
			var service = new PractitionerService();
			var result = await service.GetSupervisorPractitioners();

			Assert.NotNull(result);
		}
	}
}
