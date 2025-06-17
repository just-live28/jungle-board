import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export default async function register_handler(request, response) {
    const db = (await connectDB).db('board')

    if (request.method == 'POST') {
        let hash = await bcrypt.hash(request.body.password, 10);
        request.body.password = hash;

        const result = await db.collection('user').insertOne(request.body);

        if (!result.acknowledged || !result.insertedId) {
            return response.status(500).json({ success: 'true', message: 'DB 에러!' });
        }
        return response.status(200).json({ success: 'true', message: '가입 완료!' });
    }
}