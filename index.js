
const AccessToken = `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`
const user_name = 'johnpapa'

const container = document.querySelector(".container")
const home_page = document.querySelector(".home_page")

//CODE RELATED RELATED TO USER PROFILE FETCH AND PREVIEW DATA
async function userdata() {

    const user_profile = document.createElement('div')
    user_profile.classList.add('user_profile')

          //fetching user profile details 
        const res = await fetch(`https://api.github.com/users/${user_name}`, {
            // headers: {
            //     'Authorization': `token ${AccessToken}`,
            // }
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
    
}

//CODE RELATED RELATED TO USER REPOSITORIES FETCH AND PREVIEW ALL REPOS
let page = 1;
const git_repos = document.createElement('div')
git_repos.classList.add('git_repos')

async function repositories(page) {
    git_repos.innerHTML = `<h1>Loading...</h1>` //adding loader 

      //fetching user All repos
    const repos_res = await fetch(`https://api.github.com/users/${user_name}/repos?page=${page}&per_page=4`, {
        // headers: {
        //     'Authorization': `token ${AccessToken}`,
        // }
    });
    
    const repos = await repos_res.json() // repositories reponses

    git_repos.innerHTML = '' // removing loader

    repos?.map(async element => {
        let repos = document.createElement('div')
        repos.classList.add("repos");
        let techs = document.createElement('div')

        repos.innerHTML = `<h1>${element.full_name}</h1> <h5>${element.description}</h5>`

        git_repos.appendChild(repos)
        container.appendChild(git_repos)

        //fetching user repos techs stack used 
        const language = await fetch(`https://api.github.com/repos/${user_name}/${element.name}/languages`, {
            headers: {
                'Authorization': `token ${AccessToken}`,
            }
        });
        const lang = await language.json();

        //this loop is used to display coding techs stacks used in  a repo
        for (const key in lang) {
            if (Object.hasOwnProperty.call(lang, key)) {
                techs = document.createElement('span')
                techs.classList.add("techs")
                techs.innerHTML = key
                repos.appendChild(techs)
            }
        }
    })

}


//THIS CODE IS RELATED PAGINATION FUNCTIONALITY
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
       
    //creating next and older button functionality
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

    //for loop to display page numbers
    for(let i=1;i<=9;i++){
        pages(i)
    }
}

userdata()
repositories(page)
pagination()
