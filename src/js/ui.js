export default {
  hideContentUntilFormatted: function () {
    alert('hello!')
  },

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
        menu.querySelector('#g' + groupIndex + 't0').classList.add('active')
      }

    })
  },

  addClickHandlerToggles: function () {
    // Event capture for the "toggle" class:
    let headers = document.querySelectorAll('.container .header')
    headers.forEach((x) => {
      x.addEventListener('click', function () {
        let contents = x.nextElementSibling
        // alert('clicked!')
        if (contents != null) {
          // alert(contents.style.display)
          contents.style.display =
            contents.style.display !== 'block' ? 'block' : 'none'
        }
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


}
