import { connectDB } from '@/util/database';

export default async function board_post_handler(request, response) {
    if (request.method == 'POST') {

        const body = request.body

        let document = {
            title: body.title,
            content: body.content,
            writer: body.writer,
            date: new Date(),
            view: 0
        }

        const db = (await connectDB).db('board')
        const result = await db.collection('post').insertOne(document)

        if (!result.acknowledged || !result.insertedId) {
            return response.status(500).json({ success: false, message: 'DB 오류!' });
        }
        return response.status(200).json({ success: true, message: '글 작성 완료!' });
    }
}