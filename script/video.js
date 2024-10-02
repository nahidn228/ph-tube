function getTimeString(time) {
  //get Hour and rest second
  const hour = parseInt(time / 3600);
  let remainSecond = time % 3600;
  const minute = parseInt(remainSecond / 60);
  const second = remainSecond % 60;
  return `${hour} hour ${minute} minute ${remainSecond} second ago`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");

  for (btn of buttons) {
    btn.classList.remove("active");
  }
};

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      //remove active class from every button
      removeActiveClass();

      // add active class in clicked button
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

// const cardDemo = {
//   category_id: "1001",
//   video_id: "aaal",
//   thumbnail: "https://i.ibb.co/hdtZYbB/enchnting.jpg",
//   title: "Enchanted Harmonies",
//   authors: [
//     {
//       profile_picture: "https://i.ibb.co/jh1q2F3/shopia.jpg",
//       profile_name: "Sophia Williams",
//       verified: false,
//     },
//   ],
//   others: {
//     views: "7.6K",
//     posted_date: "16450",
//   },
//   description:
//     "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience.",
// };

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class='min-h-[300px] flex flex-col gap-5 justify-center items-center'>

    <img src="../assets/Icon.png" alt="" />
    <h2 class='font-bold text-2xl'>
    Oops!! Sorry, There is No content in This Category
    </h2>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    //console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img class = "h-full w-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class='absolute text-xs right-2 bottom-2 bg-black rounded p-1 text-gray-200'>
      ${getTimeString(video.others.posted_date)}
      </span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    
    <div> <img class='w-10 h-10 rounded-full object-cover' src="${
      video.authors[0].profile_picture
    }" alt="" /> </div>
    <div>
    <h2 class='font-bold'>${video.title}</h2>
    <div class='flex items-center gap-2'> 
    <p class='text-gray-400'>${video.authors[0].profile_name}</p>
    ${
      video.authors[0].verified === true
        ? `<img class='w-5' src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" alt="" srcset="" />`
        : ""
    }
    
      </div>
    <p></p>
      </div>
  </div>
     
    `;
    videoContainer.append(card);
  });
};

// category: "Music";
// category_id: "1001";

//Create Display Categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category");
  categories.forEach((item) => {
    //console.log(item);

    //create a button
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick='loadCategoryVideos(${item.category_id})' class='btn category-btn'>${item.category}</button>
    `;
    categoryContainer.appendChild(buttonContainer);
  });
};

loadCategories();
loadVideos();
