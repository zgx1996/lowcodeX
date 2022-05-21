export default {
  mounted (el:HTMLElement,binding,vnode,preVnode) {
    console.log(el,binding,vnode,preVnode);
    let contextmenuDiv:HTMLDivElement|null = null
    el.addEventListener('contextmenu',(e) => {
      e.preventDefault()
      contextmenuDiv = document.createElement('div')
      contextmenuDiv.className = 'contextmenu'
      contextmenuDiv.style.position = 'absolute'
      contextmenuDiv.style.left = '20px'
      contextmenuDiv.style.top = '20px'
      contextmenuDiv.style.zIndex= '999'
      contextmenuDiv.style.backgroundColor="#fff"
      const ul = document.createElement('ul')
      binding.value.forEach(menu => {
        const li = document.createElement('li')
        li.style.listStyle="none"
        li.style.margin="0"
        li.style.padding="0"
        li.innerHTML = menu.text
        li.addEventListener('click',() => {
          menu.fn()
          el.removeChild(contextmenuDiv!)
        })
        ul.appendChild(li)
      })
      contextmenuDiv.appendChild(ul)
      el.appendChild(contextmenuDiv)
      window.addEventListener('click',() => {
        el.removeChild(contextmenuDiv!)
      })
    })
  }
}