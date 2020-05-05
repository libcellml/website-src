export const renderBulletList = element => {
  return {
    components: {
      BulletList: () => import('@/components/sphinx/templates/BulletList'),
    },
    render(h) {
      return h('BulletList', {
        props: {
          element: element,
        },
      })
    },
  }
}

export const renderEnumeratedList = element => {
  return {
    components: {
      EnumeratedList: () =>
        import('@/components/sphinx/templates/EnumeratedList'),
    },
    render(h) {
      return h('EnumeratedList', {
        props: {
          element: element,
        },
      })
    },
  }
}

export const renderSection = (element, level, extraIds) => {
  return {
    components: {
      Section: () => import('@/components/sphinx/templates/Section'),
    },
    render(h) {
      return h('Section', {
        props: {
          level,
          element,
          extraIds,
        },
      })
    },
  }
}

export const renderTitle = (element, level, isTopic) => {
  return {
    components: {
      Title: () => import('@/components/sphinx/templates/Title'),
    },
    render(h) {
      return h(
        'Title',
        {
          props: {
            element,
            level,
            isTopic,
          },
        },
        [element.innerText || element.textContent],
      )
    },
  }
}

export const renderPlainText = text => {
  return {
    render(h) {
      return this._v(text)
    },
  }
}

export const renderTransition = () => {
  return {
    render(h) {
      return h(
        'hr', // tag name
        { class: ['docutils'] },
      )
    },
  }
}

export const renderInline = element => {
  return {
    components: {
      Inline: () => import('@/components/sphinx/templates/Inline'),
    },
    render(h) {
      return h('Inline', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderMath = element => {
  return {
    components: {
      Math: () => import('@/components/sphinx/templates/Math'),
    },
    render(h) {
      return h('Math', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderTitleReference = element => {
  return {
    components: {
      TitleReference: () =>
        import('@/components/sphinx/templates/TitleReference'),
    },
    render(h) {
      return h('TitleReference', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderEmphasis = element => {
  return {
    components: {
      Emphasis: () => import('@/components/sphinx/templates/Emphasis'),
    },
    render(h) {
      return h('Emphasis', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderLiteralBlock = element => {
  return {
    components: {
      LiteralBlock: () => import('@/components/sphinx/templates/LiteralBlock'),
    },
    render(h) {
      return h('LiteralBlock', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderLiteral = element => {
  return {
    components: {
      Literal: () => import('@/components/sphinx/templates/Literal'),
    },
    render(h) {
      return h('Literal', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderStrong = element => {
  return {
    components: {
      Strong: () => import('@/components/sphinx/templates/Strong'),
    },
    render(h) {
      return h('Strong', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderMathBlock = element => {
  return {
    components: {
      MathBlock: () => import('@/components/sphinx/templates/MathBlock'),
    },
    render(h) {
      return h('MathBlock', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderParagraph = element => {
  return {
    components: {
      Paragraph: () => import('@/components/sphinx/templates/Paragraph'),
    },
    render(h) {
      return h('Paragraph', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderReference = element => {
  return {
    components: {
      Reference: () => import('@/components/sphinx/templates/Reference'),
    },
    render(h) {
      return h('Reference', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderDownloadReference = element => {
  return {
    components: {
      DownloadReference: () =>
        import('@/components/sphinx/templates/DownloadReference'),
    },
    render(h) {
      return h('DownloadReference', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderFigure = element => {
  return {
    components: {
      Figure: () => import('@/components/sphinx/templates/Figure'),
    },
    render(h) {
      return h('Figure', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderImage = element => {
  return {
    components: {
      SphinxImage: () => import('@/components/sphinx/templates/Image'),
    },
    render(h) {
      return h('SphinxImage', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderCaption = element => {
  return {
    components: {
      Caption: () => import('@/components/sphinx/templates/Caption'),
    },
    render(h) {
      return h('Caption', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderListItem = element => {
  return {
    components: {
      ListItem: () => import('@/components/sphinx/templates/ListItem'),
    },
    render(h) {
      return h('ListItem', {
        props: {
          element: element,
        },
      })
    },
  }
}

export const renderCompound = element => {
  return {
    components: {
      Compound: () => import('@/components/sphinx/templates/Compound'),
    },
    render(h) {
      return h('Compound', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderContainer = element => {
  return {
    components: {
      Container: () => import('@/components/sphinx/templates/Container'),
    },
    render(h) {
      return h('Container', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderTopic = element => {
  return {
    name: 'AnonymousTopic',
    components: {
      Topic: () => import('@/components/sphinx/templates/Topic'),
    },
    render(h) {
      return h('Topic', {
        props: {
          element,
        },
      })
    },
  }
}

export const renderBlockQuote = element => {
  return {
    components: {
      BlockQuote: () => import('@/components/sphinx/templates/BlockQuote'),
    },
    render(h) {
      return h('BlockQuote', {
        props: {
          element: element,
        },
      })
    },
  }
}
