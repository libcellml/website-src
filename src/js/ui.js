export default {
  getFigureCaptions: function() {
    // Use the id of a figure as the header for its caption.
    let captions = document.querySelectorAll('.figure-caption')
    captions.forEach(caption => {
      let id = caption.parentElement.getAttribute('id')
      let heading = id.split('-').join(' ')
      heading = heading.charAt(0).toUpperCase() + heading.slice(1)
      caption.innerHTML =
        '<span class="figure-caption-heading">' +
        heading +
        ': ' +
        '</span>' +
        caption.innerHTML
    })
  },

  addClickHandlerToggles: function() {
    // Event capture for the "toggle" class:
    let headers = document.querySelectorAll('.header, .header-left')

    headers.forEach(header => {
      header.classList.add('inactive')

      header.addEventListener('click', function() {
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

  addClickHandlerTabs: function() {
    let tabNames = document.querySelectorAll('.tab2name')
    tabNames.forEach(tabName => {
      tabName.addEventListener('click', function() {
        // Turn other tabs off.
        let group = tabName.parentElement.parentElement
        group.querySelectorAll('.tab2').forEach(tab => {
          tab.classList.remove('active')
          tab.classList.add('inactive')
        })
        group.querySelectorAll('.tab2name').forEach(tab => {
          tab.classList.remove('active')
          tab.classList.add('inactive')
        })
        // Turn this tab on.
        let current = group.querySelector('#' + tabName.id + 'tab')
        if (current) {
          current.classList.add('active')
          current.classList.remove('inactive')
        } else {
          alert('oops')
        }
        tabName.classList.add('active')
        tabName.classList.remove('inactive')
      })
    })
  },

  processSphinxTabs: function() {
    // KRM: Not a fan of this.  Processing should be done in getting
    // this into XML format, not in the browser!

    // <container classes="sphinx-tabs"> ----> turns into tabs2
    // .... add tab2menu div ...
    //   <container classes="dummy">   -------------------->   turns into tab2
    //     <container classes="item"> -------> turns into tab2name, moved into menu
    //         <container classes="dummy">  ------------------> deleted
    //             <paragraph>C++</paragraph> -------> copied up one level
    //         </container>
    //     </container>
    //     <container classes="ui bottom attached sphinx-tab tab segment code-tab sphinx-data-tab-Qysr active">
    //     </container>
    //     <literal_block/>

    let tabGroups = document.querySelectorAll('.sphinx-tabs')

    tabGroups.forEach((group, groupIndex) => {
      group.classList.remove('container')

      if (!group.querySelector('.tab2menu')) {
        // Make a menu if one doesn't exist
        let menu = document.createElement('div')
        menu.classList.add('tab2menu')
        menu.id = 'g' + groupIndex + 'menu'

        let firstPanel = group.firstElementChild

        // Iterate through children and give each the tab2 class
        let tabIndex = 0
        let tab = group.firstElementChild
        let activeClass = 'active'

        while (tab !== null) {
          // Children become tab2
          tab.classList.add('tab2')
          tab.classList.add('inactive')
          tab.classList.remove('container')

          tab.id = 'g' + groupIndex + 't' + tabIndex + 'tab'

          // Each tab has a header in the class "item", turn it into a tab2name
          let name = tab.querySelector('.container .item')
          if (name) {
            name.classList.add('tab2name')
            name.classList.add(activeClass)
            // Only the first tab is set to 'active' on page load.
            activeClass = 'inactive'
            name.classList.remove('item')
            name.classList.remove('container')
            name.id = 'g' + groupIndex + 't' + tabIndex
            // Move its contents up one level, out of the classless div
            name.innerHTML = name.firstChild.innerHTML
            // Move the name to the menu
            menu.appendChild(name)
          } // name loop

          tab = tab.nextElementSibling
          tabIndex = tabIndex + 1
        } // tab loop

        let menuSpacer = document.createElement('div')
        menuSpacer.classList.add('tab2spacer')
        menu.appendChild(menuSpacer)

        if (firstPanel) {
          firstPanel.classList.add('active')
          firstPanel.classList.remove('inactive')
          firstPanel.classList.remove('container')
          firstPanel.insertAdjacentElement('beforebegin', menu)
        }

        let menuTab = menu.querySelector('#g' + groupIndex + 't0')
        if (menuTab) {
          menuTab.classList.add('active')
        }
      }
    })

    tabGroups.forEach(group => {
      group.classList = 'tabs2'
    })
  },

  goToSignature: function (sigClass, sigName, closestType) {
    // Scrolls to the first instance of an item with the CSS class sig-name
    // (from Doxygen) with content matching the given sigName.
    let items = document.querySelectorAll('.'+sigClass)
    let sigNameItems = Array.prototype.filter.call(items, function (item) {
      return item.textContent.trim() === sigName
    })

    if (sigNameItems.length == 0) {
      return
    }

    let bookmark = null
    if(closestType.length) {
      bookmark = sigNameItems[0].closest('.'+closestType)
    }
    else {
      bookmark = sigNameItems[0]
    }
    
    if (bookmark !== null) {
      window.scrollTo({ top: bookmark.offsetTop, behavior: 'smooth' })
    }
  },
}
