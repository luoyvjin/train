let data = {
    page: 1,
    count: 5
},
    pageIndex = 0,
    list = ''
//渲染函数
let render = (pageIndex, data) => {
    let str = '',
        content = document.getElementById('content')
    fetch(`https://www.mxnzp.com/api/news/list?typeId=511&page=${pageIndex+1}&count=8&app_id=emfjlekgxchngglp&app_secret=NStsd016Q0dtdEJMclpUbytualF5Zz09`).then(res => res.json())
        .then(res => {
            if (res.code === 1 && res.data.length > 0) {
                res.data.map(item =>{
                    str += `
                    <div class="col-lg-3 col-sm-12 col-md-6 inner">
                <img src=${item.imgList?item.imgList[0]:'./img/12.jpg'}>
                </div>
                <div class="col-lg-3 col-sm-12 col-md-6 inner">
                <div class='text'>
                    <h5><a href=./news-detail.html?newsId=${item.newsId}>${item.title}</a></h5>
                    <p>${item.postTime}</p>
                    <p>${item.title}</p>
                    </div>
                </div>`
                })
                content.innerHTML = str
            }
            console.log(res)
        })
        .catch(e => { console.log(e) })
    
    
}
// fetch('https://api.apiopen.top/getWangYiNews', { method: 'POST', body: JSON.stringify(data) }).then(res => {
//     return res.json()
// }).then(res => {
//     // console.log(res.result)
//     if (res.result) {
//         list = res.result
//         render(pageIndex, res.result)
//     }
// }).catch(e => { console.log(e) })
render(0)
//翻页
let btnList = document.getElementsByClassName('btn1'),
    back = document.getElementsByClassName('back'),
    go = document.getElementsByClassName('go')
for (let i = 0; i < btnList.length; i++) {
    btnList[i].addEventListener('click', (e) => {
        //清楚激活样式
        for (let i = 0; i < btnList.length; i++) {
            btnList[i].className = 'btn1 btn'
        }
        btnList[i].className = 'btn1 btn action'
        pageIndex = i
        render(pageIndex, list)
    })
}
back[0].addEventListener('click', () => {
    if (pageIndex > 0) {
        pageIndex -= 1
        render(pageIndex, list)
        for (let i = 0; i < btnList.length; i++) {
            btnList[i].className = 'btn1 btn'
        }
        btnList[pageIndex].className = 'btn1 btn action'
    }
})
go[0].addEventListener('click', () => {
    console.log(pageIndex)
    if (pageIndex < 2) {
        pageIndex += 1
        render(pageIndex, list)
        for (let i = 0; i < btnList.length; i++) {
            btnList[i].className = 'btn1 btn'
        }
        btnList[pageIndex].className = 'btn1 btn action'
    }
})

