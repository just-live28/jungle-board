import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function reple_handler(request, response) {
    const db = (await connectDB).db('board')

    if (request.method == 'GET') {
        const id = request.query.id;

        const result = await db.collection('reple').find({ parent: new ObjectId(String(id)) }).toArray();

        if (result == null) {
            return response.status(200).json(result);
        }
        return response.status(200).json(result);
    }

    if (request.method == 'PUT') {
        const _id = request.query.id;
        const editContent = request.body.content;

        const result = await db.collection('reple').updateOne({ _id: new ObjectId(String(_id)) }, { $set: { content: editContent } })

        if (!result.acknowledged || result.matchedCount == 0) {
            return response.status(500).json({ success: false, message: 'DB 오류!' });
        }
        return response.status(200).json({ success: true, message: '댓글 수정 완료!' });
    }


    if (request.method == 'DELETE') {
        const id = request.query.id;

        const result = await db.collection('reple').deleteOne({ _id: new ObjectId(String(id)) });

        if (!result.acknowledged || result.deletedCount == 0) {
            return response.status(500).json({ success: false, message: '삭제 실패' });
        }
        return response.status(200).json({ success: true, message: '삭제 완료' });
    }
}