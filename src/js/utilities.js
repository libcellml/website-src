import { filesize } from 'filesize'

export const downloadFileTitle = (item) => {
  let title = item.name
  if (item.pending) {
    title += ' (??)'
  } else {
    title += ` (${filesize(item.data.length)})`
  }
  return title
}

export const downloadFile = (item) => {
  const blob = new Blob([item.data], {
    type: item.type,
  })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = item.name
  link._target = 'blank'
  link.click()
}

export const onLearnMoreClicked = (url) => {
  window.open(url, '_blank')
}
