const AccessToken = `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`
const user_name = 'johnpapa'

let mounted = false;
const container = document.querySelector(".container")
const home_page = document.querySelector(".home_page")

// const user_profile = document.querySelector(".user_profile")
// const git_repos = document.querySelector(".git_repos")
// const page_number = document.querySelector(".page_number")

async function userdata() {

    // USER PROFILE RELATED CODE //
    const user_profile = document.createElement('div')
    user_profile.classList.add('user_profile')
    
        const res = await fetch(`https://api.github.com/users/${user_name}`, {
            headers: {
                'Authorization': `token ${AccessToken}`,
            }
        });
        const git = await res.json();

        let user_avatar = document.createElement('div')
        let user_detail = document.createElement('div')

        user_avatar.classList.add('profile')
        user_detail.classList.add('user_detail')

        user_avatar.innerHTML = `<img src=${git.avatar_url}/> <a href="">${git.url}<a/>`

        user_detail.innerHTML = `<h1>${git.name}</h1><h3>${git.bio}</h3> <h3>${git.location}</h3> twiiter: <a href = " ">${git.twitter_username}</a>`

        user_profile.appendChild(user_avatar)
        user_profile.appendChild(user_detail)
        container.appendChild(user_profile)
       

    // USER REPOSITORY RELATED CODE //
    // fetching user repos 
}

let page = 1;

const git_repos = document.createElement('div')
git_repos.classList.add('git_repos')

async function repositories(page) {

    git_repos.innerHTML = `<h1>Loading...</h1>`

    const repos_res = await fetch(`https://api.github.com/users/${user_name}/repos?page=${page}&per_page=10`, {
        headers: {
            'Authorization': `token ${AccessToken}`,
        }
    });

    const repos = await repos_res.json()
    
    if(!repos){
        container.innerHTML = ''
        const h1 = document.createElement('h1');
        h1.innerHTML = "Loading..."
        container.appendChild(h1)
    }
    git_repos.innerHTML = '';

    repos?.map(async element => {
        let repo = document.createElement('div')
        repo.classList.add("repos");
        let techs = document.createElement('div')

        repo.innerHTML = `<h1>${element.full_name}</h1><h5>${element.description}</h5>`

        git_repos.appendChild(repo)
        container.appendChild(git_repos)

        //fetching user repos techs stack used 
        const language = await fetch(`https://api.github.com/repos/${user_name}/${element.name}/languages`, {
            headers: {
                'Authorization': `token ${AccessToken}`,
            }
        });
        const lang = await language.json();

        for (const key in lang) {
            if (Object.hasOwnProperty.call(lang, key)) {
                techs = document.createElement('span')
                techs.classList.add("techs")
                techs.innerHTML = key
                repo.appendChild(techs)
            }
        }
    })
}

function pagination(){
    const page_number = document.createElement('div')
    page_number.classList.add('page_number')
    function pages(n){
        const span = document.createElement('span');
        span.innerHTML = n
        span.addEventListener('click',function(){
            git_repos.innerHTML = '';
            repositories(n)
        })
        page_number.appendChild(span);
    }

    const buttons = document.createElement('div')
    buttons.classList.add('btns')
    const older = document.createElement('button')
    older.innerText = "older"
    older.addEventListener('click',function(){
        if(page>1){
            page--
        }
        repositories(page)
    })
    const next = document.createElement('button')
    
    next.addEventListener('click',function(){
        page++;
        repositories(page)
    })
    next.innerText = "next"
    
    buttons.appendChild(older)
    buttons.appendChild(next)

    home_page.appendChild(page_number)
    home_page.appendChild(buttons)

    for(let i=1;i<=9;i++){
        pages(i)
    }
}

userdata()
repositories(page)
pagination()
