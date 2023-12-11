using Coreplus.Sample.Api.Endpoints.Practitioner;
using Coreplus.Sample.Api.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<PractitionerService>();
builder.Services.AddSingleton<PractitionerReportService>();

var app = builder.Build();
var practitionerEndpoints = app.MapGroup("/practitioners");
practitionerEndpoints.MapPractitionerEndpoints();

app.Run();
