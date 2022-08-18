import { useState, useEffect } from 'react'
import { NewAlbum, GetAlbums } from '../services/PostServices'
import { useNavigate } from 'react-router-dom'
import { GetAlbumsByUser } from '../services/ProfileServices'

const NewPost = ({ user }) => {
  let navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [newAlbum, setNewAlbum] = useState(false)

  const toggleShowForm = () => {
    setNewAlbum(!newAlbum)
  }

  const [posts, setPosts] = useState([])
  useEffect(() => {
    const showPosts = async () => {
      const data = await GetAlbumsByUser(user.id)

      setPosts(data)
    }
    showPosts()
  }, [])
  // const [newPost, setNewPost] = useState(defaultPost)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('photoUrl', photoUrl)
    formData.append('description', description)
    formData.append('name', name)
    let res = await NewAlbum(formData, user.id)

    navigate(`/feed/${res.id}`)
  }

  return (
    <div>
      {!newAlbum && <button onClick={toggleShowForm}>Make New Album</button>}
      {newAlbum && (
        <div className="postpage">
          <form className="postform" onSubmit={handleSubmit}>
            <div className="form-wrap">
              <label htmlFor="name">Album Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                value={name}
                required
              />
            </div>
            <div className="form-wrap">
              <label htmlFor="description">Caption</label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                type="text"
                value={description}
                required
              />
            </div>
            <div className="form-wrap">
              <label htmlFor="photoUrl">Image</label>
              <input
                onChange={(e) => setPhotoUrl(e.target.files[0])}
                name="photoUrl"
                type="file"
                required
              />
            </div>
            <button>Post</button>
          </form>
        </div>
      )}
    </div>
  )
}
export default NewPost
