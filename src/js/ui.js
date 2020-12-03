export default {

  // KRM
  moveTabNames: function () {
    let tabGroups = document.querySelectorAll('.container .tabs2')
    tabGroups.forEach((group, groupIndex) => {
      group.id = 'g' + groupIndex

      if (!group.querySelector('.tab2menu')) {
        let menu = document.createElement('div')
        menu.classList.add('tab2menu')
        menu.id = 'g' + groupIndex + 'menu'

        let firstPanel = group.firstElementChild
        firstPanel.insertAdjacentElement('beforebegin', menu)

        group.querySelectorAll('.tab2').forEach((t, tabIndex) => {
          t.id = 'g' + groupIndex + 't' + tabIndex + 'tab'

          let tabName = t.querySelector('.tab2name')
          tabName.id = 'g' + groupIndex + 't' + tabIndex

          menu.appendChild(tabName)
        })

        let menuSpacer = document.createElement('div')
        menuSpacer.classList.add('tab2spacer')

        firstPanel.classList.add('active')
        firstPanel.classList.remove('inactive')
        menu.querySelector('#g' + groupIndex + 't0').classList.add('active')
        
      }
    })
  },

  addClickHandlerToggles: function () {
    // Event capture for the "toggle" class:
    let headers = document.querySelectorAll('header, .header-left')
    // let headers = document.querySelectorAll('.toggle.header')
    headers.forEach(header => {

      header.classList.add('inactive')

      header.addEventListener('click', function () {

        let contents = header.nextElementSibling
        while(contents !== null) {
          contents.style.display =
            contents.style.display !== 'block' ? 'block' : 'none'
          contents = contents.nextElementSibling
        }

        header.classList.toggle('active')
        header.classList.toggle('inactive')
      })
    })
  },

  addClickHandlerTabs: function () {
    let tabNames = document.querySelectorAll('.tab2name')
    tabNames.forEach((tabName) => {
      tabName.addEventListener('click', function () {
        // Turn other tabs off.
        let group = tabName.parentElement.parentElement
        group.querySelectorAll('.tab2').forEach((tab) => {
          tab.classList.remove('active')
          tab.classList.add('inactive')
        })
        group.querySelectorAll('.tab2name').forEach((tab) => {
          tab.classList.remove('active')
          tab.classList.add('inactive')
        })
        // Turn this tab on.
        let current = group.querySelector('#' + tabName.id + 'tab')
        current.classList.add('active')
        current.classList.remove('inactive')
        tabName.classList.add('active')
        tabName.classList.remove('inactive')
      })
    })
  },

  processSphinxTabs: function () {
    let tabBlocks = document.querySelectorAll(".sphinx-tabs")
    tabBlocks.forEach((tabBlock) => {
      // Each tab is wrapped in an un-classed container.  Give each one the class: sphinx-tab-wrapper.
      tabBlock.classList.add('tabs2')

      let tab = tabBlock.firstElementChild
      while (tab !== null) {

        // Children becomes tab2 wrapper
        tab.classList.add('tab2')
        tab.classList.add('inactive')

        // Each tab has a header in the class "item", turn it into a tab2name
        let name = tab.querySelector('.item')
        name.classList.add('tab2name')
        name.classList.remove('item')

        // Move its contents 
        let itemChild = name.firstChild
        name.innerHTML = itemChild.innerHTML

        tab = tab.nextElementSibling
      }

      tabBlock.classList.add('tabs2')
      tabBlock.classList.remove('sphinx-tabs')

    })

    let tabs = document.querySelectorAll('.sphinx-tab')
    tabs.forEach(tab => {
      tab.classList = ''
      tab.classList.add('tab2content')
    })
  }
}
