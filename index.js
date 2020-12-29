// Initialize global variables

let username = "luisdavidfer";
let user = null;
let repos = null;
let page = 1;

// Event listener for More button

let moreButton = document.getElementById("more");
moreButton.addEventListener("click", function(){
        getRepositories();
});

// Start logic

getUser();

// Retrieve GitHub user data from API

function getUser(){
    
    let url = "https://api.github.com/users/" + encodeURI(username);

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200){
            user = JSON.parse(this.response);
            document.getElementById("username").innerHTML = user.name;
            document.getElementById("username").href = "https://github.com/" + user.login;
            document.getElementsByTagName("title")[0].innerText = user.name + "'s portfolio";
            getRepositories();
        }else 
            alert("Invalid username:\n" + username);
    };

    xhr.send();
}

// Retrieve GitHub repositories data from API

function getRepositories(){
    if(user.public_repos > 0){

        let url = "https://api.github.com/users/" + encodeURI(user.login) + "/repos?per_page=30&page=" + page;
        
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200){
                repos = JSON.parse(this.response);
                printProjects(repos);
                if(user.public_repos <= 30*page)
                    document.getElementById("more").style.display = "none";
                else{
                    document.getElementById("more").style.display = "flex";
                    page++;
                }
                    
            }
        }
        xhr.send();
    }else
        alert("No repositories found for user:\n" + user.login);
}

// Print retrived repositories data

function printProjects(repos){
    repos.forEach(project => {

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