let posts = [
  {
    author: "Muscle Cars",
    authorPic: "./img/stories/mustang.jpg",
    time: "3 hours ago",
    image: "./img/posts/car.jpg",
    likes: 323,
    liked: true,
    description: "What a wonderful green Mustang out in the green.",
    comment: ["A absolute must-have", "I want buy that"],
  },
  {
    author: "kill_bill",
    authorPic: "./img/stories/killbill.jpg",
    time: "1 day ago",
    image: "./img/posts/KillBill.jpeg",
    likes: 2845,
    liked: false,
    description: "Never saw such a great movie poster.",
    comment: ["Was this official?"],
  },
  {
    author: "Switzerland",
    authorPic: "./img/stories/swiss.jpg",
    time: "4 days ago",
    image: "./img/posts/meglisalp.jpg",
    likes: 22,
    liked: false,
    description: "One of my favourite hiking-spots. Just 1 hour drive away...",
    comment: ["Wow, paradise."],
  },
  {
    author: "Vinyl",
    authorPic: "./img/stories/vinyl.jpg",
    time: "8 days ago",
    image: "./img/posts/vinyl.jpg",
    likes: 876,
    liked: true,
    description: "Sometimes I think that times were better times",
    comment: ["That's Rock'n'Roll, isn't it?"],
  },
];

loadItems();

function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    let comm = "";
    for (let j = 0; j < post["comment"].length; j++) {
      comm += `<p class="post-head-sub">${post.comment[j]}</p>`;
    }
    let { likeImage, counter } = updateHearts(post);
    content.innerHTML += generateRenderHTML(i, post, comm, likeImage, counter);
  }
}

function generateRenderHTML(i, post, comm, likeImage, counter) {
  return `
    <div id="posts-head${i}" class="post-head">
            <img class="post-head-img" src=${post["authorPic"]}>
            <p class="name">${post["author"]}</p>
            <p class="post-head-sub">• ${post["time"]}</p>
          </div>
          <div id="posts-pic"></div>
            <img class="post-img" src=${post["image"]}>
          <div class="posts-footer">
            <div id="posts-likons" class="posts-icons">
                <div>
                <img onclick="updateLikes(${i})" class="icons left-icons" src= ${likeImage}>
                <img class="icons left-icons" src="./img/posts/comment.png">
                <img class="icons left-icons" src="./img/posts/send.png">
                </div>
                <img class="icons" src="./img/posts/save.png">
            </div>
            <div id="posts-text">
                <p class="posts-text">Gefällt ${counter} Mal</p>
                <p class="posts-text">${post["author"]} <span class="post-head-sub">${post["description"]}</span>
                </p>
            </div>
            <div id="comments">
                <p class="post-head-sub">${comm}</p>
                <div class="edit-comm">
                <input id="comment${i}" class="input-field" placeholder="Kommentieren..." type="text">
                <button id="p-btn${i}" class="post-btn" onclick="addComment(${i})">Posten</button>
                </div>
            </div>
          </div>
       </div>
    `;
}

function updateLikes(index) {
  posts[index].liked = !posts[index].liked;
  if (posts[index].liked) {
    posts[index].likes++;
  } else {
    posts[index].likes--;
  }
  saveItems();
  render();
}

function updateHearts(post) {
  let likeImage = "./img/posts/heart-blk.png";
  if (post["liked"]) {
    likeImage = "./img/posts/heart-red.png";
  }
  let counter = post["likes"];
  return { likeImage, counter };
}

function addComment(i) {
  let newComm = document.getElementById(`comment${i}`);
  posts[i]["comment"].push(newComm.value);
  newComm.value = "";
  saveItems();
  render();
}

function saveItems() {
  let itemsAsText = JSON.stringify(posts);
  localStorage.setItem("posts", itemsAsText);
}

function loadItems() {
  let itemsAsText = localStorage.getItem("posts");
  if (itemsAsText) {
    posts = JSON.parse(itemsAsText);
  }
}
