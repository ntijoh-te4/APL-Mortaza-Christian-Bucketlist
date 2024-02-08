using Bucketlist.Models;
namespace Bucketlist.Models;

public class TokenGenerationRequest
{
    public long Id { get; }
    public IEnumerable<JsonContent> CustomClaims { get; internal set; }
}
