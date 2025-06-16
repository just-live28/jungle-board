import Edit from './Edit';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function EditPost(props) {
    const resolvedParams = await props.params
    let _id = resolvedParams.id;

    const db = (await connectDB).db('board')
    let post = await db.collection('post').findOne({ _id: new ObjectId(String(_id)) });
    post = { ...post, _id: String(_id) }

    return (
        <Edit post={post} />
    )
}