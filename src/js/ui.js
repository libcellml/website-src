export default {

  addClickHandlerToggles: function () {
    // Event capture for the "toggle" class:
    let headers = document.querySelectorAll('.header, .header-left')

    headers.forEach(header => {

      header.classList.add('inactive')

      header.addEventListener('click', function () {

        let contents = header.nextElementSibling
        while (contents !== null) {
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
    tabNames.forEach(tabName => {
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
    // KRM: Not such a fan of this.  Processing should be done in getting 
    // this into XML format, not in the browser!
    // NB: Segfaults will come if <container classes="dummy"> blocks have no classes.  Need
    // to globally search and replace with <container classes="dummy">

    // <container classes="sphinx-tabs"> ----> turns into tabs2
    // .... add tab2menu div ... 
    //   <container classes="dummy">   -------------------->   turns into tab2
    //     <container classes="item"> -------> turns into tab2name, moved into menu
    //         <container classes="dummy">  ------------------> deleted
    //             <paragraph>C++</paragraph> -------> copied up one level
    //         </container>
    //     </container>
    //     <container classes="ui bottom attached sphinx-tab tab segment code-tab sphinx-data-tab-Qysr active"> ---> becomes tab2content
    //     </container>
    //     <literal_block/>

    let tabGroups = document.querySelectorAll('.sphinx-tabs')

    tabGroups.forEach((group, groupIndex) => {
      if (!group.querySelector('.tab2menu')) {

        // Make a menu if one doesn't exist
        let menu = document.createElement('div')
        menu.classList.add('tab2menu')
        menu.id = 'g' + groupIndex + 'menu'

        let firstPanel = group.firstElementChild
        
        // Iterate through children and give each the tab2 class
        let tabIndex = 0;
        let tab = group.firstElementChild
        while (tab !== null) {

          // Children become tab2
          tab.classList.add('tab2')
          tab.classList.add('inactive')
          tab.id = 'g'+ groupIndex + 't' + tabIndex + 'tab' 

          // Each tab has a header in the class "item", turn it into a tab2name
          let name = tab.querySelector('.container .item')

          name.classList.add('tab2name')
          name.classList.remove('item')
          name.id = 'g'+ groupIndex + 't' + tabIndex

          // Move its contents up one level
          let itemChild = name.firstChild
          name.innerHTML = itemChild.innerHTML

          // Each tab has a container including type sphinx-tab.  Set its id to
          // match the name div's id.
          let content = tab.querySelector('.sphinx-tab')
          content.classList = ['tab2content']

          // Move the name to the menu
          menu.appendChild(name)

          tab = tab.nextElementSibling
          tabIndex = tabIndex + 1
        }

        let menuSpacer = document.createElement('div')
        menuSpacer.classList.add('tab2spacer')
        menu.appendChild(menuSpacer)

        firstPanel.classList.add('active')
        firstPanel.classList.remove('inactive')
        menu.querySelector('#g' + groupIndex + 't0').classList.add('active')

        firstPanel.insertAdjacentElement('beforebegin', menu)
      }
    })

    tabGroups.forEach(group => {
      group.classList = 'tabs2'
    })
  },
}
