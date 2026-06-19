import { useParams } from 'react-router-dom'

function Lesson() {
  const { id } = useParams()
  return <h1>Lesson {id}</h1>
}

export default Lesson
