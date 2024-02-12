let data=[]
const template1 = document.querySelector('#job-template')
const container =document.querySelector('.container')
window.addEventListener('DOMContentLoaded',async function(e){
    try{
        const res = await fetch('./data.json')
        data = await res.json()
        render(data)
        
    }
    catch(error){

    }
})

let filters=[]
let filteredData=[]

function createList (data){
  let data2= data.map(data=>`<li>${data}</li>`).join(' ')
    return data2
}
function createCategories(data){
    let data2= data.map(data=>`<li><button id=${data}>${data}</button></li>`).join('')
    return data2
}
function createFilters(filterData){
    let filtersx=filterData.map(item =>`<button class="job"><span>${item}</span> <span><img src="images/icon-remove.svg" alt=""></span></button>`).join(' ')
    return filtersx
}
function JobCat(){

}

function render(data){
   
    for(let i=0;i<data.length;i++){
        const jobTemplate = document.importNode(template1.content,true)

        const company_img = jobTemplate.querySelector('.company-image img')
        company_img.src = data[i].logo

        const  company_name = jobTemplate.querySelector('.company-name .name')
        company_name.textContent = data[i].company
        
        const  job_position = jobTemplate.querySelector('.job-role')
        job_position.textContent = data[i].position

        const  job_details = jobTemplate.querySelector('.job-details')
        job_details.innerHTML = createList([data[i].postedAt , data[i].contract , data[i].location])

        // ADDED BADGES 
        const badges = jobTemplate.querySelector('.company-name')
        if(data[i].new || data[i].featured){
            const div=document.createElement('div')
            div.className='badges'
            let content 
            if(data[i].new && !data[i].featured){
                content = `<span class='new'>new!</span>`
            }
            else if(data[i].featured && !data[i].new){
                content = `<span class='featured'>featured</span>`
            }
            else{
                content = `<span class='new'>new!</span> <span class='featured'>featured</span>`  
            } 
            div.innerHTML = content
            badges.appendChild(div)
        }
      
        const categories = jobTemplate.querySelector('.categories')
        categories.innerHTML = createCategories([data[i]?.level,data[i]?.role,...data[i]?.languages,...data[i]?.tools])
        
        container.appendChild(jobTemplate)
    }
    document.querySelectorAll('.categories').forEach(category=>{
        category.addEventListener('click',function(e){
        if(e.target.id != ''){
            container.parentElement.classList.add('active')
            if(!filters.includes(e.target.id)){ 
                filters.push(e.target.id)
            }
            const ele = document.querySelector('.filters')
            ele.innerHTML=createFilters(filters)
            const clear = document.querySelector('.clear')
            clear.insertAdjacentElement( 'beforebegin',ele)
            updateContainer()
        }
       
    })
   
})
 document.querySelector('.clear').addEventListener('click',function(e){
    document.querySelector('.filters').innerHTML=''
    filters=[]
    container.parentElement.classList.remove('active')
    container.innerHTML = ''
    render(data)
})
    
}
function updateContainer(){
    const jobcards = document.querySelectorAll('.job-card')
    jobcards.forEach(job=>{
        const btns = job.querySelectorAll('button')
        let check=[]
        for(let i of btns){
            check.push(i.id)
        }
        let include =true
        for(let j of filters){
            if(!check.includes(j)){
                include = false
            }
        }
        if (!include) {
           job.classList.add('show')
            
          } else {
            job.classList.remove('show')
          }
        
    })
}
