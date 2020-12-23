// Username
let username = "luisdavidfer";

document.getElementById("username").innerHTML = username;
document.getElementById("username").href = "https://github.com/" + username;

document.getElementsByTagName("title")[0].innerText = username + " portfolio";  

let projects = null;
request();

// Retrieve GitHub API data

function request(page){
    
    let url = "https://api.github.com/users/" + encodeURI(username) + "/repos?per_page=30";
    url = page === undefined ? url : url += "&page=" + page;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200)
            if(JSON.parse(this.response).length > 0){
                projects = JSON.parse(this.response);
                load(projects);
            }else
                alert("No repositories found for user:\n" + username);
        else 
            alert("Invalid username:\n" + username);
    };

    xhr.send();
}

// Load retrived data

function load(projects){
    projects.forEach(project => {

        project.description = project.description ? project.description : "";

        let projectHtml = 
            "<a href='" + project.html_url + "'>" +
                "<div class='card'>" +
                    "<h1 class='card-title' title='" + project.name + "'>" +
                        project.name +
                    "</h1>" +
                    "<p class='card-description'>" +
                        project.description +
                    "</p>" + 
                "</div>" +
            "</a>";

        document.getElementById("projects").innerHTML += projectHtml;
    });
}

let i=2;
let el = document.getElementById("more");
el.addEventListener("click", function(){request(i);i++});