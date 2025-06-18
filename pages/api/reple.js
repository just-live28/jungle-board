import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function reple_post_handler(request, response) {
    const db = (await connectDB).db('board')

    if (request.method == 'POST') {

        const body = request.body

        let document = {
            writer: body.writer,
            content: body.content,
            parent: new ObjectId(String(body.parent)),
            date: new Date()
        }

        const result = await db.collection('reple').insertOne(document)

        if (!result.acknowledged || !result.insertedId) {
            return response.status(500).json({ success: false, message: 'DB 오류!' });
        }

        return response.status(200).json({ success: true, message: '댓글 작성 완료!', reple: document });
    }
}