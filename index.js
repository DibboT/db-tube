let categories = [];
let videos = []; 
let sortMode = 'asc'
const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    categories = data.data;
    showAllCategory()
    getVideo(categories[0].category_id)
    // console.log(data)
}

handleCategory()

function showAllCategory() {
    let htmlShow = "";
    categories.map(value => {
        htmlShow += `<a onclick="getVideo(${value.category_id})" class="tab">${value.category}</a>`
    })
    document.getElementById('tab-container').innerHTML = htmlShow;
} 

const getVideo = async (id) => {
    videos = [];
    const response = await fetch("https://openapi.programming-hero.com/api/videos/category/" + id);
    const data = await response.json();
    if (data.status == true) {
        data.data.forEach(element => {
            element.viewNumber = parseFloat(element.others.views.replace('K', ''))
        });
        videos =  data.data;
        showAllVideos()
    }
    else{
        showErrorMessage()
    }
    
    console.log(videos)
}

function showAllVideos () {
    let htmlShow = "";
    videos.map(value => {
        htmlShow += `<div class="card bg-base-100 shadow-xl h-full w-54">
        <figure><img class="w-full h-48" src="${value.thumbnail}" alt="" /></figure>
        <div class="card-body">
          <h2 class="card-title">${value.title}</h2>
          <div class="flex">
          <p>${value.authors[0].profile_name}</p>
                <p class="${!value.authors[0].verified ? "hidden" : ""}"><img src="/verified.png"></p>
                </div>
            <p>${value.others.views} Views</p>
          <div class="card-actions justify-end">
    
          </div>
        </div>
      </div>`
    })
    document.getElementById('video-container').innerHTML = htmlShow;
}

function showErrorMessage(){
    let showError = `<div class="">
    <img src="/Icon.png">
    <h2 class="text-2xl font-semibold">Oops!! Sorry, There is no content here</h2>
  </div>`;
    document.getElementById('video-container').innerHTML = showError;

}

function sortHandle(){
    if (sortMode == 'asc') {
        videos.sort((a,b) => a.viewNumber - b.viewNumber )
        sortMode = 'desc'
    } else {
        videos.sort((a,b) => b.viewNumber - a.viewNumber )
        sortMode = 'asc'
    }

    showAllVideos()
    
}



