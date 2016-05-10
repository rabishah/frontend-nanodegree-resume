var info = {
  "bio": {
    "name": "Rabi C Shah",
    "role": "Frontend Engineer",
    "contacts": {
      "mobile": "+91-9008498419",
      "email": "green.rabi@hotmail.com",
      "github": "rabishah",
      "twitter": "rabi_shah89",
      "location": "Bangalore, Karnataka",
      "blog": "blog.27ae60.com"
    },
    "welcomeMessage": "Soft Kitty, Warm Kittly, Little ball of fur...",
    "skills": ["Javascript", "Awesome"],
    "biopic": "http://i.imgur.com/53Ack3j.jpg",
    "display": function($header, $topContacts) {
      var $skillsStart = $(HTMLskillsStart);
      var skills = this.skills;
      var contacts = this.contacts;

      $header.prepend($(HTMLheaderName.replace("%data%", this.name)));
      $header.prepend($(HTMLheaderRole.replace("%data%", this.role)));

      /* contacts */
      $topContacts.append($(HTMLmobile.replace("%data%", contacts.mobile)));
      $topContacts.append($(HTMLemail.replace("%data%", contacts.email)));
      $topContacts.append($(HTMLtwitter.replace("%data%", contacts.twitter)));
      $topContacts.append($(HTMLgithub.replace("%data%", contacts.github)));
      $topContacts.append($(HTMLlocation.replace("%data%", contacts.location)));

      $header.append($(HTMLbioPic.replace("%data%", this.biopic)));
      $header.append($(HTMLwelcomeMsg.replace("%data%", this.welcomeMessage)));

      $.each(skills, function(k, v) {
        $($skillsStart[1]).append($(HTMLskills.replace("%data%", v)));
      });
      $header.append($skillsStart);

      $("#footerContacts").append($(HTMLmobile.replace("%data%", contacts.mobile)));
    }
  },
  "work": {
    "jobs": [{
      "employer": "Minsh",
      "title": "Web Hacker",
      "location": "Bangalore, Karnataka",
      "dates": "inprogress",
      "description": "Blah! Blah! Blah!"
    }],
    "display": function($workExperience) {
      var $workStart = $(HTMLworkStart);
      var jobs = this.jobs;

      $.each(jobs, function(k, v) {
        var title = HTMLworkEmployer.replace("%data%", v.employer);
        var employer = HTMLworkTitle.replace("%data%", v.title);

        $workStart.append($(title + employer));
        $workStart.append($(HTMLworkDates.replace("%data%", v.dates)));
        $workStart.append($(HTMLworkLocation.replace("%data%", v.location)));
        $workStart.append($(HTMLworkDescription.replace("%data%", v.description)));
      });

      $workExperience.append($workStart);
    }
  },
  "education": {
    "schools" : [
      {
        "name" : "Indian Institute of Information Technology - Allahabad",
        "location" : "Allahabad, Uttar Pradesh",
        "degree" : "Bachelor", 
        "majors" : "Information Technology",
        "dates" : "2009 - 2013",
        "url" : "https://www.iiita.ac.in"
      },
      {
        "name" : "St. Xavier's College",
        "location" : "Kathmandu, Nepal",
        "degree" : "Intermediate of Science", 
        "majors" : "Physics, Chemistry and Mathematics",
        "dates" : "2007 - 2008",
        "url" : "http://sxc.edu.np"
      }
    ],
    "display": function($education) {
      var schools = this.schools;
      this.schools.forEach(function(school) {
        $education.append(HTMLschoolStart);
        var formattedName = HTMLschoolName.replace("%data%", school.name);
        var formattedDegree = HTMLschoolDegree.replace("%data%", school.degree);
        var formattedDates = HTMLschoolDates.replace("%data%", school.dates);
        var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);
        var formattedMajor = HTMLschoolMajor.replace("%data%", school.majors);
        $(".education-entry:last").append(formattedName + formattedDegree,formattedDates,formattedLocation,formattedMajor);
      });
    }
  },
  "projects" : {
    "projects" : [{
      "title" : "Nepali Unicode",
      "dates" : "2012",
      "description" : "Phoenotic translation of Ennglish words to Nepali words. https://rabishah.github.io/nepali-unicode/",
      "images" : ["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg"]
    }],
    "display": function($projects) {
      this.projects.forEach(function(project) {
        $projects.append(HTMLprojectStart);
        var formattedTitle = HTMLprojectTitle.replace("%data%",project.title);
        var formattedDates = HTMLprojectDates.replace("%data%",project.dates);
        var formattedDescription = HTMLprojectDescription.replace("%data%",project.description);

        $(".project-entry:last").append(formattedTitle,formattedDates,formattedDescription);
        for (image in project.images) {
          var formattedImage = HTMLprojectImage.replace("%data%",project.images[image]);
          $(".project-entry:last").append(formattedImage);
        };
      });
    }
  }
}

$(function() {
  var model = {
    "init": function() {
      this.info = info;
    },
    "getInfo": function() {
      return this.info;
    }
  };

  var octopus = {
    "init": function() {
      model.init();
      view.init();
    },
    "getInfo": function(category, elm) {
      var info = model.getInfo()[category];
      if (elm) {
        return info[elm];
      }

      return info;
    }
  };

  var view = {
    "init": function() {
      this.$header = $('#header');
      this.$topContacts = $('#topContacts');
      this.$workExperience = $('#workExperience');
      this.$projects = $('#projects');
      this.$education = $('#education');

      this.render.bio.call(this);
      this.render.work.call(this);
      this.render.education.call(this);
      this.render.projects.call(this);

      $("#main").append(internationalizeButton);
      $("#mapDiv").append(googleMap);
    },

    "render": {
      'bio': function() {
        var bioInfo = octopus.getInfo('bio');
        bioInfo.display.call(bioInfo, this.$header, this.$topContacts);
      },
      'work': function() {
        var workInfo = octopus.getInfo('work');
        workInfo.display.call(workInfo, this.$workExperience);
      },
      'education': function() {
        var educationInfo = octopus.getInfo('education');
        educationInfo.display.call(educationInfo, this.$education);
      },
      'projects': function() {
        var projectsInfo = octopus.getInfo('projects');
        projectsInfo.display.call(projectsInfo, this.$projects);
      }
    }
  };

  octopus.init();
}());
