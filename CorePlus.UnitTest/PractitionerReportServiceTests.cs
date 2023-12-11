using Coreplus.Sample.Api.Services;
using Coreplus.Sample.Api.Types;

namespace CorePlus.UnitTest;

public class PractitionerReportServiceTests
{
	[Fact]
	public async Task GetPractitionersReport_Test()
	{
		// Arrange
		long id = 1;
		DateTime startDate = new DateTime(2019,01,01);
		DateTime endDate = new DateTime(2021, 01, 01);
		int pageNo = 1;
		int pageSize = 10;

		//Act
		var service = new PractitionerReportService();
		var response = await service.GetPractitionersReport(id,startDate,endDate,pageNo,pageSize);

		//Assert
		Assert.NotNull(response);
	    Assert.IsAssignableFrom<PagedResponse<PractitionerReport>>(response);
		Assert.True(response.Data.Any());
	}

	[Fact]
	public async Task GetPractitionersReportNull_ProvideInvalid_PageNoAndPageSize()
	{
		// Arrange
		long id = 1;
		DateTime startDate = new DateTime(2019, 01, 01);
		DateTime endDate = new DateTime(2021, 01, 01);
		int pageNo = -1;
		int pageSize = -10;

		//Act
		var service = new PractitionerReportService();
		var response = await service.GetPractitionersReport(id, startDate, endDate, pageNo, pageSize);

		//Assert
		Assert.True(response.Data.Count() <= 0);
		Assert.True(!response.Data.Any());
	}

	[Fact(DisplayName = "GetPractitionersReport_ReturnsNull_When_PractitionerId_Is_Invalid")]
	public async Task GetPractitionersReportReturnsNull()
	{
		// Arrange
		long id = 11;
		DateTime startDate = new DateTime(2019, 01, 01);
		DateTime endDate = new DateTime(2021, 01, 01);
		int pageNo = -1;
		int pageSize = -10;

		//Act
		var service = new PractitionerReportService();
		var response = await service.GetPractitionersReport(id, startDate, endDate, pageNo, pageSize);

		//Assert
		Assert.True(response.Count <= 0);
	}

	[Fact]
	public async Task GetPractitionerById_ReturnNullWithWrongId_Test()
	{
		// Arrange
		long id = 11;
		string month = "December";
		int pageNo = 1;
		int pageSize = 10;

		//Act
		var service = new PractitionerReportService();
		var response = await service.GetPractitionerById(id,month, pageNo, pageSize);

		//Assert
		Assert.True(response.Count <= 0);
	}

	[Fact]
	public async Task GetPractitionerById_ReturnNullWithValidId_Test()
	{
		// Arrange
		long id = 1;
		string month = "December";
		int pageNo = 1;
		int pageSize = 10;

		//Act
		var service = new PractitionerReportService();
		var response = await service.GetPractitionerById(id, month, pageNo, pageSize);

		//Assert
		Assert.NotNull(response);
		Assert.IsAssignableFrom<PagedResponse<SinglePractitioner>>(response);
		Assert.True(response.Data.Any());
	}

	[Fact]
	public async Task GetClientById_ReturnClient()
	{
		//Arrange
		long id = 1;

		//Act
		var service = new PractitionerReportService();
		var result = await service.GetClientById(id);

		//Assert
		Assert.NotNull(result);
	}

	[Fact]
	public async Task GetClientById_ReturnNull()
	{
		//Arrange
		long id = 5000;

		//Act
		var service = new PractitionerReportService();
		var result = await service.GetClientById(id);

		//Assert
		Assert.Null(result);
	}
}