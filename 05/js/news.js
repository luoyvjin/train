let data = {
    page : 1,
    count : 5
},
pageIndex = 0,
list = ''
//渲染函数
let render = (pageIndex,data) => {
    let str = '',
    content = document.getElementById('content')
    data.map((item,index)=>{
        if(pageIndex===0){
           if(index<8){
            str+=`
            <div class="col-lg-3 col-sm-12 col-md-6 inner">
        <img src=${item.image}>
        </div>
        <div class="col-lg-3 col-sm-12 col-md-6 inner">
        <div class='text'>
            <h5><a href=./news-detail.html?url=${item.image}>${item.title}</a></h5>
            <p>${item.passtime}</p>
            <p>${item.title}</p>
            </div>
        </div>`
        } 
        }else if(pageIndex===1){
            if(index>7&&index<16){
                str+=`
            <div class="col-lg-3 col-sm-12 col-md-6 inner">
        <img src=${item.image}>
        </div>
        <div class="col-lg-3 col-sm-12 col-md-6 inner">
        <div class='text'>
            <h5><a href=./news-detail.html?url=${item.image}>${item.title}</a></h5>
            <p>${item.passtime}</p>
            <p>${item.title}</p>
            </div>
        </div>`
            } 
        }else if(pageIndex===2){
            if(index>15){
                str+=`
                <div class="col-lg-3 col-sm-12 col-md-6 inner">
            <img src=${item.image}>
            </div>
            <div class="col-lg-3 col-sm-12 col-md-6 inner">
            <div class='text'>
                <h5><a href=./news-detail.html?url=${item.image}>${item.title}</a></h5>
                <p>${item.passtime}</p>
                <p>${item.title}</p>
                </div>
            </div>`
            } 
        }
    })
    content.innerHTML=str
}
fetch('https://api.apiopen.top/getWangYiNews',{method:'POST',body:JSON.stringify(data)}).then(res =>{
   return res.json()
}).then(res => {
    // console.log(res.result)
    if(res.result){
        list = res.result
        render(pageIndex,res.result)
    }
}).catch(e=>{console.log(e)})

//翻页
let btnList = document.getElementsByClassName('btn')
for(let i = 0;i<btnList.length;i++){
    btnList[i].addEventListener('click',(e)=>{
        //清楚激活样式
        for(let i = 0;i<btnList.length;i++){
            btnList[i].className='btn'
        }
        btnList[i].className='btn action'
        pageIndex = i
        render(pageIndex,list)
    })
}

    