
let getData = (variable) =>
{
       let query = window.location.search.substring(1);
       let vars = query.split("&");
       for (let i=0;i<vars.length;i++) {
               let pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
let img = document.getElementById('img'),
        title = document.getElementById('title'),
        time = document.getElementById('time'),
        text = document.getElementById('text')
// img.src = getData('newsId')
console.log(getData('newsId'))
fetch(` https://www.mxnzp.com/api/news/details?newsId=${getData('newsId')}&app_id=eksukhehsvv8rqni&app_secret=aU55b3lnNFdjT0dXQjZiK1lldEZYUT09`).then(res => res.json())
.then(res => {
        if(res.code===1){
                title.innerHTML= res.data.title
                time.innerHTML = res.data.ptime
                img.src = res.data.images.length>0?res.data.images[0]?.imgSrc:'./img/14.png'
                text.innerHTML = res.data.content
                console.log(res)
        }
})
.catch(e => {console.log(e)})