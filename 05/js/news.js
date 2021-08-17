let data = {
    page: 1,
    count: 5,
  },
  pageIndex = 0,
  list = "";
//渲染函数
let render = (pageIndex, data) => {
  let str = "",
    content = document.getElementById("content");
  fetch(
    `https://www.mxnzp.com/api/news/list?typeId=511&page=${
      pageIndex + 1
    }&app_id=tuptqrlsymklfmf6&app_secret=WmN6QUd5Z3RzQTVLcFRsb2s1SUZvdz09`
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 1 && res.data.length > 0) {
        res.data.map((item) => {
          str += `
                    <div class="col-lg-3 col-sm-12 col-md-6 inner">
                <img src=${item.imgList ? item.imgList[0] : "./img/12.jpg"}>
                </div>
                <div class="col-lg-3 col-sm-12 col-md-6 inner">
                <div class='text'>
                    <h5><a href=./news-detail.html?newsId=${item.newsId}>${
            item.title
          }</a></h5>
                    <p>${item.postTime}</p>
                    <p>${item.title}</p>
                    </div>
                </div>`;
        });
        content.innerHTML = str;
      }
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};
// fetch('https://api.apiopen.top/getWangYiNews', { method: 'POST', body: JSON.stringify(data) }).then(res => {
//     return res.json()
// }).then(res => {
//     // console.log(res.result)
//     if (res.result) {
//         list = res.result
//         render(pageIndex, res.result)
//     }
// }).catch(e => { console.log(e) })
render(0);
let getpage = (variable) => {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};
//翻页
let btnList = document.getElementsByClassName("btn1"),
  back = document.getElementsByClassName("back"),
  go = document.getElementsByClassName("go");
if (window.location.search) {
  console.log(getpage("page"));
  pageIndex = getpage("page") - 1;
  btnList[getpage("page") - 1].className = "btn1 btn action";
} else {
  btnList[0].className = "btn1 btn action";
}
for (let i = 0; i < btnList.length; i++) {
  btnList[i].addEventListener("click", (e) => {
    //清楚激活样式
    for (let i = 0; i < btnList.length; i++) {
      btnList[i].className = "btn1 btn";
    }
    pageIndex = i;
    render(pageIndex, list);
    console.log(pageIndex);
    window.location.search = `page=${i + 1}`;
  });
}
back[0].addEventListener("click", () => {
  console.log(pageIndex);
  if (pageIndex > 0) {
    pageIndex -= 1;
    render(pageIndex, list);
    for (let i = 0; i < btnList.length; i++) {
      btnList[i].className = "btn1 btn";
    }
    btnList[pageIndex].className = "btn1 btn action";
    window.location.search = `page=${pageIndex + 1}`;
  }
});
go[0].addEventListener("click", () => {
  console.log(pageIndex);
  if (pageIndex < 2) {
    pageIndex += 1;
    render(pageIndex, list);
    for (let i = 0; i < btnList.length; i++) {
      btnList[i].className = "btn1 btn";
    }
    btnList[pageIndex].className = "btn1 btn action";
    window.location.search = `page=${pageIndex + 1}`;
  }
});
