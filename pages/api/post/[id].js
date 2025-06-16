import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function board_handler(request, response) {
    if (request.method == 'GET') {
        const _id = request.query.id;

        const db = (await connectDB).db('board')
        let result = await db.collection('post').findOne({ _id: new ObjectId(String(_id)) });

        return response.status(200).json(result);
    }

    if (request.method == 'PUT') {
        const body = request.body

        let edited_document = {
            title: body.title,
            content: body.content,
        }

        const db = (await connectDB).db('board')
        const result = await db.collection('post')
            .updateOne({ _id: new ObjectId(String(body._id)) }, { $set: edited_document })

        if (!result.acknowledged || result.matchedCount == 0) {
            return response.status(500).json({ success: false, message: 'DB 오류!' });
        }
        return response.status(200).json({ success: true, message: '글 수정 완료!' });
    }

    if (request.method == 'DELETE') {
        const db = (await connectDB).db('board')
        const result = await db.collection('post').deleteOne({ _id: new ObjectId(String(request.query.id)) });

        console.log(result);
        if (!result.acknowledged || result.deletedCount == 0) {
            return response.status(500).json({ success: false, message: '삭제 실패' });
        }
        return response.status(200).json({ success: true, message: '삭제 완료' });
    }
}