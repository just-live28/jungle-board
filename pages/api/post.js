import { connectDB } from '@/util/database';

export default async function board_post_handler(request, response) {
    const db = (await connectDB).db('board')

    if (request.method == 'GET') {
        const keyword = request.query.keyword || ''
        const page = parseInt(request.query.page || '1')
        const limit = 10
        const query = keyword ? { title: { $regex: keyword, $options: 'i' } } : {}

        const totalCount = await db.collection('post').countDocuments(query)
        const posts = await db.collection('post')
            .find(query)
            .sort({ _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray()

        response.status(200).json({ posts, totalCount })
    }

    if (request.method == 'POST') {

        const body = request.body

        let document = {
            title: body.title,
            content: body.content,
            writer: body.writer,
            date: new Date(),
            view: 0
        }

        const result = await db.collection('post').insertOne(document)

        if (!result.acknowledged || !result.insertedId) {
            return response.status(500).json({ success: false, message: 'DB 오류!' });
        }

        return response.status(200).json({ success: true, message: '글 작성 완료!' });
    }
}