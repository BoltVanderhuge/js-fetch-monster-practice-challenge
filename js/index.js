const api = 'http://localhost:3004/monsters'
let currentUrl = 'http://localhost:3004/monsters/?_limit=50&_page=1'
const forwardBtn = document.querySelector('button#forward')
const backBtn = document.querySelector('button#back')
let pageNum = parseInt(currentUrl.split('page=')[1])
const collection = document.querySelector('div#monster-container')

forwardBtn.addEventListener('click', function(){
    pageNum++
    collection.innerHTML = ""
    currentUrl = `http://localhost:3004/monsters/?_limit=50&_page=${pageNum}`
    

    renderAllMonsters()
    
})

function renderAllMonsters(){
    fetch(currentUrl)
        .then(response => response.json())
        .then(monsters => {
            monsters.forEach(monster => renderOneMonster(monster))
        })
}

function renderOneMonster(monster){
    const card = document.createElement('div')
    card.className = 'monster_card'
    card.dataset.id = monster.id

    card.innerHTML =`
<div class="monster_info">
<p class='name_age'>Name: ${monster.name}
    Age: ${monster.age}
</p>
<div class="scroll">
    <p class='description'>${monster.description}</p>
    </div>
</div> `

collection.append(card)
}

const form = document.createElement('FORM')
function renderForm(){
    form.className = 'new_monster'

    form.innerHTML = 
    `<label for="name">Name</label>
    <input type="text" name="name" required />

    <label for="age">Age</label>
    <input type="text" name="age" required />

    <label for="description">Description</label>
    <textarea name="description" required></textarea>

    <input type="submit" value="Create Monster" />`
    const createMon = document.querySelector('div#create-monster')
    createMon.append(form)

}


form.addEventListener('submit', function(e){
    e.preventDefault()
    const name = e.target[0].value
    const age = e.target[1].value
    const description = e.target[2].value

    const monster = { name, age, description}

    renderOneMonster(monster)

    fetch(`${url}/monsters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify(monster),
    })
    .then(res => res.json())
    
    e.target.reset()
})

renderAllMonsters()
renderForm()


backBtn.addEventListener('click', function(){
    pageNum--
    collection.innerHTML = ""
    currentUrl = `http://localhost:3004/monsters/?_limit=50&_page=${pageNum}`
    

    renderAllMonsters()
})


