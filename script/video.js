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
// category: "Music";
// category_id: "1001";

const cardDemo = {
  category_id: "1001",
  video_id: "aaal",
  thumbnail: "https://i.ibb.co/hdtZYbB/enchnting.jpg",
  title: "Enchanted Harmonies",
  authors: [
    {
      profile_picture: "https://i.ibb.co/jh1q2F3/shopia.jpg",
      profile_name: "Sophia Williams",
      verified: false,
    },
  ],
  others: {
    views: "7.6K",
    posted_date: "16450",
  },
  description:
    "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience.",
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
     
    `;
    videoContainer.append(card);
  });
};

//Create Display Categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category");
  categories.forEach((item) => {
    //console.log(item);

    //create a button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categoryContainer.appendChild(button);
  });
};

loadCategories();
loadVideos();
