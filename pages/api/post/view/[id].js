import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function board_handler(request, response) {
    if (request.method == 'PUT') {
        const id = request.query.id

        const db = (await connectDB).db('board')
        const result = await db.collection('post')
            .updateOne({ _id: new ObjectId(String(id)) }, { $inc: { view: 1 } })

        if (!result.acknowledged || result.matchedCount == 0) {
            return response.status(500).json({ success: false, message: 'DB 오류!' });
        }
        return response.status(200).json({ success: true, message: '조회수 증가 완료!' });
    }
}