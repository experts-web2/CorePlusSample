namespace Coreplus.Sample.Api.Types
{
	public record Appointment(long id,string date,string client_name,string appointment_type,long duration,long revenue,long cost,long practitioner_id);
}