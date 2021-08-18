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
    }&app_id=pjicdnqppidvlzqh&app_secret=T0NaVEFldmFMdXNDVFRFVmQzZUdIQT09`
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
function updateUrl(key, value) {
  var newurl = updateQueryStringParameter(key, value);
  //向当前url添加参数，没有历史记录
  window.history.replaceState(
    {
      path: newurl,
    },
    "",
    newurl
  );
}

function updateQueryStringParameter(key, value) {
  var uri = window.location.href;
  if (!value) {
    return uri;
  }
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

//翻页
let btnList = document.getElementsByClassName("btn1"),
  back = document.getElementsByClassName("back"),
  go = document.getElementsByClassName("go");
//禁用按钮
disabledBtn = (pageIndex) => {
  for (let i = 0; i < btnList.length; i++) {
    btnList[i].disabled = false;
  }
  btnList[pageIndex - 1].disabled = true;
  console.log(pageIndex);
  back[0].disabled = false;
  go[0].disabled = false;
  if (pageIndex === 1) {
    back[0].disabled = true;
  } else if (pageIndex === 3) {
    go[0].disabled = true;
  }
};
if (window.location.search) {
  console.log(getpage("page"));
  pageIndex = getpage("page") - 1;
  btnList[getpage("page") - 1].className = "btn1 btn action";
  render(pageIndex);
  disabledBtn(pageIndex + 1);
} else {
  btnList[0].className = "btn1 btn action";
  render(0);
  disabledBtn(1);
}

for (let i = 0; i < btnList.length; i++) {
  btnList[i].addEventListener("click", (e) => {
    //清楚激活样式
    for (let i = 0; i < btnList.length; i++) {
      btnList[i].className = "btn1 btn";
    }
    pageIndex = i;
    disabledBtn(pageIndex + 1);
    btnList[i].className = "btn1 btn action";
    render(pageIndex, list);
    console.log(pageIndex);
    // window.location.search = `page=${i + 1}`;
    updateUrl("page", i + 1);
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
    updateUrl("page", pageIndex + 1);
    disabledBtn(pageIndex + 1);
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
    updateUrl("page", pageIndex + 1);
    disabledBtn(pageIndex + 1);
  }
});
