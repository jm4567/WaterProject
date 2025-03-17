using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class WaterController : ControllerBase
{
      //Constructor and create instance of water db context
      private WaterDbContext _waterContext;
      public WaterController(WaterDbContext temp)//could also do => _waterContext = temp;
      {
            _waterContext = temp;
      }
      [HttpGet("AllProjects")]
      public IEnumerable<Project> Get()
      {
            return _waterContext.Projects.ToList();
      }
      [HttpGet("FunctionalProjects")]
      public IEnumerable<Project> GetFunctionalProjects()
      {
            var something = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
            return something;
      }
}