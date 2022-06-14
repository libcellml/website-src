<template>
  <v-container>
    <v-row>
      <v-col>
        <template v-if="haveQuickLinks">
          <h4>Quick links</h4>
          <ul id="sidebarMenu">
            <li
              v-for="link in quickLinks"
              :key="link.label"
              style="list-style-type: none"
            >
              <router-link :to="link.url">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </template>

        <template v-if="havePageHeadings">
          <h4>On this page</h4>
          <ul>
            <li
              v-for="(heading, index) in pageHeadings"
              :key="'h1_' + index"
              style="list-style-type: none"
            >
              <router-link
                v-if="heading.id"
                :to="`${$route.path}#${heading.id}`"
              >
                {{ heading.el.innerText || heading.el.textContent }}
              </router-link>
              <template v-else>
                {{ heading.el.innerText || heading.el.textContent }}
              </template>
              <ul
                v-if="heading.children.length"
                style="padding-inline-start: 1rem"
              >
                <li
                  v-for="(subHeading, index) in heading.children"
                  :key="'h2_' + index"
                  style="list-style-type: none"
                >
                  <router-link
                    v-if="subHeading.id"
                    :to="`${$route.path}#${subHeading.id}`"
                  >
                    {{ subHeading.el.innerText || subHeading.el.textContent }}
                  </router-link>
                  <template v-else>
                    {{ subHeading.el.innerText || subHeading.el.textContent }}
                  </template>
                </li>
              </ul>
            </li>
          </ul>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const quickLinks = ref([])
const pageHeadings = ref([])

let previousHeight = -1
let mainContentElement = null
let timeout = null

const resizeObserver = new ResizeObserver((entries) => {
  if (entries.length === 1) {
    const entry = entries[0]
    const currentHeight = entry.contentRect.height
    if (currentHeight !== previousHeight) {
      previousHeight = currentHeight
      refresh()
    }
  }
})

onMounted(() => {
  findPageMainContent()
})

const havePageHeadings = computed(() => {
  return pageHeadings.value.length > 0
})
const haveQuickLinks = computed(() => {
  return quickLinks.value.length > 0
})

function refresh() {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    pageHeadings.value = findHeadings()
    quickLinks.value = findQuickLinks()
    timeout = null
  }, 150)
}
function findHeadings() {
  const headingInitial = 1
  let headingTree = []
  if (mainContentElement) {
    const headings = mainContentElement.getElementsByTagName(
      'h' + headingInitial
    )
    for (const heading of headings) {
      const subHeadings = getSubHeadings(heading, headingInitial)
      const treeEntry = {
        el: heading,
        id: getHeaderLinkId(heading),
        children: subHeadings,
      }
      headingTree.push(treeEntry)
    }
  }
  return headingTree
}
function getSubHeadings(element, level) {
  const nextLevelTag = 'H' + (level + 1)
  const thisLevelTag = 'H' + level
  let subHeadings = []
  let nextElementSibling = element.nextElementSibling
  while (nextElementSibling) {
    if (nextElementSibling.tagName === thisLevelTag) {
      nextElementSibling = null
    } else {
      if (nextElementSibling.tagName === nextLevelTag) {
        subHeadings.push({
          el: nextElementSibling,
          id: getHeaderLinkId(nextElementSibling),
        })
      }
      const result = nextElementSibling.getElementsByTagName(nextLevelTag)
      if (result.length) {
        for (const r of result) {
          subHeadings.push({ el: r, id: getHeaderLinkId(r) })
        }
      }
      nextElementSibling = nextElementSibling.nextElementSibling
    }
  }
  return subHeadings
}
function getHeaderLinkId(element) {
  let id = element.getAttribute('id')
  if (!id) {
    if (element.parentElement.nodeName === 'SECTION') {
      id = element.parentElement.getAttribute('id')
    } else if (element.parentElement.nodeName === 'DIV') {
      id = element.parentElement.getAttribute('id')
    }
  }
  return id
}
function findQuickLinks() {
  let quickLinksList = []
  let qs = mainContentElement.getElementsByClassName('quicklinks')
  for (const q of qs) {
    let links = q.getElementsByTagName('a')
    for (const link of links) {
      quickLinksList.push({
        label: link.textContent,
        url: link.getAttribute('href'),
      })
    }
  }
  return quickLinksList
}
function findPageMainContent() {
  mainContentElement = document.querySelector('#pageMainContent')
  if (mainContentElement === null) {
    setTimeout(() => {
      findPageMainContent()
    }, 100)
  } else {
    resizeObserver.observe(mainContentElement)
  }
}
</script>
