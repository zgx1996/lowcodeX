export default {
  mounted(el: HTMLElement, binding, vnode, preVnode) {
    let contextmenuDiv: HTMLDivElement | null = null;
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      contextmenuDiv &&
        el.contains(contextmenuDiv) &&
        el.removeChild(contextmenuDiv);
      contextmenuDiv = document.createElement('div');
      contextmenuDiv.className = 'contextmenu';
      contextmenuDiv.style.position = 'fixed';
      contextmenuDiv.style.left = e.clientX + 'px';
      contextmenuDiv.style.top = e.clientY + 'px';
      contextmenuDiv.style.zIndex = '999';
      contextmenuDiv.style.borderRadius = '4px';
      contextmenuDiv.style.boxShadow = '2px 2px 2px rgba(0,0,0,.4)';
      contextmenuDiv.style.backgroundColor = '#fff';
      const ul = document.createElement('ul');
      ul.style.margin = '0';
      ul.style.padding = '0';
      binding.value.forEach((menu: any) => {
        const li = document.createElement('li');
        li.style.listStyle = 'none';
        li.style.margin = '0';
        li.className = 'contextmenu-item';
        const div = document.createElement('div');
        div.style.padding = '6px 16px';
        div.innerText = menu.text;
        li.addEventListener('click', (e) => {
          e.stopPropagation()
          menu.fn();
          contextmenuDiv &&
            el.contains(contextmenuDiv) &&
            el.removeChild(contextmenuDiv);
        });
        li.appendChild(div);
        ul.appendChild(li);
      });
      contextmenuDiv.appendChild(ul);
      el.appendChild(contextmenuDiv);
      window.addEventListener('contextmenu', (e: MouseEvent) => {
        if (!el.contains(e.target)) {
          contextmenuDiv &&
            el.contains(contextmenuDiv) &&
            el.removeChild(contextmenuDiv);
        }
      });
      window.addEventListener('click', () => {
        e.preventDefault();
        contextmenuDiv &&
          el.contains(contextmenuDiv) &&
          el.removeChild(contextmenuDiv);
      });
    });
  },
};
