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
      public IActionResult GetProjects(int pageHowMany = 10, int pageNum=1, [FromQuery] List<string>?projectTypes = null)
      {
            var query = _waterContext.Projects.AsQueryable(); //built for building queries 

            if (projectTypes != null && projectTypes.Any())
            {
                  query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }
            var totalNumProjects = query.Count();

            string? favProjType = Request.Cookies["FavoriteProjectType"];
            Console.WriteLine("~~~~~COOKIE~~~~\n" + favProjType);

            HttpContext.Response.Cookies.Append("FavoriteProjectType", "Protected Spring", new CookieOptions
            {
                  HttpOnly = true,//only be seen by server. not part of DOM
                  Secure = true,
                  SameSite = SameSiteMode.Strict,
                  Expires = DateTime.Now.AddMinutes(4),
            });

            var something = query
            .Skip((pageNum-1)* pageHowMany) //shows 10 if pageNum is 10. If it is page 2, skip 10, then take the next 10
            .Take(pageHowMany)
            .ToList();



            var someObject = new {
                  Projects = something, 
                  TotalNumProjects = totalNumProjects
            };

            return Ok(someObject);
      }
      //just categories 
      [HttpGet("GetProjectTypes")]
      public IActionResult GetProjectTypes()
      {
            var projectTypes = _waterContext.Projects
            .Select(p=>p.ProjectType)
            .Distinct() //distinct will help to only get distinct ones
            .ToList();

            return Ok(projectTypes);
      }
}