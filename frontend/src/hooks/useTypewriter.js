import { useEffect, useState } from 'react'

export default function useTypewriter(
  words,
  typeSpeed = 70,
  deleteSpeed = 35,
  pause = 1700
) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let timeout

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}