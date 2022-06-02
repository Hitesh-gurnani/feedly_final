import { useState } from 'react'
import { db } from '../../firebase'
import { useRouter } from 'next/router'

export default function blogpage({ blog, user, allComments }) {

    const [myComment, setMyComment] = useState('')
    const [name, setName] = useState('')
    const [allCommentsBlog, setAllComments] = useState(allComments)
    const router = useRouter()
    const { blogid } = router.query
    const makeCommet = async () => {

        await db.collection('blogs').doc(blogid).collection('comments').add({
            text: myComment,
            name: name
        })
        const commentQuery = await db.collection('blogs').doc(blogid).collection('comments').get()
        setAllComments(commentQuery.docs.map(docSnap => docSnap.data()))

    }
    return (
        <div className="container center">
            <h2> <u>{blog.title}</u> </h2>
            <h5>Created On - {new Date(blog.createdAt).toDateString()}</h5>
            <img src={blog.imageUrl} alt={blog.title} style={{ borderRadius: '10px', height: '250px', width: '250px' }} />
            <p style={{ fontSize: '20px' }}>{blog.body}</p>

            {user ?
                <>
                    <div className="input-field">
                        <input type="text"
                            style={{ color: 'white' }}
                            placeholder="add your name"
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <input type="text"
                            style={{ color: 'white' }}
                            placeholder="add a comment"
                            value={myComment}
                            onChange={(e) => setMyComment(e.target.value)} />
                    </div>
                    <button className="btn #fb8c00 orange darken-1" onClick={() => makeCommet()}>Make comment</button>
                    <div className="left-align">
                        <h3><b>Comment section</b></h3>
                        {allCommentsBlog.map(item => {
                            // return <h3 key={item.name}><span>{item.name}</span> {item.text}</h3>
                            // return 
                            return (
                                <div style={{ display: 'flex' }}><h6 style={{ fontSize: '25px', padding: '10px' }}>{item.name}:</h6>
                                    <h8 style={{ fontSize: '15px', paddingTop: '25px', color: 'white' }}>{item.text}</h8></div>
                            )
                        })}
                    </div>
                </>
                : <h5 style={{ color: 'red', opacity: 0.9, paddingBottom: '50px' }}><i>You are required to be logged in order to make comments</i></h5>
            }




            <style jsx global>
                {`
                span{
                    font-weight:500;
                }
                body{
                    color:orange
                }
                img{
                    width:100%;
                    max-width:500px;
                }
                `}
            </style>

        </div >
    )
}

export async function getServerSideProps({ params: { blogid } }) {
    const result = await db.collection('blogs').doc(blogid).get()
    const allCommetsSnap = await db.collection('blogs').doc(blogid).collection('comments').get()

    const allComments = allCommetsSnap.docs.map(comDocSnap => comDocSnap.data())
    return {
        props: {
            blog: {
                ...result.data(),
                createdAt: result.data().createdAt.toMillis()
            },
            allComments
        },
    }
}




