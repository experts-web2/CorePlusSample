using Coreplus.Sample.Api.Endpoints.Practitioner;
using Coreplus.Sample.Api.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<PractitionerService>();
builder.Services.AddSingleton<PractitionerReportService>();
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowSpecificOrigin",
		builder => builder
			.AllowAnyOrigin()
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials());
});

var app = builder.Build();
app.UseCors();
var practitionerEndpoints = app.MapGroup("/practitioners");
practitionerEndpoints.MapPractitionerEndpoints();

app.Run();
